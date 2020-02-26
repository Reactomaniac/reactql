import React from 'react';
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import AuthPage from "./pages/Auth";
import BookingsPage from "./pages/Bookings";
import EventsPage from "./pages/Events";
import MainNavigation from "./components/Navigation/MainNavigation";
import './App.css';

const useStyles = makeStyles(theme => ({
  root: {
    width: "70%",
    margin: "0 auto"
  }
}))

function App() {
  const classes = useStyles();

  return (
    <BrowserRouter>
      <React.Fragment>
        <Grid className={classes.root}>
          <MainNavigation />
          <div className="main-panel">
            <Switch>
              <Redirect from="/" to="/auth" exact />
              <Route path="/auth" component={AuthPage} />
              <Route path="/events" component={EventsPage} />
              <Route path="/bookings" component={BookingsPage} />
            </Switch>
          </div>
        </Grid>
      </React.Fragment>
    </BrowserRouter>
  );
}

export default App;
