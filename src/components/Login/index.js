import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import logo from "../../assets/img/logo_gestao.png";
import { findUserByUsername } from "../../actions/user";
import "./styles.css";

export default class Login extends Component {
  state = {
    notFound: false,
    wrong: false,
    notWork: false
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

    if (!response || response === "") return this.setState({ notWork: true });
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
    const { notFound, wrong, notWork } = this.state;

    return (
      <>
        <Form className="form" onSubmit={this.onSubmit}>
          <div className="container">
            <div className="imgcontainer">
              <img src={logo} alt="Logomarca Gestão" className="logo" />
            </div>

            <Form.Label>
              <b>Nome do usuário</b>
            </Form.Label>
            <Form.Control
              className="input"
              required
              type="text"
              placeholder="usuário"
              size="md"
              id="username"
              defaultValue=""
            />

            <Form.Label>
              <b>Senha</b>
            </Form.Label>
            <Form.Control
              className="input"
              required
              type="password"
              placeholder="senha"
              size="md"
              id="password"
              defaultValue=""
            />

            <div className="text-danger" hidden={!notFound}>
              <p>Usuário não encontrado</p>
            </div>
            <div className="text-danger" hidden={!wrong}>
              <p>Senha incorreta</p>
            </div>
            <div className="text-danger" hidden={!notWork}>
              <p>Ops! Tivemos um erro, favor tentar novamente mais tarde.</p>
            </div>

            <Button
              className="button"
              variant="primary"
              type="submit"
              onClick={() => this.setState({ notFound: false, wrong: false })}
            >
              Entrar
            </Button>
          </div>
        </Form>
      </>
    );
  }
}
