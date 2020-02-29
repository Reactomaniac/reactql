import React, { Component } from "react";
import Grid from '@material-ui/core/Grid';
import { withStyles } from "@material-ui/core/styles";
import AddEvent from "../components/Events/AddEvent";
import ListEvents from "../components/Events/ListEvents";

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

  state = {
    events: []
  }

  fetchEvents() {
    const requestBody = {
      query: `
        query {
          events {
            _id
            title
            description
            date
            price
            creator {
              _id
              email
            }
          }
        }
      `
    }

    fetch(`http://localhost:3001/graphql`, {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
      "Content-Type": "application/json"
      }
    }).then(res => {
      if (res.status !==  200 && res.status !== 201) {
        throw new Error("Failed")
      }
      return res.json()
    }).then(resData => {
      const events = resData.data.events;
      this.setState({ events })
      console.log(resData)
    }).catch(err => {
      console.log(err)
    })
  }

  handleAddEvent = (event) => {
    console.log(event)
    const { events } = this.state;
    events.push(event)
    this.setState({ events })
  }

  componentDidMount() {
    this.fetchEvents()
  }

  render() {
    const { classes } = this.props
    const eventList = this.state.events
    return (
      <Grid align="center" className={classes.root}>
        <AuthContext.Consumer>
          {(context) =>
            context.token && <AddEvent handleAddEvent = {this.handleAddEvent} /> 
          }
        </AuthContext.Consumer>
        <ListEvents events={eventList}/>
      </Grid>
    )
  }
}

export default withStyles(styles)(EventsPage);
