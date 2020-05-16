import React from 'react';

// Apollo
import { useMutation } from '@apollo/react-hooks';
import {} from '../../../apollo/mutation';

// MUI
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';

// Firebase
import { db } from '../../../firebase';

const OrderAction = ({ order }) => {
  const handleClearOrder = (e) => {
    e.preventDefault();
    db.ref(`/order/${order.key}`).remove();
  };
  return (
    <CardActions
      style={{ display: 'flex', justifyContent: 'center' }}
      onClick={handleClearOrder}
    >
      <Button
        size="small"
        variant="contained"
        style={{ backgroundColor: '#66bb6a', color: 'white' }}
      >
        เรียบร้อย
      </Button>
    </CardActions>
  );
};

export default OrderAction;
