import React from 'react';

// Next
import Link from '../../../src/Link';

// MUI
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Icon from '@material-ui/core/Icon';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const ProductMenu = ({ state, productAnchorEl, handleProductMenuClose }) => {
  const matches960donw = useMediaQuery('(max-width:960px)');
  return (
    <Menu
      id="product-menu"
      anchorEl={productAnchorEl}
      keepMounted
      open={Boolean(productAnchorEl)}
      onClose={handleProductMenuClose}
      elevation={2}
      style={{ top: '10px' }}
      transformOrigin={{ horizontal: 'right', vertical: 'bottom' }}
    >
      {state === 'admin' && (
        <Link href="/product/store" onClick={handleProductMenuClose}>
          <MenuItem
            style={{ width: '40%', minWidth: '250px', maxWidth: '400px' }}
          >
            <ListItemIcon>
              <Icon className="fas fa-store" color="primary" fontSize="small" />
            </ListItemIcon>
            <Typography variant="inherit">สินค้าในร้าน</Typography>
          </MenuItem>
        </Link>
      )}
      <Divider style={{ width: '60%', margin: '0px auto' }} />
      {state === 'admin' && (
        <Link href="/product/online" onClick={handleProductMenuClose}>
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
      )}
    </Menu>
  );
};

export default ProductMenu;
