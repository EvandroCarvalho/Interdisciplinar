import React from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Login from "../../components/Login";
import salesIcon from "../../assets/img/img.png";
import productIcon from "../../assets/img/box.png";
import customerIcon from "../../assets/img/customer.png";
import employeeIcon from "../../assets/img/employee.png";
import homeIcon from "../../assets/img/home.png";
import exitIcon from "../../assets/img/exit.png";
import lineMenu from "../../assets/img/line-menu.png";
import logo from "../../assets/img/logo_gestao.png";
import { Link } from "react-router-dom";
import Routes from "../../routes/routes";
import "./styles.css";

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: "flex"
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  appBar: {
    marginLeft: drawerWidth,
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`
    }
  },
  menuButton: {
    marginRight: 20,
    [theme.breakpoints.up("sm")]: {
      display: "none"
    }
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3
  }
});

class SideBar extends React.Component {
  state = {
    mobileOpen: false,
    options: ["home", "funcionarios", "clientes", "produtos", "vendas", "sair"],
    select: "",
    icon: [
      homeIcon,
      employeeIcon,
      customerIcon,
      productIcon,
      salesIcon,
      exitIcon
    ],
    user: null
  };

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };

  setUser = user => this.setState({ user });

  render() {
    const { classes, theme } = this.props;
    const { user } = this.state;

    const drawer = (
      <div className="link">
        <div className={classes.toolbar} />
        <Divider />
        <List>
          {this.state.options.map((text, index) => (
            <Link
              className="link"
              to={text === "sair" || text === "home" ? "/" : `/${text}`}
              key={index}
              onClick={text === "sair" ? () => this.setUser(null) : () => {}}
            >
              <ListItem button key={text}>
                <img
                  src={this.state.icon[index]}
                  alt="img"
                  height="42"
                  width="42"
                />
                <ListItemText>
                  {text.charAt(0).toUpperCase() + text.slice(1)}
                </ListItemText>
              </ListItem>
            </Link>
          ))}
        </List>
        <img
          className="imgLogo"
          src={logo}
          alt="Logomarca Gestão"
          height="200"
          width="200"
        />
      </div>
    );

    return (
      <div className={classes.root}>
        <AppBar
          position="fixed"
          className={classes.appBar}
          style={{ background: "#ee4c2c" }}
        >
          <Toolbar>
            <IconButton
              color="secondary"
              aria-label="Open drawer"
              onClick={this.handleDrawerToggle}
              className={classes.menuButton}
            >
              <img src={lineMenu} width="20" height="20" alt="img" />
            </IconButton>
            <Typography variant="h5" color="inherit" noWrap>
              Sistema de Gestão de Vendas
            </Typography>
          </Toolbar>
        </AppBar>
        <nav className={classes.drawer}>
          {user && (
            <>
              <Hidden smUp implementation="css">
                <Drawer
                  container={this.props.container}
                  variant="temporary"
                  anchor={theme.direction === "rtl" ? "right" : "left"}
                  open={this.state.mobileOpen}
                  onClose={this.handleDrawerToggle}
                  classes={{
                    paper: classes.drawerPaper
                  }}
                >
                  {drawer}
                </Drawer>
              </Hidden>
              <Hidden xsDown implementation="css">
                <Drawer
                  classes={{
                    paper: classes.drawerPaper
                  }}
                  variant="permanent"
                  open
                >
                  {drawer}
                </Drawer>
              </Hidden>
            </>
          )}
        </nav>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {!user ? <Login setUser={this.setUser} /> : <Routes user={user} />}
        </main>
      </div>
    );
  }
}

SideBar.propTypes = {
  classes: PropTypes.object.isRequired,
  // Injected by the documentation to work in an iframe.
  // You won't need it on your project.
  container: PropTypes.object,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(SideBar);
