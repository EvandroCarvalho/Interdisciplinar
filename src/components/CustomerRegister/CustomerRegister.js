import React, {Component} from '../../../node_modules/react'
import Form from '../../../node_modules/react-bootstrap/Form'
import Col from '../../../node_modules/react-bootstrap/Col'
import Button from '../../../node_modules/react-bootstrap/Button'
export class CustomerRegister extends Component {
    
    render() {
        return (
            <div>
                <h3>Cadastro de clientes</h3>
                
            <div className="col-md-8">
                <Form className="Form">
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Nome do Cliente</Form.Label>
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
                        <Form.Label>Endereço com o numero</Form.Label>
                        <Form.Control tyle="text" placeholder="Endereço" id="address"  />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Salvar
                    </Button>
                </Form>
            </div>
        </div>
        )
    }
}