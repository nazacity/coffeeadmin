import React, { useEffect } from 'react';

// Next
import Link from '../../src/Link';
import { useRouter } from 'next/router';

// Framer-motion
import { motion } from 'framer-motion';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import {
  setDrawerTopNavbar,
  setMenuIndex,
} from '../../redux/actions/layoutActions';

// Mui
import { makeStyles } from '@material-ui/core/styles';
import { useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Avatar from '@material-ui/core/Avatar';
import CircularProgress from '@material-ui/core/CircularProgress';
import Icon from '@material-ui/core/Icon';
import Tooltip from '@material-ui/core/Tooltip';

// components
import UserMenu from './components/UserMenu';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  navbar: {
    backgroundColor: theme.common.color.navColor,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
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
  badge: {
    backgroundColor: 'red',
  },
}));

const TopNavbar = () => {
  const classes = useStyles();
  const theme = useTheme();
  const user = useSelector((state) => state.user);
  const menuIndex = useSelector((state) => state.layout.menuIndex);
  const userLoading = useSelector((state) => state.layout.userLoading);
  const action = useDispatch();
  const route = useRouter();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const adminMenuOptions = [
    {
      name: 'รายงาน',
      link: '/report',
      selectedIndex: 1,
      icon: (
        <Tooltip title="รายงาน">
          <Icon className="fas fa-file-medical-alt" />
        </Tooltip>
      ),
    },
    {
      name: 'ลูกค้า',
      link: '/client',
      selectedIndex: 2,
      icon: (
        <Tooltip title="ลูกค้า">
          <Icon
            className="fas fa-users"
            fontSize="small"
            classes={{ root: classes.MuiIcon }}
          />
        </Tooltip>
      ),
    },
    {
      name: 'ห้องครัว',
      link: '/kitchen',
      selectedIndex: 3,
      icon: <Icon className="fas fa-concierge-bell" fontSize="small" />,
    },
  ];

  const employeeMenuOptions = [
    {
      name: 'โต๊ะ',
      link: `/branch/table?branch=${user?.employee?.branch.id}`,
      position: ['waiter', 'manager'],
      selectedIndex: 1,
      icon: (
        <Icon
          className="fab fa-buffer"
          fontSize="small"
          classes={{ root: classes.MuiIcon }}
        />
      ),
    },
    {
      name: 'ห้องครัว',
      link: `/branch/kitchen?branch=${user?.employee?.branch.id}`,
      position: ['chef', 'manager'],
      selectedIndex: 2,
      icon: (
        <Icon
          className="fas fa-concierge-bell"
          fontSize="small"
          classes={{ root: classes.MuiIcon }}
        />
      ),
    },
    {
      name: 'ส่งสินค้า',
      link: `/branch/delivery?branch=${user?.employee?.branch.id}`,
      position: ['rider', 'manager'],
      selectedIndex: 3,
      icon: (
        <Icon
          className="fas fa-biking"
          fontSize="small"
          classes={{ root: classes.MuiIcon }}
        />
      ),
    },
  ];

  useEffect(() => {
    if (user.state === 'admin') {
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
          case `/employee`:
            action(setMenuIndex(5));
            break;
          case `/table`:
            action(setMenuIndex(5));
            break;
          case `/stock`:
            action(setMenuIndex(5));
            break;
          case `/product/store`:
            action(setMenuIndex(5));
            break;
          case `/product/online`:
            action(setMenuIndex(5));
            break;
          default:
            break;
        }
      });
    }
    if (user.state === 'employee') {
      employeeMenuOptions.forEach((menu) => {
        switch (route.pathname) {
          case `${menu.link}`:
            if (menuIndex !== menu.selectedIndex) {
              action(setMenuIndex(menu.selectedIndex));
            }
            break;
          default:
            break;
        }
      });
    }
  }, [menuIndex, window.location.pathname]);

  return (
    <React.Fragment>
      <motion.div
        initial={{ opacity: 0, y: '-100%' }}
        animate={{ opacity: 1, y: '0%' }}
        transition={{
          duration: 2,
          ease: [0.43, 0.13, 0.23, 0.96],
        }}
      >
        <AppBar position="static" classes={{ root: classes.navbar }}>
          <Toolbar>
            <div
              onClick={() => action(setMenuIndex(0))}
              className={classes.title}
            >
              <Link href="/">
                <Typography
                  variant="h6"
                  style={{ color: theme.common.color.white }}
                >
                  Coffee Shop
                </Typography>
              </Link>
            </div>
            <div>
              {user.state == 'admin' &&
                adminMenuOptions.map((menu) => (
                  <IconButton
                    component={!menu.action ? Link : undefined}
                    href={!menu.action ? menu.link : undefined}
                    key={menu.name}
                    style={{
                      color:
                        menuIndex === menu.selectedIndex
                          ? theme.palette.primary.main
                          : '#ffffff',
                      marginRight: '2em',
                    }}
                    onClick={
                      menu.action
                        ? menu.action
                        : () => setMenuIndex(menu.selectedIndex)
                    }
                  >
                    {menu.icon}
                  </IconButton>
                ))}
              {user.state == 'employee' &&
                employeeMenuOptions.map((menu) => {
                  if (menu.position.includes(user.employee.position)) {
                    return (
                      <Link
                        href={menu.link}
                        style={{ marginRight: '2em' }}
                        key={menu.name}
                        onClick={() => setMenuIndex(menu.selectedIndex)}
                      >
                        <IconButton
                          style={{
                            color:
                              menuIndex === menu.selectedIndex
                                ? theme.palette.primary.main
                                : '#ffffff',
                          }}
                        >
                          {menu.icon}
                        </IconButton>
                      </Link>
                    );
                  }

                  return null;
                })}
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={
                  user.state === 'guess' && userLoading === false
                    ? () => {
                        route.push('/');
                      }
                    : user.state === 'client0' && userLoading === false
                    ? () => {
                        route.push('/user');
                      }
                    : userLoading === true
                    ? () => {}
                    : handleMenu
                }
              >
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
                  <AccountCircleIcon
                    style={{ fontSize: 40, color: theme.common.color.white }}
                  />
                )}
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        <UserMenu
          state={user.state}
          anchorEl={anchorEl}
          handleClose={handleClose}
        />
      </motion.div>
    </React.Fragment>
  );
};

export default TopNavbar;
