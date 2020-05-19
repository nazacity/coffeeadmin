import React from 'react';
import {
  SwipeableListItem,
  ActionAnimations,
} from '@sandstreamdev/react-swipeable-list';

// Apollo
import { useMutation } from '@apollo/react-hooks';
import {
  MUTATION_CANCEL_ORDERITEM_BY_ID,
  MUTATION_DONE_ORDERITEM_BY_ID,
} from '../../../apollo/mutation';

// MUI
import Avatar from '@material-ui/core/Avatar';
import CardActionArea from '@material-ui/core/CardActionArea';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import CancelIcon from '@material-ui/icons/Cancel';

// Firebase
import { db } from '../../../firebase';

// Toast
import { useToasts } from 'react-toast-notifications';

const SwipeableItem = ({ order, item }) => {
  const theme = useTheme();
  const matchesLGDown = useMediaQuery('(max-width:1300px)');
  const matchesMDDown = useMediaQuery('(max-width:1200px)');
  const matchesSMDown = useMediaQuery('(max-width:600px)');
  const { addToast } = useToasts();

  const [cancelOrderItemByID] = useMutation(MUTATION_CANCEL_ORDERITEM_BY_ID, {
    onCompleted: (data) => {
      // if (data.cancelOrderItemByID.items.length >= 1) {
      //   db.ref('/order').push(data.cancelOrderItemByID);
      // }
      addToast('ยกเลิกรายการอาหารเรียบร้อย', {
        appearance: 'success',
        autoDismiss: true,
      });
    },
  });

  const [doneOrderItemByID] = useMutation(MUTATION_DONE_ORDERITEM_BY_ID, {
    onCompleted: (data) => {
      addToast('รายการอาหารเสร็จเรียบร้อย', {
        appearance: 'success',
        autoDismiss: true,
      });
    },
  });
  return (
    <SwipeableListItem
      swipeLeft={{
        content: (
          <div
            style={{
              backgroundColor: '#66bb6a',
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
            }}
          >
            <Typography style={{ color: '#fff' }}>
              รายการอาหาร สำเร็จ
            </Typography>
            <ListItemIcon
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'center',
                paddingRight: matchesSMDown
                  ? '2%'
                  : matchesMDDown
                  ? '4%'
                  : matchesLGDown
                  ? '4.5%'
                  : '5%',
              }}
            >
              <CheckBoxIcon style={{ color: '#fff' }} />
            </ListItemIcon>
          </div>
        ),
        action: () => {
          setTimeout(() => {
            doneOrderItemByID({
              variables: {
                orderItemId: item.id,
              },
            });
            db.ref(`/order/${order.key}`).remove();
            if (order.items.length > 1) {
              let newOrder;
              newOrder = {
                user: order.user,
                createdAt: order.createdAt,
                id: order.id,
                items: order.items.filter((key) => item.id !== key.id),
              };
              db.ref('/order').push(newOrder);
            }
          }, 600);
        },
        actionAnimation: ActionAnimations.REMOVE,
      }}
      swipeRight={{
        content: (
          <div
            style={{
              backgroundColor: '#c62828',
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-start',
            }}
          >
            <ListItemIcon
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
                paddingLeft: matchesSMDown
                  ? '2%'
                  : matchesMDDown
                  ? '4%'
                  : matchesLGDown
                  ? '4.5%'
                  : '5%',
              }}
            >
              <CancelIcon style={{ color: '#fff' }} />
            </ListItemIcon>
            <Typography style={{ color: '#fff' }}>
              ยกเลิก รายการอาหาร
            </Typography>
          </div>
        ),
        action: () => {
          setTimeout(async () => {
            try {
              await cancelOrderItemByID({
                variables: {
                  orderId: order.id,
                  orderItemId: item.id,
                },
              });
            } catch (error) {
              console.log(error.message);
            }

            db.ref(`/order/${order.key}`).remove();
            if (order.items.length > 1) {
              let newOrder;
              newOrder = {
                user: order.user,
                createdAt: order.createdAt,
                id: order.id,
                items: order.items.filter((key) => item.id !== key.id),
              };
              db.ref('/order').push(newOrder);
            }
          }, 600);
        },
        actionAnimation: ActionAnimations.REMOVE,
      }}
    >
      <CardActionArea
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '0.5vh',
          boxShadow: theme.common.shadow.black,
        }}
      >
        <Avatar
          src={item.product.pictureUrl}
          alt={item.name}
          style={{
            boxShadow: theme.common.shadow.black,
            backgroundColor: '#fff',
            width: 40,
            height: 40,
          }}
        />
        <Typography variant="body1" color="primary">
          {item.product.name}
        </Typography>
        <Typography variant="body1" color="primary">
          {item.quantity}
        </Typography>
      </CardActionArea>
    </SwipeableListItem>
  );
};

export default SwipeableItem;
