import React, {Component} from 'react'
import './styles.css'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Table from 'react-table'
import Edit from '../../assets/img/edit.png';
import Delete from '../../assets/img/delete.png';
import 'react-table/react-table.css'

export default class Customer extends Component {


    state = {
        modalAddIsOpen: false,
        modalRemoveIsOpen: false
    };

    openModalAdd = () => {
        this.setState({modalAddIsOpen: true});
    };

    closeModalAdd = () => {
        this.setState({modalAddIsOpen: false});
    };

    add = () => {
        this.setState({modalAddIsOpen: false});
    };

    formatCell = (row) => {
        return (<div style={{ padding: "6px" }}>{row}</div>)
    }

    formatCellActions = (row) => {
        return (
            <div>
                <button className="btn" title="Editar" onClick={() => console.log(row)}>
                    <img src={Edit} alt="img" height="18" width="18" />
                </button>
                <button className="btn" title="Excluir" onClick={() => console.log(row)}>
                    <img src={Delete} alt="img" height="18" width="18" />
                </button>
            </div>
        );
    }

    columns = [{
        Header: "Nome",
        accessor: "name",
        Cell: row => (this.formatCell(row.value))
    }, {
        Header: "C.P.F",
        accessor: "cpf",
        Cell: row => (this.formatCell(row.value))
    }, {
        Header: "Telefone",
        accessor: "phone",
        Cell: row => (this.formatCell(row.value))
    }, {
        Header: "E-mail",
        accessor: "email",
        Cell: row => (this.formatCell(row.value))
    }, {
        Header: "Endereço",
        accessor: "address",
        Cell: row => (this.formatCell(row.value))
    }, {
        Header: "Ações",
        Cell: row => (this.formatCellActions(row.original)),
        width: 100
    }];

    data = [{
        name: "Natália",
        cpf: "063.076.736-05",
        phone: "(34) 99191-1201",
        email: "nataliapmartins10@hotmail.com",
        address: "Rua Rezende, n.242, ap.202, centro"
    }];

    render() {
        return (
            <div>
                <h3>Clientes</h3>
                
                <div className="row">
                    <div className="col-12">
                        <Button style={{float: "right"}} variant="primary" type="button" onClick={() => this.openModalAdd()}>
                            Novo
                        </Button>
                    </div>
                </div>

                <div className="container">
                    <div className="Table">
                        <Table className="-highlight" data={this.data} columns={this.columns} pageSize={10}/>
                    </div>
                </div>

                <Modal show={this.state.modalAddIsOpen} onHide={this.closeModalAdd} >
                    <Modal.Dialog>
                        <Modal.Header closeButton>
                            <Modal.Title>Cadastro de clientes</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                            <div className="col-md-12">
                                <Form className="Form">
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Nome</Form.Label>
                                        <Form.Control tyle="text" placeholder="Nome do Cliente" size="md" id="name"/>
                                        <Form.Label>C.P.F</Form.Label>
                                        <Form.Control tyle="text" placeholder="CPF do Cliente" id="cpf"  />
                                        <Form.Row>
                                            <Form.Group as={Col} md="3" controlId="validationFormikPhone">
                                                <Form.Label>Telefone</Form.Label>
                                                <Form.Control tyle="text" placeholder="Telefone" id="phone"  />
                                            </Form.Group>
                                            <Form.Group as={Col} controlId="validationFormikPassword">
                                                <Form.Label>Email </Form.Label>
                                                <Form.Control type="email" md="4" placeholder="E-mail" id="email" />
                                            </Form.Group>
                                        </Form.Row>
                                        <Form.Label>Endereço completo</Form.Label>
                                        <Form.Control tyle="text" placeholder="Endereço" id="address"  />
                                    </Form.Group>
                                </Form>
                            </div>
                        </Modal.Body>

                        <Modal.Footer>
                            <Button variant="secondary" onClick={this.closeModalAdd}>Cancelar</Button>
                            <Button variant="primary" type="submit" onClick={this.add}>Salvar</Button>
                        </Modal.Footer>
                    </Modal.Dialog>
                </Modal>
            </div>
        )
    }
}