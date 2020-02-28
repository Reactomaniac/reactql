import React , { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Gravatar from 'react-awesome-gravatar';
import Typography from '@material-ui/core/Typography';

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
  console.log(authContext)

  console.log()
  return (
    <List className={classes.root}>
      {props.events.map(event =>
        <React.Fragment key={event._id}>
          <ListItem alignItems="flex-start" key={event._id}>
            <ListItemAvatar>
              <Gravatar email={event.creator.email}>
                { url => (<Avatar src={url} />) }
              </Gravatar>
            </ListItemAvatar>
            <ListItemText
              primary={event.title}
              secondary={
                <React.Fragment>
                  <Typography
                    component="span"
                    variant="body2"
                    className={classes.inline}
                    color="textPrimary"
                  >
                    {event.date} - ${event.price}
                  </Typography>
                  {" — " + event.description}
                </React.Fragment>
              }
            />
          </ListItem>
          <Divider variant="inset" component="li" />
        </React.Fragment>
      )}
    </List>
  );
}

export default ListEvents