import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import { CardHeader } from '@material-ui/core';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import AccountCircle from '@material-ui/icons/AccountCircle';

const useStyles = makeStyles(theme => ({
  root: {
    width: 500,
    margin: "0 auto",
    marginTop: 10
  },
  margin: {
    margin: theme.spacing(1),
  },
  widthInput: {
    width: 400
  },
  button: {
    textTransform: "capitalize"
  },
  actions: {
    width: 400,
    margin: "0 auto"
  }
}));

export default function AuthPage() {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardHeader align="center" title="Sign In" />
      <CardContent align="center">
        <TextField
          className={classes.margin + " " + classes.widthInput}
          id="input-with-icon-textfield"
          label="Email"
          type="email"
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
          className={classes.button}
        >
          Sign In
        </Button>
        <Button
          className={classes.button}
          variant="contained"
        >
          Sign up
        </Button>
      </CardActions>
    </Card>
  );
}
