import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import InputMask from "react-input-mask";

export class EmployeeRegister extends Component {
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
    const { employee, close } = this.props;

    return (
      <Modal.Dialog>
        <Form onSubmit={this.handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Cadastro de funcionários</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <div className="col-md-12">
              <Form.Control hidden id="id" defaultValue={employee.id} />
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nome do Funcionário"
                size="md"
                id="name"
                defaultValue={employee.name}
              />
              <Form.Label>C.P.F</Form.Label>
              <InputMask
                mask="999.999.999-99"
                className="form-control"
                placeholder="CPF do Funcionário"
                defaultValue={employee.cpf}
                type="text"
                id="cpf"
              />
              <Form.Row>
                <Form.Group as={Col} md="3">
                  <Form.Label>Telefone</Form.Label>
                  <InputMask
                    mask="(99) 99999-9999"
                    className="form-control"
                    type="text"
                    placeholder="Telefone"
                    id="phone"
                    defaultValue={employee.phone}
                  />
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label>Email </Form.Label>
                  <Form.Control
                    type="email"
                    md="4"
                    placeholder="E-mail"
                    id="email"
                    defaultValue={employee.email}
                  />
                </Form.Group>
              </Form.Row>
              <Form.Group>
                <Form.Label>Endereço completo</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Endereço"
                  id="address"
                  defaultValue={employee.address}
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
