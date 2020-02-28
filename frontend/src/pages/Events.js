import React, { Component } from "react";
import Grid from '@material-ui/core/Grid';
import { withStyles } from "@material-ui/core/styles";
import AddEvent from "../components/AddEvent/AddEvent";

import AuthContext from "../context/auth-context";

const styles = theme => {
  return ({
    root: {
      width: 500,
      margin: "0 auto",
      background: "white"
    }
  });
}

class EventsPage extends Component {
  render() {
    const { classes } = this.props
    return (
      <Grid align="center" className={classes.root}>
        <AuthContext.Consumer>
          {(context) =>
            context.token && <AddEvent /> 
          }
        </AuthContext.Consumer>
      </Grid>
    )
  }
}

export default withStyles(styles)(EventsPage);
