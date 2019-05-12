import React, {Component} from '../../../node_modules/react'
import Form from '../../../node_modules/react-bootstrap/Form'
import Modal from '../../../node_modules/react-bootstrap/Modal'
import Col from '../../../node_modules/react-bootstrap/Col'
import Button from '../../../node_modules/react-bootstrap/Button'

export class ProductRegister extends Component {
    

    save = () => {
        this.props.close();    
    }
    
    render() {
        return (
            <Modal.Dialog>
                <Modal.Header closeButton>
                    <Modal.Title>Cadastro de produtos</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={this.props.close}>Cancelar</Button>
                    <Button variant="primary" onClick={this.save}>Salvar</Button>
                </Modal.Footer>
            </Modal.Dialog>                
        )
    }
}