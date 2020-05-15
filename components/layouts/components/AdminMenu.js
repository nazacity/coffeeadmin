import React from 'react';

// Next
import Link from '../../../src/Link';

// Mui
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Icon from '@material-ui/core/Icon';
import Divider from '@material-ui/core/Divider';

const AdminMenu = ({ handleClose }) => {
  return (
    <div>
      <Link href="/employee" onClick={handleClose}>
        <MenuItem
          style={{ width: '40%', minWidth: '250px', maxWidth: '400px' }}
        >
          <ListItemIcon>
            <Icon className="fas fa-user" color="primary" fontSize="small" />
          </ListItemIcon>
          <Typography variant="inherit">พนักงาน</Typography>
        </MenuItem>
      </Link>
      <Divider style={{ width: '60%', margin: '0px auto' }} />
      <Link href="/order" onClick={handleClose}>
        <MenuItem
          style={{ width: '40%', minWidth: '250px', maxWidth: '400px' }}
        >
          <ListItemIcon>
            <Icon className="fas fa-list-ul" color="primary" fontSize="small" />
          </ListItemIcon>
          <Typography variant="inherit">รายการสั่งอาหาร</Typography>
        </MenuItem>
      </Link>
      <Divider style={{ width: '60%', margin: '0px auto' }} />
    </div>
  );
};

export default AdminMenu;
