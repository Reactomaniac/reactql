import React from 'react';
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import EventIcon from '@material-ui/icons/Event';
import BookmarksIcon from '@material-ui/icons/Bookmarks';
import LockOpenIcon from '@material-ui/icons/LockOpen';

const useStyles = makeStyles({
  root: {
    width: 500,
    margin: "0 auto"
  },
});

export default function MainNavigation(props, context) {
  const classes = useStyles();
  let history = useHistory();
  const [value, setValue] = React.useState('recents');

  const handleChange = (event, newValue) => {
    console.log(event)
    setValue(newValue);
    history.push(`/${newValue}`)
  }

  return (
    <BottomNavigation
      value={value}
      onChange={handleChange}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction value="events" label="Events" icon={<EventIcon />} />
      <BottomNavigationAction value="bookings" label="Bookings" icon={<BookmarksIcon />} />
      <BottomNavigationAction value="auth" label="Auth" icon={<LockOpenIcon />} />
    </BottomNavigation>
  );
}
