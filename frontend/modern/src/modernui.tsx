import * as React from "react";
import { render } from "react-dom";
import * as $ from "jquery";

import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Input from "@material-ui/core/Input";
import EditIcon from "@material-ui/icons/Edit";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#757575",
      main: "#424242",
      dark: "#212121",
      contrastText: "#fff"
    }
  }
});

class ModernUI extends React.Component<{}, {}> {
  state = {
    left: false
  };

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open
    });
  };

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <div>
          <AppBar position="static">
            <Toolbar>
              <IconButton color="inherit" aria-label="Menu">
                <MenuIcon onClick={this.toggleDrawer("left", true)} />
              </IconButton>
              <Typography variant="title" color="inherit">
                Hello, World!!!
              </Typography>
            </Toolbar>
          </AppBar>
          <SwipeableDrawer
            open={this.state.left}
            onClose={this.toggleDrawer("left", false)}
            onOpen={this.toggleDrawer("left", true)}
          >
            <div
              tabIndex={0}
              role="button"
              onClick={this.toggleDrawer("left", false)}
              onKeyDown={this.toggleDrawer("left", false)}
            >
              <ListItem button>
                <ListItemIcon>
                  <EditIcon />
                </ListItemIcon>
                <ListItemText primary="Hello, World!!!" />
              </ListItem>
            </div>
          </SwipeableDrawer>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap"
            }}
          >
            <Input
              placeholder="Enter some text here..."
              style={{
                margin: theme.spacing.unit,
                width: "100%"
              }}
            />
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

$(document).ready(function() {
  render(<ModernUI />, document.getElementById("frontEnd") as HTMLElement);
});
