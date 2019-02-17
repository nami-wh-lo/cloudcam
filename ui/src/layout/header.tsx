import * as React from "react";
import { Link } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import { Auth } from "aws-amplify";
import {
  createStyles,
  WithStyles,
  withStyles
} from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Button from '@material-ui/core/Button';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import SvgCloudcamLight from './../components/SvgCloudcamLight'


export interface IHeaderProps extends WithStyles<typeof styles> {}

const styles = ({ palette }: Theme) => createStyles({
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  menuLink: {
    color: palette.secondary.light
  }
});

class Header extends React.Component<IHeaderProps, any> {
  state = {
    anchorEl: null
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { classes } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    const ProvisionLink = props => <Link to="/provision" {...props} />
    const CamerasLink = props => <Link to="/" {...props} />

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              className={classes.menuButton}
              color="inherit"
              aria-label="Menu"
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="title"
              noWrap
              style={{
                marginRight: '3rem'
              }}>
              <a href="/" className={"App-link"}>
                <SvgCloudcamLight className="App-logo" alt="logo"></SvgCloudcamLight>
              </a>
            </Typography>
            <Typography variant="h6" color="inherit" className={classes.grow}>
            <Button 
              component={ProvisionLink} 
              className={classes.menuLink}
            >
              Provision
            </Button>
            <Button 
              component={CamerasLink}
              className={classes.menuLink}
            >
              Cameras
            </Button>
            {/* <Link to="/provision">Provision</Link> */}
            {/* <Link to="/">Cameras</Link> */}
            </Typography>
            <div>
              <IconButton
                aria-owns={open ? "menu-appbar" : undefined}
                aria-haspopup="true"
                onClick={this.handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right"
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right"
                }}
                open={open}
                onClose={this.handleClose}
              >
                <MenuItem onClick={this.logout}>Log Out</MenuItem>
              </Menu>
            </div>
          </Toolbar>
        </AppBar>
      </div>
    );
  }

  private logout = () => {
    Auth.signOut()
      .then(data => console.log(data))
      .catch(err => console.log(err));
  };
}

export default withStyles(styles)(Header);
