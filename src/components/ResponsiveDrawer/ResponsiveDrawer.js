import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { CustomerRegister } from '../CustomerRegister/CustomerRegister';
import { EmployeeRegister } from '../EmployeeRegister/EmployeeRegister';
import { ProductRegister } from '../ProductRegister/ProductRegister';
import { Sales } from '../Sales/Sales';
import salesIcon from '../../assets/img/img.png';
import productIcon from '../../assets/img/box.png';
import customerIcon from '../../assets/img/customer.png';
import employeeIcon from '../../assets/img/employee.png';
import lineMenu from '../../assets/img/line-menu.png';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    marginLeft: drawerWidth,
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  menuButton: {
    marginRight: 20,
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
});

class ResponsiveDrawer extends React.Component {
  state = {
    mobileOpen: false,
    options: [
        'Cadastro de Funcionários',
        'Cadastro de Clientes',
        'Cadastro de produtos',
        'Vendas'
    ],
    select: "",
    icon: [employeeIcon, customerIcon, productIcon, salesIcon  ]
  };

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };

  getComponentByindex = (select) => {
      switch(select) {
          case 0:
            return <EmployeeRegister/>
          case 1:
            return <CustomerRegister/>
          case 2:
            return <ProductRegister/>
          case 3: 
            return <Sales/>
          default:
            return <div>Sistema de Gestão de Vendas - Bem Vindo</div>
      }
  }

  render() {
    const { classes, theme } = this.props;

    const drawer = (
      <div>
        <div className={classes.toolbar} />
        <Divider />
        <List>
          {this.state.options.map((text, index) => (
            <ListItem button key={text}
                onClick={() => this.setState({select: index})}
            >
                <img src={this.state.icon[index]} alt="Smiley face" height="42" width="42"/>
                <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </div>
    );

    return (
      <div className={classes.root}>
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="colorSecondary"
              aria-label="Open drawer"
              onClick={this.handleDrawerToggle}
              className={classes.menuButton}
            >
            <img src={lineMenu} width="20" height="20"/>
            </IconButton>
            <Typography variant="h6" color="inherit" noWrap>
              Sistema de Gestão de Vendas
            </Typography>
          </Toolbar>
        </AppBar>
        <nav className={classes.drawer}>
          <Hidden smUp implementation="css">
            <Drawer
              container={this.props.container}
              variant="temporary"
              anchor={theme.direction === 'rtl' ? 'right' : 'left'}
              open={this.state.mobileOpen}
              onClose={this.handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper,
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper,
              }}
              variant="permanent"
              open
            >
              {drawer}
            </Drawer>
          </Hidden>
        </nav>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {this.getComponentByindex(this.state.select)}
        </main>
      </div>
    );
  }
}

ResponsiveDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  // Injected by the documentation to work in an iframe.
  // You won't need it on your project.
  container: PropTypes.object,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(ResponsiveDrawer);