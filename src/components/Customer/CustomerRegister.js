import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import InputMask from "react-input-mask";
import CurrencyInput from "react-currency-input";

export class CustomerRegister extends Component {
  state = {
    isCPF: true,
    isCNPJ: false,
    cnpjMask: "99.999.999/9999-99",
    cpfMask: "999.999.999-99",
    inputRadioPlaceHolder: "C.P.F. do cliente"
  };

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

  componentDidMount() {
    const { customer } = this.props;
    if (customer.cpf.length > 11) this.setState({ isCPF: false, isCNPJ: true });
  }

  getElementNameAndValue = (element, returnObject) => {
    let payloadResult = { ...returnObject };
    let elementName = element.name.length ? element.name : element.id;
    payloadResult[elementName] = element.value
      // eslint-disable-next-line
      .replace(/(\.|\(|\) |\-|\_|\R\$)/g, "")
      // eslint-disable-next-line
      .replace(/(\,)/g, ".");
    return payloadResult;
  };

  checkedCPF = checked => {
    this.setState({
      isCPF: checked,
      isCNPJ: !checked,
      inputRadioPlaceHolder: "C.P.F. do cliente"
    });
  };

  checkedCNPJ = checked => {
    this.setState({
      isCPF: !checked,
      isCNPJ: checked,
      inputRadioPlaceHolder: "C.N.P.J. do cliente"
    });
  };

  getBirthDate() {
    const { customer } = this.props;
    if (customer.birthDate) {
      const date = `${customer.birthDate[2]}/${
        customer.birthDate[1] < 10
          ? "0" + customer.birthDate[1]
          : customer.birthDate[1]
      }/${customer.birthDate[0]}`;
      return date;
    }
  }

  render() {
    const { customer, close } = this.props;
    const {
      isCPF,
      isCNPJ,
      inputRadioPlaceHolder,
      cpfMask,
      cnpjMask
    } = this.state;

    return (
      <Modal.Dialog>
        <Form onSubmit={this.handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Cadastro de clientes</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form.Control hidden id="id" defaultValue={customer.id} />
            <Form.Group>
              <Form.Label>Nome</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Nome do Cliente"
                size="md"
                id="name"
                defaultValue={customer.name}
              />
            </Form.Group>
            <Form.Group>
              <Form.Row>
                <Form.Group as={Col} md="3">
                  <Form.Check
                    type="radio"
                    name="typeCustomer"
                    label="C.P.F"
                    checked={isCPF}
                    onChange={e => this.checkedCPF(e.target.checked)}
                  />
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Check
                    type="radio"
                    label="C.N.P.J"
                    name="typeCustomer"
                    checked={isCNPJ}
                    onChange={e => this.checkedCNPJ(e.target.checked)}
                  />
                </Form.Group>
              </Form.Row>
              <Form.Label>{inputRadioPlaceHolder}</Form.Label>
              <InputMask
                required
                mask={isCPF ? cpfMask : cnpjMask}
                className="form-control"
                placeholder={inputRadioPlaceHolder}
                defaultValue={customer.cpf}
                type="text"
                id="cpf"
                onChange={this.removeMask}
              />
            </Form.Group>
            <Form.Row>
              <Form.Group as={Col} md="8">
                <Form.Label>Nascimento</Form.Label>
                <InputMask
                  mask="99/99/9999"
                  className="form-control"
                  type="text"
                  placeholder="Data de Nascimento do Cliente"
                  defaultValue={this.getBirthDate()}
                  id="birthDate"
                />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Gênero</Form.Label>
                <Form.Control
                  id="gender"
                  defaultValue={customer.gender}
                  as="select"
                >
                  <option value="F">F</option>
                  <option value="M">M</option>
                  />
                </Form.Control>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} md="3">
                <Form.Label>Telefone</Form.Label>
                <InputMask
                  mask="(99) 99999-9999"
                  className="form-control"
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
            <Form.Label>Salário</Form.Label>
            <CurrencyInput
              decimalSeparator=","
              thousandSeparator="."
              prefix="R$ "
              className="form-control"
              id="salary"
              value={customer.salary}
            />
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
