import React, {Component} from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

export default class Product extends Component {


    state = {
        modalAddIsOpen: false
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
                <h3>Produtos</h3>
                
                <Button variant="primary" type="button" onClick={() => this.openModalAdd()}>
                    Novo
                </Button>

                <Modal show={this.state.modalAddIsOpen} onHide={this.closeModalAdd} >
                    <Modal.Dialog>
                        <Modal.Header closeButton>
                            <Modal.Title>Cadastro de produto</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                            <div>cadastro</div>
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