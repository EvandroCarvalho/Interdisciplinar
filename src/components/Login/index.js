import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default class Login extends Component {
  onSubmit = e => {
    e.preventDefault();
    const elements = [...e.target.elements];
    const user = elements.reduce((result, current) => {
      if (!current.value || (current.type === "radio" && !current.checked)) {
        return result;
      }
      return this.getElementNameAndValue(current, result);
    }, {});

    if (!this.props.searchUser(user))
      this.setState({ invalid: "usuário ou senha incorreta" });
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
    return (
      <div>
        <Form onSubmit={this.onSubmit}>
          <div className="container">
            <div className="row justify-content-md-center">
              <div className="col-md-4">
                <div style={{ padding: "0px 0px 5px 0px" }}>
                  <Form.Label>Usuário</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="usuário"
                    size="md"
                    id="username"
                    defaultValue=""
                  />
                </div>
                <div style={{ padding: "5px 0px 5px 0px" }}>
                  <Form.Label>Senha</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="senha"
                    size="md"
                    id="password"
                    defaultValue=""
                  />
                </div>
              </div>
            </div>
            <div className="row justify-content-md-center">
              <div style={{ padding: "5px 0px 0px 0px" }}>
                <Button variant="primary" type="submit">
                  Entrar
                </Button>
              </div>
            </div>
          </div>
        </Form>
      </div>
    );
  }
}
