import React, { Component } from '../../../node_modules/react'
import './sales.css'
import { findEmployeeById, findEmployeeByName } from '../../actions/sales'
import Form from '../../../node_modules/react-bootstrap/Form'
import Row from '../../../node_modules/react-bootstrap/Row'
import Col from '../../../node_modules/react-bootstrap/Col'
import Button from '../../../node_modules/react-bootstrap/Button'
import InputMask from '../../../node_modules/react-input-mask'
import { findCustomerByCPF } from '../../actions/customer'

export class Sales extends Component {


    state = {
        employeeName: '',
        employeeId: '',
        findCustomer: false,
        customerCPF: '',
        customer: {
            name: '',
            phone: '',
            email: '',
            address: '',
        },
        customerNotFound: false
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

    getCustomerCPF = (cpf) => {
        this.setState({customerCPF: cpf})
    }

    searchCustomerByCPF = async (cpf) => {
        const response = await findCustomerByCPF(cpf)
        this.setState({customer : response})
        if(response.name) {
            this.setState({findCustomer: true})
            this.setState({customerNotFound: false})
        }else {
            this.setState({customerNotFound: true})
            this.setState({findCustomer: false})
        }
    }

    render() {
        const { employeeId,
            employeeName,
            findCustomer,
            customerCPF,
            customer,
            customerNotFound } = this.state
        return (
            <div>
                <div className="searchEmployee">
                    <div className="label col-md-12">
                        <h3>Dados do funcionário</h3>
                    </div>
                    <div className="container row">
                        <div className="input-group mb-3 col-md-3">
                            <input type="number" className="form-control" maxLength="4" placeholder="Id" min="1"
                                value={employeeId}
                                onChange={(e) => this.getId(e.target.value)}
                                onKeyUp={(e) => e.keyCode == 13 ? this.searchById(employeeId) : ''}
                            />
                            <div className="input-group-append">
                                <button className="btn btn-primary" type="button" id="searchByid"
                                    onClick={() => this.searchById(employeeId)}
                                >
                                    Procurar
                        </button>
                            </div>
                        </div>
                        <div className="input-group mb-3 col-md-6">
                            <input type="text" className="form-control" placeholder="Nome"
                                value={employeeName}
                                onChange={(e) => this.getName(e.target.value)}
                                onKeyUp={(e) => e.keyCode == 13 ? this.searchByName(employeeName) : ''}
                            />
                            <div className="input-group-append">
                                <button className="btn btn-primary" type="button" id="searchByName"
                                    onClick={() => this.searchByName(employeeName)}
                                >
                                    Procurar
                            </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="searchCustomer">
                    <div className="label col-md-12">
                        <h3>Consulta Dados do Cliente</h3>
                    </div>
                    <div className="input-group mb-3 col-md-3">
                        <InputMask mask="999.999.999-99" placeholder="C.P.F. do cliente" className="form-control"
                            value={customerCPF}
                            onChange={(e) => this.getCustomerCPF(e.target.value.replace(/[^0-9]+/g,''))}
                            onKeyUp={(e) => e.keyCode == 13 ? this.searchCustomerByCPF(customerCPF) : ''}
                            >
                        </InputMask>
                        <div className="input-group-append">
                            <button className="btn btn-primary" type="button" id="searchByName"
                             onClick={() => this.searchCustomerByCPF(customerCPF)}
                            >
                                Consultar
                            </button>
                        </div>
                        <div hidden={!customerNotFound}>
                            <p className="text-danger">Cliente não encontrado</p>
                        </div>
                    </div>
                    <div>
                        <div className="col-md-8" hidden={!findCustomer}>
                            <Form className="Form">
                                <Form.Group>
                                    <Form.Label>Nome do Cliente</Form.Label>
                                    <Form.Control 
                                        tyle="text"
                                        placeholder="Nome do Cliente"
                                        size="md"
                                        id="name"
                                        disabled={findCustomer}
                                        value={customer.name}
                                    />
                                    <Form.Label hidden={true}>C.P.F</Form.Label>
                                    <Form.Control tyle="text"
                                        placeholder="CPF do Cliente" 
                                        id="cpf" hidden={true} 
                                        disabled={findCustomer} 
                                    />
                                    <Form.Row>
                                        <Form.Group as={Col} md="3">
                                            <Form.Label>Telefone</Form.Label>
                                            <Form.Control
                                                tyle="text"
                                                placeholder="Telefone"
                                                id="phone"
                                                disabled={findCustomer}
                                                value={customer.phone}
                                            />
                                        </Form.Group>
                                        <Form.Group as={Col}>
                                            <Form.Label>Email </Form.Label>
                                            <Form.Control
                                                type="email"
                                                md="4"
                                                placeholder="E-mail"
                                                id="email"
                                                disabled={findCustomer}
                                                value={customer.email}
                                                />
                                        </Form.Group>
                                    </Form.Row>
                                    <Form.Label>Endereço com o numero</Form.Label>
                                    <Form.Control 
                                        tyle="text"
                                        placeholder="Endereço"
                                        id="address"
                                        disabled={findCustomer}
                                        value={customer.address}
                                    />
                                </Form.Group>
                                <Button variant="primary" type="submit">
                                    Confirmar
                                </Button>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}