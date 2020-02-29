import React , { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Avatar from '@material-ui/core/Avatar';
import ExploreIcon from '@material-ui/icons/Explore';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Gravatar from 'react-awesome-gravatar';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';

import AuthContext from "../../context/auth-context";

const useStyles = makeStyles({
  root: {
    width: 500,
    margin: "0 auto"
  },
  inline: {
    display: 'inline',
  }
});

const ListEvents = (props) => {
  const classes = useStyles();
  const authContext = useContext(AuthContext)
  return (
    <List className={classes.root}>
      {props.events.map(event =>
        <React.Fragment key={event._id}>
          <ListItem>
            <ListItemAvatar>
              <Gravatar email={event.creator.email}>
                { url => (<Avatar src={url} />) }
              </Gravatar>
            </ListItemAvatar>
            <ListItemText primary={event.title} secondary={event.date} />
            {authContext.token && <ListItemSecondaryAction>
              <Button
                variant="contained"
                color="primary"
                size="small"
                edge="end"
                className={classes.button}
                startIcon={<ExploreIcon />}
              >
                Details
              </Button>
            </ListItemSecondaryAction>}
            {!authContext.token && <ListItemSecondaryAction>
              <Button
                variant="text"
                color="primary"
                size="small"
                edge="end"
                className={classes.button}
                startIcon={<AttachMoneyIcon />}
              >
                {event.price}
              </Button>
            </ListItemSecondaryAction>}
          </ListItem>
        </React.Fragment>
      )}
    </List>
  );
}

export default ListEvents