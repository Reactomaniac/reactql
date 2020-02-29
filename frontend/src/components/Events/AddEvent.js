import React, { useContext } from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import AuthContext from "../../context/auth-context";

const useStyles = makeStyles(theme => ({
  eventButton: {
    margin: "20px auto",
    width: "calc(100% - 30px)"
  }
}));

export default function AddEvent(props) {
  const context = useContext(AuthContext)
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [date, setDate] = React.useState("");
  const [description, setDescription] = React.useState("");
  let handleAddEventProps  = props.handleAddEvent;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleAddEvent = () => {
    if (
      title.trim().length === 0 ||
      price <= 0 ||
      date.trim().length === 0 ||
      description.trim().length === 0
    ) {
      return;
    }

    const requestBody = {
      query: `
        mutation {
          createEvent(eventInput: {title: "${title}", price: ${price}, date: "${date}", description: "${description}"}) {
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

    const token = context.token;

    fetch(`http://localhost:3001/graphql`, {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + token
      }
    }).then(res => {
      if (res.status !==  200 && res.status !== 201) {
        throw new Error("Failed")
      }
      return res.json()
    }).then(resData => {
      setOpen(false)
      clearInputs()
      handleAddEventProps(resData.data.createEvent)
    }).catch(err => {
      console.log(err)
    })
    console.log(title)
  }

  const clearInputs = () => {
    setOpen("")
    setTitle("")
    setPrice("")
    setDate("")
    setDescription("")
  }

  const handleClose = () => {
    clearInputs();
    setOpen(false);
  };

  return (
    <div>
      <Button
        className={classes.eventButton}
        align="center"
        variant="contained"
        color="primary"
        onClick={handleClickOpen}
      >
        Add Event
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Event Details</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Title"
            type="text"
            value={title}
            onChange={(e) => {setTitle(e.target.value)}}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="price"
            label="Price"
            type="number"
            value={price}
            onChange={(e) => {setPrice(e.target.value)}}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="date"
            label="Date"
            type="datetime-local"
            value={date}
            onChange={(e) => {setDate(e.target.value)}}
            InputLabelProps={{
              shrink: true
            }}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="description"
            label="Description"
            value={description}
            onChange={(e) => {setDescription(e.target.value)}}
            multiline
            rows={2}
            rowsMax={4}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddEvent} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
