import React , { useContext } from 'react';
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import EventIcon from '@material-ui/icons/Event';
import BookmarksIcon from '@material-ui/icons/Bookmarks';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AuthContext from "../../context/auth-context";

const useStyles = makeStyles({
  root: {
    width: 500,
    margin: "0 auto"
  },
});

const MainNavigation = (props) => {
  const classes = useStyles();
  const authContext = useContext(AuthContext)
  console.log(authContext)
  let history = useHistory();
  const [value, setValue] = React.useState('recents');

  const handleChange = (event, newValue) => {
    if (newValue === "logout") {
      authContext.logout()
      setValue("auth");
      history.push(`/auth`)
    } else {
      setValue(newValue);
      history.push(`/${newValue}`)
    }
  }

  return (
    <BottomNavigation
      value={value}
      onChange={handleChange}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction value="events" label="Events" icon={<EventIcon />} />
      {authContext.token && <BottomNavigationAction value="bookings" label="Bookings" icon={<BookmarksIcon />} />}
      {authContext.token && <BottomNavigationAction value="logout" label="Signout" icon={<ExitToAppIcon />} />}
      {!authContext.token && <BottomNavigationAction value="auth" label="Auth" icon={<LockOpenIcon />} />}
    </BottomNavigation>
  );
}

export default MainNavigation