import React, { Component } from "react";
import "react-table/react-table.css";
import "./styles.css";
import { CustomerRegister } from "./CustomerRegister";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Table from "react-table";
import Edit from "../../assets/img/edit.png";
import Delete from "../../assets/img/delete.png";
import {
  findCustomer,
  saveCustomer,
  updateCustomer,
  deleteCustomer
} from "../../actions/customer";

export default class Customer extends Component {
  state = {
    data: [],
    modalAddOrEditIsOpen: false,
    modalRemoveIsOpen: false,
    customer: {
      name: "",
      cpf: "",
      phone: "",
      email: "",
      address: "",
      birthDate: "",
      gender: "",
      salary: ""
    }
  };

  componentDidMount() {
    this.searchCustomer();
  }

  searchCustomer = async () => {
    const response = await findCustomer();
    this.setState({ data: response.content });
  };

  openModalAddOrEdit = row => {
    if (row) {
      this.setState({ customer: row });
    } else {
      this.setState({
        customer: {
          name: "",
          cpf: "",
          phone: "",
          email: "",
          address: "",
          birthDate: "",
          gender: "",
          salary: ""
        }
      });
    }
    this.setState({ modalAddOrEditIsOpen: true });
  };

  closeModalAddOrEdit = () => {
    this.setState({ modalAddOrEditIsOpen: false });
  };

  save = async payload => {
    if (payload.id) {
      await updateCustomer(payload);
    } else {
      await saveCustomer(payload);
    }
    this.searchCustomer();
    this.closeModalAddOrEdit();
  };

  openModalDelete = row => {
    this.setState({ modalDeleteIsOpen: true, customer: row });
  };

  closeModalDelete = () => {
    this.setState({ modalDeleteIsOpen: false });
  };

  delete = async () => {
    await deleteCustomer(this.state.customer.id);
    this.searchCustomer();
    this.closeModalDelete();
  };

  formatCell = row => {
    return <div style={{ padding: "6px" }}>{row ? row : "-"}</div>;
  };

  formatCellSalary = row => {
    return (
      <div style={{ padding: "6px" }}>{`R$ ${
        row ? row.toLocaleString("pt-BR") : "00,00"
      }`}</div>
    );
  };

  formatCellDate = row => {
    if (row) {
      const date = `${row[2]}/${row[1] < 10 ? "0" + row[1] : row[1]}/${row[0]}`;
      return <div style={{ padding: "6px" }}>{date}</div>;
    }
    return <div>-</div>;
  };

  formatCellActions = row => {
    return (
      <div>
        <button
          className="btn"
          title="Editar"
          onClick={() => this.openModalAddOrEdit(row)}
        >
          <img src={Edit} alt="img" height="18" width="18" />
        </button>
        <button
          className="btn"
          title="Excluir"
          onClick={() => this.openModalDelete(row)}
        >
          <img src={Delete} alt="img" height="18" width="18" />
        </button>
      </div>
    );
  };

  columns = [
    {
      Header: "Nome",
      accessor: "name",
      Cell: row => this.formatCell(row.value)
    },
    {
      Header: "C.P.F",
      accessor: "cpf",
      Cell: row => this.formatCell(row.value)
    },
    {
      Header: "Nascimento",
      accessor: "birthDate",
      Cell: row => this.formatCellDate(row.value)
    },
    {
      Header: "Gênero",
      accessor: "gender",
      Cell: row => this.formatCell(row.value)
    },
    {
      Header: "Telefone",
      accessor: "phone",
      Cell: row => this.formatCell(row.value)
    },
    {
      Header: "E-mail",
      accessor: "email",
      Cell: row => this.formatCell(row.value)
    },
    {
      Header: "Endereço",
      accessor: "address",
      Cell: row => this.formatCell(row.value)
    },
    {
      Header: "Salário",
      accessor: "salary",
      Cell: row => this.formatCellSalary(row.value)
    },
    {
      Header: "Ações",
      Cell: row => this.formatCellActions(row.original),
      width: 100,
      show: this.props.user.profile === "admin"
    }
  ];

  render() {
    const { user } = this.props;
    const {
      data,
      modalAddOrEditIsOpen,
      modalDeleteIsOpen,
      customer
    } = this.state;

    return (
      <div>
        <h3>Clientes</h3>

        {user.profile === "admin" && (
          <div className="row">
            <div className="col-12">
              <Button
                style={{ float: "right" }}
                variant="primary"
                type="button"
                onClick={() => this.openModalAddOrEdit()}
              >
                Novo
              </Button>
            </div>
          </div>
        )}

        <div className="container">
          <div className="Table">
            <Table
              loading={data && !data.length}
              className="-highlight"
              data={data}
              columns={this.columns}
              pageSize={10}
              previousText="Anterior"
              nextText="Próxima"
              noDataText="Não foram encontrados resultados"
              pageText="Página"
              ofText="de"
              rowsText="linhas"
            />
          </div>
        </div>

        <Modal show={modalAddOrEditIsOpen} onHide={this.closeModalAddOrEdit}>
          <CustomerRegister
            close={this.closeModalAddOrEdit}
            save={this.save}
            customer={customer}
          />
        </Modal>

        <Modal show={modalDeleteIsOpen} onHide={this.closeModalDelete}>
          <Modal.Dialog>
            <Modal.Header closeButton>
              <Modal.Title>Excluir cliente</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <div className="container">
                <p>
                  Deseja realmente excluir este cliente?
                  <br />
                  Esta ação não poderá ser desfeita!
                </p>
              </div>
            </Modal.Body>

            <Modal.Footer>
              <Button variant="secondary" onClick={this.closeModalDelete}>
                Cancelar
              </Button>
              <Button variant="primary" type="submit" onClick={this.delete}>
                Confirmar
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal>
      </div>
    );
  }
}
