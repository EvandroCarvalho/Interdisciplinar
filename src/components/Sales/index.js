import React, { Component } from 'react'
import './styles.css'
import { findEmployeeById, findEmployeeByName } from '../../actions/sales'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import InputMask from 'react-input-mask'
import { findCustomerByCPF } from '../../actions/customer'
import { Link } from 'react-router-dom';

export default class Sales extends Component {

    state = {
        employeeName: '',
        employeeId: '',
        findCustomer: false,
        customerCPF: '',
        customer: {
            id: '',
            name: '',
            phone: '',
            email: '',
            address: '',
        },
        cpfMask: '999.999.999-99',
        cnpjMask: '99.999.999/9999-99',
        inputRadioPlaceHolder: '',
        isCPF: false,
        isCNPJ: false,
        customerNotFound: false,
        employeeNotFound: false
    }

    searchEmployeeById = async (id) => {
        const { name: employeeName } = await findEmployeeById(id)
        if (employeeName) {
            this.setState({ employeeName, employeeNotFound: false })
        } else {
            this.setState({employeeNotFound: true})
        }

    }

    searchEmployeeByName = async (name) => {
        const response = await findEmployeeByName(name)
        if (response.status === 404) {
            this.setState({employeeNotFound: true})
        } else {
            this.setState({ employeeId: response[0].id,
                employeeName: response[0].name,
                employeeNotFound: false
             })
        }
    }

    getId = (e) => {
        this.setState({ employeeId: e })
    }

    getName = (e) => {
        this.setState({ employeeName: e })
    }

    getCustomerCPF = (cpf) => {
        this.setState({ customerCPF: cpf })
    }

    searchCustomerByCPF = async (cpf) => {
        const response = await findCustomerByCPF(cpf)
        await this.setState({ customer: response })
        if (response.name) {
            this.setState({ findCustomer: true, customerNotFound: false })
        } else {
            this.setState({ customerNotFound: true, findCustomer: false })
        }
    }

    checkedCPF = (checked) => {
        this.setState({
            isCPF: checked,
            inputRadioPlaceHolder: 'C.P.F. do cliente'
        })
    }
    checkedCNPJ = (checked) => {
        this.setState({
            isCNPJ: checked,
            inputRadioPlaceHolder: 'C.N.P.J. do cliente'
        })
    }

    render() {
        const { employeeId,
            employeeName,
            findCustomer,
            customerCPF,
            customer,
            customerNotFound,
            isCPF,
            isCNPJ,
            cnpjMask,
            cpfMask,
            inputRadioPlaceHolder,
            employeeNotFound } = this.state
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
                                onKeyUp={(e) => e.keyCode === 13 ? this.searchEmployeeById(employeeId) : ''}
                            />
                            <div className="input-group-append">
                                <button className="btn btn-primary" type="button" id="searchByid"
                                    onClick={() => this.searchEmployeeById(employeeId)}
                                >
                                    Consultar
                                </button>
                            </div>
                        </div>
                        <div className="input-group mb-3 col-md-6">
                            <input type="text" className="form-control" placeholder="Nome"
                                value={employeeName}
                                onChange={(e) => this.getName(e.target.value)}
                                onKeyUp={(e) => e.keyCode === 13 ? this.searchEmployeeByName(employeeName) : ''}
                            />
                            <div className="input-group-append">
                                <button className="btn btn-primary" type="button" id="searchByName"
                                    onClick={() => this.searchEmployeeByName(employeeName)}
                                >
                                    Consultar
                            </button>
                            </div>
                        </div>
                    </div>
                    <div hidden={!employeeNotFound} className="CustomerNotFound">
                            <p className="text-danger">Funcionário não cadastrado</p>
                    </div>
                </div>
                <div className="searchCustomer">
                    <div className="label col-md-12">
                        <h3>Consulta Dados do Cliente</h3>
                    </div>
                    <div>
                        <div className="container col">
                            <div>
                                <input type="radio"
                                    name="typeCustomer"
                                    id="typeCustomer"
                                    value={customerCPF}
                                    onChange={(e) => this.checkedCPF(e.target.checked)}
                                />
                                <label>C.P.F</label>
                            </div>
                            <div>
                                <input type="radio"
                                    name="typeCustomer"
                                    id="typeCustomer"
                                    value={customerCPF}
                                    onChange={(e) => this.checkedCNPJ(e.target.checked)}
                                />
                                <label>C.N.P.J</label>
                            </div>
                            <div className="container row col-md-6 input-group mb-3">
                                <div>
                                    <InputMask mask={isCPF ? cpfMask : cnpjMask }
                                        disabled={!(isCNPJ || isCPF)}
                                        className="form-control"
                                        placeholder={inputRadioPlaceHolder} 
                                        value={customerCPF}
                                        onChange={(e) => this.getCustomerCPF(e.target.value.replace(/[^0-9]+/g, ''))}
                                        onKeyUp={(e) => e.keyCode === 13 ? this.searchCustomerByCPF(customerCPF) : ''}
                                    >
                                    </InputMask>
                                </div>
                                <div className="input-group-append" disabled={true}>
                                    <button className="btn btn-primary" type="button" id="searchByName"
                                        onClick={() => this.searchCustomerByCPF(customerCPF)}
                                    >
                                            Consultar
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div hidden={!customerNotFound} className="CustomerNotFound">
                            <p className="text-danger">Cliente não cadastrado</p>
                        </div>
                    </div>
                    <div>
                        <div className="col-md-8" hidden={!findCustomer}>
                            <Form className="Form">
                                <Form.Group>
                                    <Form.Label>Nome</Form.Label>
                                    <Form.Control
                                        tyle="text"
                                        placeholder="Nome do Cliente"
                                        size="lg"
                                        id="name"
                                        disabled={findCustomer}
                                        defaultValue={customer.name}
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
                                                disabled={findCustomer}
                                                defaultValue={customer.email}
                                            />
                                        </Form.Group>
                                    </Form.Row>
                                    <Form.Label>Endereço completo o numero</Form.Label>
                                    <Form.Control
                                        tyle="text"
                                        placeholder="Endereço"
                                        id="address"
                                        disabled={findCustomer}
                                        defaultValue={customer.address}
                                    />
                                </Form.Group>
                                <div>
                                        <Link to={{
                                            pathname: "vendas/produtos",
                                            state: {
                                                employeeId,
                                                customerId: customer.id,
                                            }  
                                        }}>
                                            <Button variant="primary" type="submit">
                                                Confirmar
                                            </Button>
                                        </Link>
                                </div>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}