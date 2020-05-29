import React, { useEffect } from 'react';

// Next
import Link from '../../src/Link';
import { useRouter } from 'next/router';

// Redux
import {
  setDrawerTopNavbar,
  setMenuIndex,
} from '../../redux/actions/layoutActions';
import { useSelector, useDispatch } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Avatar from '@material-ui/core/Avatar';
import CircularProgress from '@material-ui/core/CircularProgress';
import Icon from '@material-ui/core/Icon';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.common.color.navColor,
  },
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  top: {
    color: theme.palette.primary.dark,
  },
  bottom: {
    color: theme.palette.primary.light,
    animationDuration: '550ms',
    position: 'absolute',
    left: 0,
  },
  userlogo: {
    width: '30px',
    height: '30px',
  },
}));

const DrawerTopNavbar = () => {
  const classes = useStyles();
  const user = useSelector((state) => state.user);
  const userLoading = useSelector((state) => state.layout.userLoading);
  const menuIndex = useSelector((state) => state.layout.menuIndex);
  const drawerTopNavbarOpen = useSelector(
    (state) => state.layout.drawerTopNavbarOpen
  );
  const action = useDispatch();

  const adminMenuOptions = [
    {
      name: 'รายงาน',
      link: '/report',
      selectedIndex: 1,
      icon: <Icon className="fas fa-file-medical-alt" />,
    },
    {
      name: 'ลูกค้า',
      link: '/client',
      selectedIndex: 2,
      icon: (
        <Icon
          className="fas fa-users"
          fontSize="small"
          classes={{ root: classes.MuiIcon }}
        />
      ),
    },
    {
      name: 'สินค้า',
      link: '/product',
      selectedIndex: 3,
      icon: (
        <Icon
          className="fas fa-box-open"
          fontSize="small"
          classes={{ root: classes.MuiIcon }}
        />
      ),
    },
  ];

  const employeeMenuOptions = [
    {
      name: 'ห้องครัว',
      link: '/kitchen',
      selectedIndex: 4,
      icon: <Icon className="fas fa-concierge-bell" fontSize="small" />,
    },
  ];

  const route = useRouter();

  useEffect(() => {
    adminMenuOptions.forEach((menu) => {
      switch (route.pathname) {
        case `${menu.link}`:
          if (menuIndex !== menu.selectedIndex) {
            action(setMenuIndex(menu.selectedIndex));
          }
          break;
        case `/`:
          action(setMenuIndex(0));
          break;
        default:
          break;
      }
    });
  }, [menuIndex, window.location.pathname]);

  return (
    <Drawer
      anchor="top"
      open={drawerTopNavbarOpen}
      onClose={() => action(setDrawerTopNavbar())}
    >
      <List>
        <ListItem
          button
          component={Link}
          href="/"
          selected={menuIndex === 0}
          onClick={() => {
            action(setDrawerTopNavbar());
            action(setMenuIndex(0));
          }}
        >
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="หน้าแรก" />
        </ListItem>
        {user.state == 'admin' &&
          adminMenuOptions.map((menu, index) => (
            <ListItem
              button
              key={menu.name}
              component={Link}
              href={menu.link}
              selected={menuIndex === menu.selectedIndex}
              onClick={() => {
                action(setDrawerTopNavbar());
                action(setMenuIndex(index));
              }}
            >
              <ListItemIcon>{menu.icon}</ListItemIcon>
              <ListItemText primary={menu.name} />
            </ListItem>
          ))}
        {user.state == 'employee' &&
          employeeMenuOptions.map((menu, index) => (
            <ListItem
              button
              key={menu.name}
              component={Link}
              href={menu.link}
              selected={menuIndex === menu.selectedIndex}
              onClick={() => {
                action(setDrawerTopNavbar());
                action(setMenuIndex(index));
              }}
            >
              <ListItemIcon>{menu.icon}</ListItemIcon>
              <ListItemText primary={menu.name} />
            </ListItem>
          ))}
        <ListItem
          button
          component={Link}
          href={userLoading ? '' : user?.state !== 'guess' ? '/' : '/signin'}
          selected={menuIndex === 5}
          onClick={() => {
            action(setDrawerTopNavbar());
            action(setMenuIndex(5));
          }}
        >
          <ListItemIcon>
            {userLoading ? (
              <div style={{ position: 'relative' }}>
                <CircularProgress
                  variant="determinate"
                  value={100}
                  className={classes.top}
                  size={24}
                  thickness={4}
                />
                <CircularProgress
                  variant="indeterminate"
                  disableShrink
                  className={classes.bottom}
                  size={24}
                  thickness={4}
                />
              </div>
            ) : user.state !== 'guess' ? (
              <Avatar
                alt="line logo"
                src={user.pictureUrl}
                className={classes.userlogo}
              />
            ) : (
              <AccountCircleIcon />
            )}
          </ListItemIcon>
          <ListItemText primary="ข้อมูลผู้ใช้งาน" />
        </ListItem>
      </List>
      <Divider />
    </Drawer>
  );
};

export default DrawerTopNavbar;
