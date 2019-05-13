import React, { Component } from 'react'

import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import { Customer } from '../components/Customer/Customer'
import { Employee } from '../components/Employee/Employee';
import { Product } from '../components/Product/Product';
import { Sales } from '../components/sales/sales';
import Welcome from '../components/Welcome';

export default class Routes extends Component {

    render() {
        return (
            <Switch>
                <Route path="/" exact component={Welcome}/>
                <Route path="/funcionarios" exact component={Employee}/>
                <Route path="/clientes" exact component={Customer}/>
                <Route path="/produtos" exact component={Product}/>
                <Route path="/vendas" exact component={Sales}/>
            </Switch>
        )
    }
}
