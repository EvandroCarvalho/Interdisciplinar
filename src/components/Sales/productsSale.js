import React, { Component, Fragment } from "react";
import { InputGroup, Button, FormControl } from "react-bootstrap";
import { findItemById, findItemByName, finishOrder } from "../../actions/sales";
import Table from "react-table";
import Modal from "react-bootstrap/Modal";
import Delete from "../../assets/img/delete.png";
import "./styles.css";
import ModalCustomer from "../modalCustomer";

export default class ProductsSale extends Component {
  state = {
    data: [],
    tableColumns: {
      invoice: "",
      name: "",
      id: "",
      brand: "",
      discount: "",
      amount: "",
      sellPrice: "",
      price: ""
    },
    customer: {
      id: ""
    },
    employeeId: {
      id: ""
    },
    itemId: "",
    itemName: "",
    total: 0,
    invoice: 0,
    showModal: false,
    notFount: false,
    username: ""
  };

  componentDidMount() {
    const { employeeId, customerId, usarname } = this.props.location.state;
    this.setState({
      customer: {
        id: customerId
      },
      employee: {
        id: employeeId
      },
      usarname
    });
  }

  formatCell = row => {
    return <div style={{ padding: "6px", textAlign: "center" }}>{row}</div>;
  };

  formatCellActions = row => (
    <div style={{ textAlign: "center" }}>
      <button
        className="btn"
        title="Excluir"
        onClick={() => {
          this.removeItem(row);
        }}
      >
        <img src={Delete} alt="img" height="18" width="18" />
      </button>
    </div>
  );

  removeItem = index => {
    this.setState({
      data: [...this.state.data].filter((item, i) => i !== index)
    });
    this.setState({
      total: this.state.total - this.state.data[index].sellPrice
    });
  };

  columns = [
    {
      Header: "Código",
      accessor: "id",
      Cell: row => this.formatCell(row.value),
      width: 100
    },
    {
      Header: "Nome",
      accessor: "name",
      Cell: row => this.formatCell(row.value)
    },
    {
      Header: "Marca",
      accessor: "brand",
      Cell: row => this.formatCell(row.value)
    },
    {
      Header: "Preço",
      accessor: "sellPrice",
      Cell: row => this.formatCell(row.value),
      width: 100
    },
    {
      Header: "Excluir",
      Cell: row => this.formatCellActions(row.index),
      width: 100
    }
  ];

  handleItemName = itemName => {
    this.setState({ itemName });
  };

  handleItemId = itemId => {
    this.setState({ itemId });
  };

  saveItem = async ({
    tableColumns,
    itemId,
    customer,
    employee,
    itemName,
    username
  }) => {
    let invoice = 123;
    tableColumns.discount = 0;
    tableColumns.amount = 1;
    tableColumns = {
      ...tableColumns,
      itemId,
      customer,
      employee,
      itemName,
      invoice,
      username
    };
    if (tableColumns.id) {
      await this.setState({ data: [...this.state.data, tableColumns] });
      await this.updateTotal(tableColumns.sellPrice);
    }
  };
  updateTotal = () => {
    this.setState({
      total: this.state.data.reduce((ac, arr) => {
        return ac + arr.sellPrice;
      }, 0)
    });
  };

  findItemByName = async name => {
    let item = await findItemByName(name);
    if (item.length) {
      this.setState({
        itemId: item[0].id,
        itemName: item[0].name,
        tableColumns: item[0],
        notFount: false
      });
    } else {
      this.setState({ notFount: true, itemId: "" });
    }
  };

  findItemById = async id => {
    let item = await findItemById(id);
    if (item.name) {
      this.setState({
        itemName: item.name,
        tableColumns: item,
        notFount: false
      });
    } else {
      this.setState({ notFount: true, itemName: "" });
    }
  };

  finishOrder = async data => {
    let invoiceNumber = Math.floor(Math.random() * 1000 + 1);

    await this.setState({
      data: [
        data.map(item => {
          item.invoice = invoiceNumber;
        })
      ],
      invoice: invoiceNumber
    });

    const salesList = {
      salesList: data
    };
    let response = await finishOrder(salesList);
    if (response.status === 201) {
      this.setState({
        data: [],
        itemId: "",
        itemName: "",
        total: 0,
        showModal: true
      });
    }
  };

  render() {
    const {
      data,
      itemId,
      itemName,
      total,
      showModal,
      invoice,
      notFount
    } = this.state;
    return (
      <Fragment>
        <div>
          <div>
            <InputGroup className="mb-2 col-md-6">
              <FormControl
                placeholder="Nome do item"
                type="text"
                value={itemName}
                onChange={e => this.handleItemName(e.target.value)}
              />
              <InputGroup.Append>
                <Button
                  variant="outline-primary"
                  onClick={() => this.findItemByName(itemName)}
                >
                  Consultar
                </Button>
              </InputGroup.Append>
            </InputGroup>
          </div>
          <div>
            <InputGroup className="mb-2 col-md-4">
              <FormControl
                placeholder="Cod. do item"
                type="number"
                value={itemId}
                min={1}
                onChange={e => this.handleItemId(e.target.value)}
              />
              <InputGroup.Append>
                <Button
                  variant="outline-primary"
                  onClick={() => this.findItemById(itemId)}
                >
                  Consultar
                </Button>
              </InputGroup.Append>
            </InputGroup>
            <div className="text-danger mb-2 col-md-4" hidden={!notFount}>
              <p>Produto não encontrado</p>
            </div>
          </div>
          <div className="col-md-4">
            <Button onClick={() => this.saveItem(this.state)}>
              Adicionar Item
            </Button>
          </div>
        </div>
        <div className="Table">
          <Table
            className="-highlight"
            data={data}
            resolveData={data => data.map(row => row)}
            columns={this.columns}
            pageSize={5}
            previousText="Anterior"
            nextText="Próxima"
            noDataText="Nenhum item cadastrado"
            pageText="Página"
            ofText="de"
            rowsText="linhas"
          />
          <div className="total">
            <InputGroup>
              <InputGroup.Append>
                <InputGroup.Text id="inputGroup-sizing-default">
                  Total
                </InputGroup.Text>
              </InputGroup.Append>
              <FormControl
                style={{ opacity: total !== 0 ? 1 : 0.5 }}
                type="text"
                value={total.toFixed(2)}
                readOnly
              />
            </InputGroup>
          </div>
        </div>
        <div className="mt-3 col-md-4">
          <Button onClick={() => this.finishOrder(data)}>
            Finalizar Pedido
          </Button>
        </div>

        <Modal
          show={showModal}
          onHide={() => this.setState({ showModal: false })}
        >
          <ModalCustomer
            title={"Finalizado"}
            bodyMessage={`Pedido finalizado. Fatura: ${invoice}`}
            closeModal={() => this.setState({ showModal: false })}
          />
        </Modal>
      </Fragment>
    );
  }
}
