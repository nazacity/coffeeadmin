import React from 'react';

// Next
import Link from '../../../src/Link';

// Redux
import { useDispatch } from 'react-redux';
import { userSignOut } from '../../../redux/actions/userActions';

// MUI
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Icon from '@material-ui/core/Icon';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

const UserMenu = ({ state, anchorEl, handleClose }) => {
  const action = useDispatch();
  return (
    <Menu
      id="user-menu"
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={handleClose}
      elevation={2}
      style={{ top: '10px' }}
      transformOrigin={{ horizontal: 'right', vertical: 'bottom' }}
    >
      {state === 'admin' && (
        <Link href="/employee" onClick={handleClose}>
          <MenuItem
            style={{ width: '40%', minWidth: '250px', maxWidth: '400px' }}
          >
            <ListItemIcon>
              <Icon className="fas fa-user" color="primary" fontSize="small" />
            </ListItemIcon>
            <Typography variant="inherit">พนักงาน</Typography>
          </MenuItem>
          <Divider style={{ width: '60%', margin: '0px auto' }} />
        </Link>
      )}
      {state === 'admin' && (
        <Link href="/table" onClick={handleClose}>
          <MenuItem
            style={{ width: '40%', minWidth: '250px', maxWidth: '400px' }}
          >
            <ListItemIcon>
              <Icon
                className="fab fa-buffer"
                color="primary"
                fontSize="small"
              />
            </ListItemIcon>
            <Typography variant="inherit">สาขา และ โต๊ะ</Typography>
          </MenuItem>
          <Divider style={{ width: '60%', margin: '0px auto' }} />
        </Link>
      )}
      {state === 'admin' && (
        <Link href="/stock" onClick={handleClose}>
          <MenuItem
            style={{ width: '40%', minWidth: '250px', maxWidth: '400px' }}
          >
            <ListItemIcon>
              <Icon
                className="fab fa-cloudversify"
                color="primary"
                fontSize="small"
              />
            </ListItemIcon>
            <Typography variant="inherit">คลังวัตถุดิบ</Typography>
          </MenuItem>
          <Divider style={{ width: '60%', margin: '0px auto' }} />
        </Link>
      )}
      {state === 'admin' && (
        <div>
          <Link href="/product/store" onClick={handleClose}>
            <MenuItem
              style={{ width: '40%', minWidth: '250px', maxWidth: '400px' }}
            >
              <ListItemIcon>
                <Icon
                  className="fas fa-store"
                  color="primary"
                  fontSize="small"
                />
              </ListItemIcon>
              <Typography variant="inherit">สินค้าในร้าน</Typography>
            </MenuItem>
          </Link>
          <Divider style={{ width: '60%', margin: '0px auto' }} />
          <Link href="/product/online" onClick={handleClose}>
            <MenuItem
              style={{ width: '40%', minWidth: '250px', maxWidth: '400px' }}
            >
              <ListItemIcon>
                <Icon
                  className="fas fa-store-alt"
                  color="primary"
                  fontSize="small"
                />
              </ListItemIcon>
              <Typography variant="inherit">สินค้าในร้านออนไลน์</Typography>
            </MenuItem>
          </Link>
          <Divider style={{ width: '60%', margin: '0px auto' }} />
        </div>
      )}
      <MenuItem
        onClick={() => {
          action(userSignOut());
          handleClose();
        }}
      >
        <ListItemIcon>
          <Icon
            className="fas fa-sign-out-alt"
            color="primary"
            fontSize="small"
          />
        </ListItemIcon>
        <Typography variant="inherit" color="primary">
          ลงชื่อออก
        </Typography>
      </MenuItem>
    </Menu>
  );
};

export default UserMenu;
