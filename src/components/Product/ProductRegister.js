import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import CurrencyInput from "react-currency-input";

export class ProductRegister extends Component {
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
    payloadResult[elementName] = element.value
      // eslint-disable-next-line
      .replace(/(\.|\(|\)|\-|\_|\R\$)/g, "")
      // eslint-disable-next-line
      .replace(/(\,)/g, ".");
    return payloadResult;
  };

  render() {
    const { product, close } = this.props;

    return (
      <Modal.Dialog>
        <Form onSubmit={this.handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Cadastro de produto</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <div className="col-md-12">
              <Form.Control hidden id="id" defaultValue={product.id} />
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nome do Produto"
                size="md"
                id="name"
                defaultValue={product.name}
              />
              <Form.Label>Marca</Form.Label>
              <Form.Control
                type="text"
                placeholder="Marca do Produto"
                size="md"
                id="brand"
                defaultValue={product.brand}
              />
              <Form.Row>
                <Form.Group as={Col} md="4">
                  <Form.Label>Preço de venda</Form.Label>
                  <CurrencyInput
                    decimalSeparator=","
                    thousandSeparator="."
                    prefix="R$ "
                    className="form-control"
                    id="sellPrice"
                    value={product.sellPrice}
                  />
                </Form.Group>
                <Form.Group as={Col} md="4">
                  <Form.Label>Preço</Form.Label>
                  <CurrencyInput
                    decimalSeparator=","
                    thousandSeparator="."
                    prefix="R$ "
                    className="form-control"
                    id="price"
                    value={product.price}
                  />
                </Form.Group>
              </Form.Row>
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
