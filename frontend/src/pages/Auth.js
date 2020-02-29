import React, { useState, useContext } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import PropTypes from 'prop-types';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import AccountCircle from '@material-ui/icons/AccountCircle';
import LinearProgress from '@material-ui/core/LinearProgress';

import AuthContext from "../context/auth-context";

const styles = {
  root: {
    width: 500,
    margin: "0 auto",
    marginTop: 10
  },
  margin: {
    margin: 5,
  },
  widthInput: {
    width: 400
  },
  button: {
    textTransform: "capitalize"
  },
  actions: {
    width: 400,
    margin: "0 auto",
    marginBottom: 20
  }
};

function AuthPage(props) {
  const { classes } = props;

  const context = useContext(AuthContext)

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const requestBody = (type) => {
    let requestBody;
    if (type === "signin") {
      return requestBody = {
        query: `
          query {
            login(email: "${email}", password: "${password}") {
              userId
              token
              tokenExpiration
            }
          }
        `
      }
    } else {
      return requestBody = {
        query: `
          mutation {
            createUser(userInput: {email: "${email}", password: "${password}"}) {
              _id
              email
            }
          }
        `
      }
    }
  }

  const handleButton = (type) => {
    setLoading(true)
    if (email.trim().length === 0 || password.trim().length === 0) {
      return
    }

    let requestBodyData = requestBody(type);

    fetch(`http://localhost:3001/graphql`, {
      method: "POST",
      body: JSON.stringify(requestBodyData),
      headers: {
      "Content-Type": "application/json"
      }
    }).then(res => {
      if (res.status !==  200 && res.status !== 201) {
        throw new Error("Failed")
      }
      return res.json()
    }).then(resData => {
      setLoading(false)
      context.login(
        resData.data.login.token,
        resData.data.login.userId,
        resData.data.login.tokenExpiration
      )
    }).catch(err => {
      console.log(err)
    })
  }

  return (
    <Card className={classes.root}>
      {loading && <LinearProgress />}
      <CardContent align="center">
        <TextField
          className={classes.margin + " " + classes.widthInput}
          id="input-with-icon-textfield"
          label="Email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          className={classes.margin + " " + classes.widthInput}
          id="input-with-icon-textfield"
          label="Password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <VpnKeyIcon />
              </InputAdornment>
            ),
          }}
        />
      </CardContent>
      <CardActions
        align="center"
        className={classes.actions}
      >
        <Button
          variant="contained"
          color="primary"
          align="left"
          fullWidth
          onClick={(e) => {handleButton("signin", e)}}
          className={classes.button}
        >
          Sign In
        </Button>
        <Button
          fullWidth
          align="right"
          onClick={(e) => {handleButton("signup", e)}}
          className={classes.button}
          variant="contained"
        >
          Sign up
        </Button>
      </CardActions>
    </Card>
  );

}

AuthPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AuthPage);
