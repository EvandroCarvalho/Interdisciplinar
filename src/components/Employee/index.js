import React, {Component} from 'react'
import 'react-table/react-table.css'
import './styles.css'
import { EmployeeRegister } from './EmployeeRegister'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Table from 'react-table'
import Edit from '../../assets/img/edit.png'
import Delete from '../../assets/img/delete.png'
import {
    findEmployee,
    saveEmployee,
    updateEmployee,
    deleteEmployee
} from '../../actions/employee'

export default class Employee extends Component {


    state = {
        data: [],
        modalAddOrEditIsOpen: false,
        modalRemoveIsOpen: false,
        employee: {
            name: '',
            cpf: '',
            phone: '',
            email: '',
            address: ''
        }
    }

    componentDidMount() {
        this.searchEmployee()
    }

    searchEmployee = async () => {
        const response = await findEmployee()
        this.setState({data: response.content})
    }

    openModalAddOrEdit = (row) => {
        if (row) {
            this.setState({employee: row})
        } else {
            this.setState({employee: {
                name: '', 
                cpf: '',
                phone: '',
                email: '',
                address: ''
            }})
        }
        this.setState({modalAddOrEditIsOpen: true})
    }

    closeModalAddOrEdit = () => {
        this.setState({modalAddOrEditIsOpen: false})
    }

    save = async (payload) => {
        if (payload.id) {
            await updateEmployee(payload)
        } else {
            await saveEmployee(payload)
        }
        this.searchEmployee()  
        this.closeModalAddOrEdit()
    }

    openModalDelete = (row) => {
        this.setState({modalDeleteIsOpen: true, employee: row})
    }

    closeModalDelete = () => {
        this.setState({modalDeleteIsOpen: false})
    }

    delete = async () => {
        await deleteEmployee(this.state.employee.id)
        this.searchEmployee()
        this.closeModalDelete()
    }

    formatCell = (row) => {
        return (<div style={{ padding: "6px" }}>{row}</div>)
    }

    formatCellActions = (row) => {
        return (
            <div>
                <button className="btn" title="Editar" onClick={() => this.openModalAddOrEdit(row)}>
                    <img src={Edit} alt="img" height="18" width="18" />
                </button>
                <button className="btn" title="Excluir" onClick={() => this.openModalDelete(row)}>
                    <img src={Delete} alt="img" height="18" width="18" />
                </button>
            </div>
        )
    }

    columns = [{
        Header: "Nome",
        accessor: "name",
        Cell: row => (this.formatCell(row.value))
    }, {
        Header: "C.P.F",
        accessor: "cpf",
        Cell: row => (this.formatCell(row.value))
    }, {
        Header: "Telefone",
        accessor: "phone",
        Cell: row => (this.formatCell(row.value))
    }, {
        Header: "E-mail",
        accessor: "email",
        Cell: row => (this.formatCell(row.value))
    }, {
        Header: "Endereço",
        accessor: "address",
        Cell: row => (this.formatCell(row.value))
    }, {
        Header: "Ações",
        Cell: row => (this.formatCellActions(row.original)),
        width: 100
    }]

    render() {
        const {
            data,
            modalAddOrEditIsOpen,
            modalDeleteIsOpen,
            employee
        } = this.state

        return (
            <div>
                <h3>Funcionários</h3>
                
                <div className="row">
                    <div className="col-12">
                        <Button
                            style={{float: "right"}}
                            variant="primary"
                            type="button"
                            onClick={() => this.openModalAddOrEdit()}
                        >Novo</Button>
                    </div>
                </div>

                <div className="container">
                    <div className="Table">
                        <Table
                            className="-highlight"
                            data={data}
                            columns={this.columns}
                            pageSize={10}
                            previousText="Anterior"
                            nextText="Próxima"
                            noDataText="Não foram encontrados resultados"
                            pageText="Página"
                            ofText="de"
                            rowsText="linhas"
                        />
                    </div>
                </div>

                <Modal
                    show={modalAddOrEditIsOpen}
                    onHide={this.closeModalAddOrEdit}
                >
                    <EmployeeRegister
                        close={this.closeModalAddOrEdit}
                        save={this.save}
                        employee={employee} 
                    />
                </Modal>

                <Modal
                    show={modalDeleteIsOpen}
                    onHide={this.closeModalDelete}
                >
                    <Modal.Dialog>
                        <Modal.Header closeButton>
                            <Modal.Title>Excluir funcionário</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                            <div className="container">
                                <p> Deseja realmente excluir este funcionário? 
                                    <br /> 
                                    Esta ação não poderá ser desfeita! 
                                </p>
                            </div>
                        </Modal.Body>

                        <Modal.Footer>
                            <Button variant="secondary" onClick={this.closeModalDelete}>Cancelar</Button>
                            <Button variant="primary" type="submit" onClick={this.delete}>Confirmar</Button>
                        </Modal.Footer>
                    </Modal.Dialog>
                </Modal>

            </div>
        )
    }
}