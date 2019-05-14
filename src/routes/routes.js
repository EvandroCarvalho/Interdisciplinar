import React, { Component } from 'react'

import { Switch, Route} from 'react-router-dom'
import Customer from '../components/customer'
import Employee from '../components/employee';
import Product from '../components/product';
import Sales from '../components/sales';
import Welcome from '../components/welcome';
import product from '../components/sales/products';

export default class Routes extends Component {

    render() {
        return (
            <Switch>
                <Route path="/" exact component={Welcome}/>
                <Route path="/funcionarios" exact component={Employee}/>
                <Route path="/clientes" exact component={Customer}/>
                <Route path="/produtos" exact component={Product}/>
                <Route path="/vendas" exact component={Sales}/>
                <Route path="/vendas/produtos" exact component={product}/>
            </Switch>
        )
    }
}