import React, { useContext } from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import AuthContext from "../../context/auth-context";
import ExploreIcon from '@material-ui/icons/Explore';

const useStyles = makeStyles(theme => ({
  dialog: {
    width: 500,
    margin: "0 auto"
  }
}));

export default function EventDetails(props) {
  const event = props.event;
  const context = useContext(AuthContext)
  console.log(context)
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        size="small"
        edge="end"
        onClick={handleClickOpen}
        startIcon={<ExploreIcon />}
      >
        Details
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" className={classes.dialog}>
        <DialogTitle id="form-dialog-title">Event Details</DialogTitle>
        <DialogContent>
          <Typography variant="h6" gutterBottom>
            {event.title} - {event.creator.email}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            <AttachMoneyIcon /> {event.price}
          </Typography>
          <Typography variant="subtitle2" gutterBottom>
            {new Date(event.date).toGMTString()}
          </Typography>
          <Typography variant="body1" gutterBottom>
            {event.description}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button color="primary">
            Book
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
