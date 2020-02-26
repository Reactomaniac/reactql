import React from 'react';
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

export default function MainNavigation() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction label="Events" icon={<EventIcon />} />
      <BottomNavigationAction label="Bookings" icon={<BookmarksIcon />} />
      <BottomNavigationAction label="Auth" icon={<LockOpenIcon />} />
    </BottomNavigation>
  );
}
