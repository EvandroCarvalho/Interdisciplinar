import React, {Component} from 'react'
import 'react-table/react-table.css'
import './styles.css'
import { ProductRegister } from './ProductRegister'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Table from 'react-table'
import Edit from '../../assets/img/edit.png'
import Delete from '../../assets/img/delete.png'
import {
    findProduct,
    saveProduct,
    updateProduct,
    deleteProduct
} from '../../actions/product'

export default class Product extends Component {

    state = {
        data: [{
            id: 1,
            nome: "mouse",
            descricao: 'mouse preto',
            valorUnitario: 30,
            quantidade: 100,
            fabricante: "Dell"
        }],
        modalAddOrEditIsOpen: false,
        modalRemoveIsOpen: false,
        product: {
            nome: '',
            descricao: '',
            valorUnitario: '',
            quantidade: '',
            fabricante: ''
        }
    }

    componentDidMount() {
        // this.searchProduct()
    }

    searchProduct = async () => {
        const response = await findProduct()
        this.setState({data: response.content})
    }

    openModalAddOrEdit = (row) => {
        if (row) {
            this.setState({product: row})
        } else {
            this.setState({product: {
            nome: '',
            descricao: '',
            valorUnitario: '',
            quantidade: '',
            fabricante: ''
            }})
        }
        this.setState({modalAddOrEditIsOpen: true})
    }

    closeModalAddOrEdit = () => {
        this.setState({modalAddOrEditIsOpen: false})
    }

    save = async (payload) => {
        if (payload.id) {
            await updateProduct(payload)
        } else {
            await saveProduct(payload)
        }
        this.searchProduct()  
        this.closeModalAddOrEdit()
    }

    openModalDelete = (row) => {
        this.setState({modalDeleteIsOpen: true, product: row})
    }

    closeModalDelete = () => {
        this.setState({modalDeleteIsOpen: false})
    }

    delete = async () => {
        await deleteProduct(this.state.product.id)
        this.searchProduct()
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
        Header: "Codigo",
        accessor: "id",
        Cell: row => (this.formatCell(row.value))
    },{
            Header: "Nome",
            accessor: "nome",
            Cell: row => (this.formatCell(row.value))
    },{
        Header: "Descricao",
        accessor: "descricao",
        Cell: row => (this.formatCell(row.value))
    },{
        Header: "Valor Unitario",
        accessor: "valorUnitario",
        Cell: row => (this.formatCell(row.value))
    },{
        Header: "Quantidade",
        accessor: "quantidade",
        Cell: row => (this.formatCell(row.value))
    }, {
        Header: "Fabricante",
        accessor: "fabricante",
        Cell: row => (this.formatCell(row.value))
    },{
        Header: "Ações",
        Cell: row => (this.formatCellActions(row.original)),
        width: 100
    }]

    render() {
        const {
            data,
            modalAddOrEditIsOpen,
            modalDeleteIsOpen,
            product
        } = this.state
        
        return (
            <div>
                <h3>Produtos</h3>
                
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
                    <ProductRegister
                        close={this.closeModalAddOrEdit}
                        save={this.save}
                        product={product} 
                    />
                </Modal>

                <Modal
                    show={modalDeleteIsOpen}
                    onHide={this.closeModalDelete}
                >
                    <Modal.Dialog>
                        <Modal.Header closeButton>
                            <Modal.Title>Excluir produto</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                            <div className="container">
                                <p> Deseja realmente excluir este produto? 
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