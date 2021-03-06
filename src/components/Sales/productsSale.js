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
    user: {},
    error: false
  };

  componentDidMount() {
    const { employeeId, customerId, user } = this.props.location.state;
    this.setState({
      customer: {
        id: customerId
      },
      employee: {
        id: employeeId
      },
      user
    });
  }

  formatCell = row => {
    return <div style={{ padding: "6px", textAlign: "center" }}>{row}</div>;
  };

  formatCellActions = row => (
    <div style={{ textAlign: "center" }}>
      <button
        className="btn buttonAction"
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

  saveItem = async ({ tableColumns, itemId, customer, employee, user }) => {
    let invoice = 123;
    tableColumns.discount = 0;
    tableColumns.amount = 1;
    tableColumns = {
      ...tableColumns,
      item: {
        id: itemId
      },
      customer,
      employee,
      invoice,
      user
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

    if (!data.length) {
      return this.setState({ msg: "Lista de produtos vazia!", error: true });
    }

    await this.setState({
      data: [data.map(item => (item.invoice = invoiceNumber))],
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
        showModal: true,
        error: false
      });
    } else {
      this.setState({ msg: "Erro ao concluir venda", error: true });
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
      notFount,
      msg,
      error
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
              <div className="input-group-append" disabled={true}>
                <button
                  type="button"
                  className="btn btn-primary"
                  id="findItemByName"
                  onClick={() => this.findItemByName(itemName)}
                >
                  Consultar
                </button>
              </div>
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
              <div className="input-group-append">
                <button
                  className="btn btn-primary"
                  type="button"
                  id="findItemById"
                  onClick={() => this.findItemById(itemId)}
                >
                  Consultar
                </button>
              </div>
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
            noDataText="Nenhum item selecionado"
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
        <div hidden={!error} className="CustomerNotFound">
          <p className="text-danger">{msg}</p>
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
