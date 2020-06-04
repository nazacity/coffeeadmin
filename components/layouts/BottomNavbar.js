import React, { useEffect, useRef } from 'react';

// Framer-motion
import { motion } from 'framer-motion';

// Next
import Link from '../../src/Link';
import { useRouter } from 'next/router';

// Redux
import { setMenuIndex } from '../../redux/actions/layoutActions';
import { useSelector, useDispatch } from 'react-redux';

// MUI
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import HomeIcon from '@material-ui/icons/Home';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Avatar from '@material-ui/core/Avatar';
import CircularProgress from '@material-ui/core/CircularProgress';
import Icon from '@material-ui/core/Icon';

// Components
import UserMenu from './components/UserMenu';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'fixed',
    width: '100%',
    bottom: 0,
    boxShadow: theme.common.shadow.main,
  },
  bottomnavroot: {
    padding: '6px 0px 8px',
    color: theme.common.color.white,
    minWidth: 40,
  },
  bottomnavbox: {
    backgroundColor: theme.common.color.navColor,
  },
  userlogo: {
    width: '30px',
    height: '30px',
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
  MuiIcon: {
    overflow: 'visible',
  },
}));

const BottomNavbar = () => {
  const classes = useStyles();
  const user = useSelector((state) => state.user);
  const userLoading = useSelector((state) => state.layout.userLoading);
  const menuIndex = useSelector((state) => state.layout.menuIndex);
  const action = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const userIcon = useRef();

  const handleUserNavbarClick = () => {
    userIcon.current.click();
  };

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
      position: ['waiter', 'chef', 'manager'],
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
      position: ['waiter', 'chef', 'manager'],
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

  const handleChange = (event, activeIndex) => {
    action(setMenuIndex(activeIndex));
  };

  const route = useRouter();

  const checkRoute = () => {
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
      switch (route.pathname) {
        case `/`:
          if (menuIndex !== 0) {
            action(setMenuIndex(0));
          }
          break;
        case `/branch/table`:
          if (menuIndex !== 1) {
            action(setMenuIndex(1));
          }
          break;
        case `/branch/kitchen`:
          if (menuIndex !== 2) {
            action(setMenuIndex(2));
          }
          break;
        case `/branch/delivery`:
          if (menuIndex !== 3) {
            action(setMenuIndex(3));
          }
          break;
        default:
          break;
      }
    }
  };

  return (
    <React.Fragment>
      <motion.div
        initial={{ opacity: 0, y: '100%' }}
        animate={{ opacity: 1, y: '0%' }}
        transition={{
          duration: 1.2,
          ease: [0.43, 0.13, 0.23, 0.96],
        }}
        className={classes.root}
        onAnimationStart={checkRoute}
        style={{ zIndex: 2, width: '100vw', zIndex: 10 }}
      >
        <BottomNavigation
          value={menuIndex}
          onChange={handleChange}
          className={classes.bottomnavbox}
        >
          <BottomNavigationAction
            component={Link}
            href="/"
            label="หน้าแรก"
            value={0}
            icon={<HomeIcon />}
            classes={{
              root: classes.bottomnavroot,
              selected: classes.selected,
            }}
          />
          {user.state == 'admin' &&
            adminMenuOptions.map((menu) => (
              <BottomNavigationAction
                component={!menu.action ? Link : undefined}
                href={!menu.action ? menu.link : undefined}
                key={menu.name}
                label={menu.name}
                value={menu.selectedIndex}
                icon={menu.icon}
                classes={{
                  root: classes.bottomnavroot,
                  selected: classes.selected,
                }}
                onClick={menu.action}
              />
            ))}
          {user.state == 'employee' &&
            employeeMenuOptions.map((menu) => {
              if (menu.position.includes(user.employee.position)) {
                return (
                  <BottomNavigationAction
                    component={!menu.action ? Link : undefined}
                    href={!menu.action ? menu.link : undefined}
                    key={menu.name}
                    label={menu.name}
                    value={menu.selectedIndex}
                    icon={menu.icon}
                    classes={{
                      root: classes.bottomnavroot,
                      selected: classes.selected,
                    }}
                    onClick={menu.action}
                  />
                );
              }

              return null;
            })}
          <BottomNavigationAction
            label={
              userLoading
                ? 'loading'
                : user?.state !== 'guess'
                ? user?.firstName !== ''
                  ? user.firstName.toUpperCase()
                  : 'REGISTER'
                : 'Sign In'
            }
            value={5}
            icon={
              userLoading ? (
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
                  ref={userIcon}
                  onClick={
                    user.state === 'guess' && userLoading === false
                      ? () => {
                          route.push('/');
                        }
                      : user.state === 'client0' && userLoading === false
                      ? () => {
                          route.push('/user');
                        }
                      : handleMenu
                  }
                />
              ) : (
                <AccountCircleIcon />
              )
            }
            classes={{
              root: classes.bottomnavroot,
              selected: classes.selected,
            }}
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
                : handleUserNavbarClick
            }
          />
        </BottomNavigation>
        <UserMenu
          state={user.state}
          anchorEl={anchorEl}
          handleClose={handleClose}
        />
      </motion.div>
    </React.Fragment>
  );
};

export default BottomNavbar;
