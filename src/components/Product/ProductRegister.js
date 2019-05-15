import React, {Component} from 'react'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

export class ProductRegister extends Component {

    
    handleSubmit = (e) => {
        const { save } = this.props
        e.preventDefault() 

        const elements = [...e.target.elements]
        const payload = elements.reduce((result, current) => {
            if (!current.value || (current.type === "radio" && !current.checked)) {
            return result
            }
            return this.getElementNameAndValue(current, result)
        }, {})

        save(payload)
    }

    getElementNameAndValue = (element, returnObject) => {
        let payloadResult = { ...returnObject }
        let elementName = element.name.length ? element.name : element.id
        if (elementName && elementName.length) {
          if (elementName.includes(".")) {
            let nameSplit = elementName.split(".")
            payloadResult[nameSplit[0]] = {
              [nameSplit[1]]: element.value
            }
          } else {
            payloadResult[elementName] = element.value
          }
        }
        return payloadResult
    }

    render() {
        const { product, close } = this.props
        
        return (
            <Modal.Dialog>
                <Form onSubmit={this.handleSubmit}>
                    <Modal.Header closeButton>
                        <Modal.Title>Cadastro de produto</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <div className="col-md-12">
                            <Form.Group controlId="formBasicEmail">
                                <Form.Control
                                    hidden
                                    id="id"
                                    defaultValue={product.id}
                                />
                                <Form.Label>Nome</Form.Label>
                                <Form.Control
                                    tyle="text"
                                    placeholder="Nome do Produto"
                                    size="md"
                                    id="nome"
                                    defaultValue={product.nome} 
                                />
                                <Form.Label>Descricao</Form.Label>
                                <Form.Control
                                    tyle="text"
                                    placeholder="Descricao do Produto"
                                    id="descricao"
                                    defaultValue={product.descricao}
                                />

                                <Form.Label>Valor Unitario</Form.Label>
                                        <Form.Control
                                            tyle="text"
                                            placeholder="valor Unitario"
                                            id="valorUnitario"
                                            defaultValue={product.valorUnitario}
                                        />
                                                                                                               
                                        <Form.Label>Quantidade </Form.Label>
                                        <Form.Control
                                            type="text"
                                            md="4"
                                            placeholder="Quantidade"
                                            id="quantidade"
                                            defaultValue={product.quantidade}
                                        />

                                        <Form.Label>Fabricante</Form.Label>
                                        <Form.Control
                                            tyle="text"
                                            placeholder="Fabricante"
                                            id= "fabricante" /*--"address"*/
                                            defaultValue={product.fabricante}
                                        />
                                                              
                            </Form.Group>
                        </div>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={close}>Cancelar</Button>
                        <Button variant="primary" type="submit">Salvar</Button>
                    </Modal.Footer>
                </Form>
            </Modal.Dialog>
        )
    }
}