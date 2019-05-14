import React, { Component } from 'react'

import { Switch, Route} from 'react-router-dom'
import Customer from '../components/Customer'
import Employee from '../components/Employee';
import Product from '../components/Product';
import Sales from '../components/Sales';
import Welcome from '../components/Welcome';
import product from '../components/Sales/products';

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