import React, { Component } from "react";

import { Switch, Route } from "react-router-dom";
import Customer from "../components/Customer";
import Employee from "../components/Employee";
import Product from "../components/Product";
import Sales from "../components/Sales";
import Welcome from "../components/Welcome";
import ProductsSale from "../components/Sales/productsSale";

export default class Routes extends Component {
  render() {
    const { user } = this.props;
    return (
      <Switch>
        <Route path="/" exact component={() => <Welcome user={user} />} />
        <Route path="/" exact component={() => <Welcome user={user} />} />
        <Route
          path="/funcionarios"
          exact
          component={() => <Employee user={user} />}
        />
        <Route
          path="/clientes"
          exact
          component={() => <Customer user={user} />}
        />
        <Route
          path="/produtos"
          exact
          component={() => <Product user={user} />}
        />
        <Route path="/vendas" exact component={() => <Sales user={user} />} />
        <Route
          path="/vendas/produtos"
          exact
          component={() => <ProductsSale user={user} />}
        />
      </Switch>
    );
  }
}
