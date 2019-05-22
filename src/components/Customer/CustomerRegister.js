import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

export class CustomerRegister extends Component {
  handleSubmit = e => {
    const { save } = this.props;
    e.preventDefault();

    const elements = [...e.target.elements];
    const payload = elements.reduce((result, current) => {
      if (!current.value || (current.type === "radio" && !current.checked)) {
        return result;
      }
      return this.getElementNameAndValue(current, result);
    }, {});

    save(payload);
  };

  getElementNameAndValue = (element, returnObject) => {
    let payloadResult = { ...returnObject };
    let elementName = element.name.length ? element.name : element.id;
    if (elementName && elementName.length) {
      if (elementName.includes(".")) {
        let nameSplit = elementName.split(".");
        payloadResult[nameSplit[0]] = {
          [nameSplit[1]]: element.value
        };
      } else {
        payloadResult[elementName] = element.value;
      }
    }
    return payloadResult;
  };

  render() {
    const { customer, close } = this.props;

    return (
      <Modal.Dialog>
        <Form onSubmit={this.handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Cadastro de clientes</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <div className="col-md-12">
              <Form.Control hidden id="id" defaultValue={customer.id} />
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nome do Cliente"
                size="md"
                id="name"
                defaultValue={customer.name}
              />
              <Form.Label>C.P.F</Form.Label>
              <Form.Control
                type="text"
                placeholder="CPF do Cliente"
                id="cpf"
                defaultValue={customer.cpf}
              />
              <Form.Row>
                <Form.Group as={Col} md="3">
                  <Form.Label>Telefone</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Telefone"
                    id="phone"
                    defaultValue={customer.phone}
                  />
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label>Email </Form.Label>
                  <Form.Control
                    type="email"
                    md="4"
                    placeholder="E-mail"
                    id="email"
                    defaultValue={customer.email}
                  />
                </Form.Group>
              </Form.Row>
              <Form.Group>
                <Form.Label>Endereço completo</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Endereço"
                  id="address"
                  defaultValue={customer.address}
                />
              </Form.Group>
            </div>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={close}>
              Cancelar
            </Button>
            <Button variant="primary" type="submit">
              Salvar
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Dialog>
    );
  }
}
