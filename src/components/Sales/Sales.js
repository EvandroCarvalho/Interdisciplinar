import React, { Component } from 'react'
import styles from './Sales.css'
import { findEmployeeById, findEmployeeByName } from '../../actions/sales'

export class Sales extends Component {


    state = {
        employeeName: '',
        employeeId: '',
    }

    searchById = async (id) => {
        const { name: employeeName } = await findEmployeeById(id)
        if (employeeName) {
            this.setState({ employeeName })
        }

    }

    searchByName = async (name) => {
        const { id: employeeId } = await findEmployeeByName(name)
        if (employeeId) {
            this.setState({ employeeId })
        }
    }

    getId = (e) => {
        this.setState({ employeeId: e })
    }

    getName = (e) => {
        this.setState({ employeeName: e })
    }

    render() {
        return (
            <div>
                <div className="searchEmployee">
                    <div class="label col-md-12">
                        <h3>Dados do funcionário</h3>
                    </div>
                    <div class="container row">
                        <div class="input-group mb-3 col-md-3">
                            <input type="number" class="form-control" maxLength="4" placeholder="Id" min="1"
                                value={this.state.employeeId}
                                onChange={(e) => this.getId(e.target.value)}
                                onKeyUp={(e) => e.keyCode == 13 ? this.searchById(this.state.employeeId) : ''}
                            />
                            <div class="input-group-append">
                                <button class="btn btn-primary" type="button" id="searchByid"
                                    onClick={() => this.searchById(this.state.employeeId)}
                                >
                                    Procurar
                        </button>
                            </div>
                        </div>
                        <div class="input-group mb-3 col-md-6">
                            <input type="text" class="form-control" placeholder="Nome"
                                value={this.state.employeeName}
                                onChange={(e) => this.getName(e.target.value)}
                                onKeyUp={(e) => e.keyCode == 13 ? this.searchByName(this.state.employeeName) : ''}
                            />
                            <div class="input-group-append">
                                <button class="btn btn-primary" type="button" id="searchByName"
                                    onClick={() => this.searchByName(this.state.employeeName)}
                                >
                                    Procurar
                            </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="searchCustomer">
                    <div class="label col-md-12">
                        <h3>Dados do Cliente</h3>
                    </div>
                    <div class="input-group mb-3 col-md-6">
                            <input type="text" class="form-control" placeholder="C.P.F Cliente"
                                // value={this.state.employeeName}
                                // onChange={(e) => this.getName(e.target.value)}
                                // onKeyUp={(e) => e.keyCode == 13 ? this.searchByName(this.state.employeeName) : ''}
                            />
                            <div class="input-group-append">
                                <button class="btn btn-primary" type="button" id="searchByName"
                                   // onClick={() => this.searchByName(this.state.employeeName)}
                                >
                                    Consultar
                            </button>
                            </div>
                        </div>
                </div>
            </div>
        )
    }
}