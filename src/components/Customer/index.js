import React, {Component} from 'react'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

export class Customer extends Component {


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
        this.setState({modalAddIsOpen: false})
    };

    render() {
        return (
            <div>
                <h3>Clientes</h3>     
                <Button variant="primary" type="button" onClick={() => this.openModalAdd()}>
                    Novo
                </Button>

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