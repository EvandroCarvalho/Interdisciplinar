import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { findUserByUsername } from "../../actions/user";

export default class Login extends Component {
  state = {
    notFound: false,
    wrong: false
  };

  onSubmit = e => {
    e.preventDefault();
    const elements = [...e.target.elements];
    const user = elements.reduce((result, current) => {
      if (!current.value || (current.type === "radio" && !current.checked)) {
        return result;
      }
      return this.getElementNameAndValue(current, result);
    }, {});

    this.searchUser(user);
  };

  searchUser = async user => {
    const { setUser } = this.props;
    const response = await findUserByUsername(user.username);
    if (!response.id) return this.setState({ notFound: true });
    if (response.id && user.password !== response.password)
      return this.setState({ wrong: true });
    return setUser(response);
  };

  getElementNameAndValue = (element, returnObject) => {
    let payloadResult = { ...returnObject };
    let elementName = element.name.length ? element.name : element.id;
    payloadResult[elementName] = element.value;
    return payloadResult;
  };

  render() {
    const { notFound, wrong } = this.state;

    return (
      <Form onSubmit={this.onSubmit}>
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
          <div className="text-danger" hidden={!notFound}>
            <p>Usuário não encontrado</p>
          </div>
          <div className="text-danger" hidden={!wrong}>
            <p>Senha incorreta</p>
          </div>

          <div style={{ padding: "5px 0px 0px 0px" }}>
            <Button
              variant="primary"
              type="submit"
              onClick={() => this.setState({ notFound: false, wrong: false })}
            >
              Entrar
            </Button>
          </div>
        </div>
      </Form>
    );
  }
}
