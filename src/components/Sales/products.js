import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { InputGroup, Button, FormControl } from 'react-bootstrap'
import './styles.css'

const TAX_RATE = 0.07;

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    table: {
        minWidth: 700,
    },
});

function ccyFormat(num) {
    return `${num.toFixed(2)}`;
}

function priceRow(qty, unit) {
    return qty * unit;
}

function createRow(id, desc, qty, unit) {
    const price = priceRow(qty, unit);
    return { id, desc, qty, unit, price };
}

function subtotal(items) {
    return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
}

const rows = [
    ['Paperclips (Box)', 100, 1.15],
    ['Paper (Case)', 10, 45.99],
    ['Waste Basket', 2, 17.99],
].map((row, id) => createRow(id, ...row));

const invoiceSubtotal = subtotal(rows);
const invoiceTaxes = TAX_RATE * invoiceSubtotal;
const invoiceTotal = invoiceTaxes + invoiceSubtotal;

const products = (props) => {
    const { classes } = props;
    return (
        <Fragment>
            <div>
                <div>
                    <InputGroup className="mb-2 col-md-6">
                        <FormControl
                            placeholder="Nome do item"
                            aria-label="Recipient's username"
                            aria-describedby="basic-addon2"
                        />
                        <InputGroup.Append>
                            <Button variant="outline-primary">Consultar</Button>
                        </InputGroup.Append>
                    </InputGroup>
                </div>
                <div>
                    <InputGroup className="mb-2 col-md-4">
                        <FormControl
                            placeholder="Cod. do item"
                            aria-label="Recipient's username"
                            aria-describedby="basic-addon2"
                        />
                        <InputGroup.Append>
                            <Button variant="outline-primary">Consultar</Button>
                        </InputGroup.Append>
                    </InputGroup>
                </div>
                <div className="col-md-4">
                    <Button>Adicionar Item</Button>
                </div>
            </div>
            <div className="container">
            <Paper className={classes.root}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell>Descrição</TableCell>
                            <TableCell align="right">Quantidade</TableCell>
                            <TableCell align="right">unid</TableCell>
                            <TableCell align="right">Preço</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map(row => (
                            <TableRow key={row.id}>
                                <TableCell>{row.id}</TableCell>
                                <TableCell>{row.desc}</TableCell>
                                <TableCell align="right">{row.qty}</TableCell>
                                <TableCell align="right">{row.unit}</TableCell>
                                <TableCell align="right">{ccyFormat(row.price)}</TableCell>
                            </TableRow>
                        ))}
                        <TableRow>
                            <TableCell rowSpan={4}/>
                            <TableCell colSpan={3}>Subtotal</TableCell>
                            <TableCell align="right">{ccyFormat(invoiceSubtotal)}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={2}>Tax</TableCell>
                            <TableCell align="right">{`${(TAX_RATE * 100).toFixed(0)} %`}</TableCell>
                            <TableCell align="right">{ccyFormat(invoiceTaxes)}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={3}>Total</TableCell>
                            <TableCell align="right">{ccyFormat(invoiceTotal)}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </Paper>
            </div>
            <div className="mt-3 col-md-4">
                <Button>Finalizar Pedido</Button>
            </div>
        </Fragment>
    );
}

products.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(products);
