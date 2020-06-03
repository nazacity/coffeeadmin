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
import { useTheme, makeStyles } from '@material-ui/core/styles';
import CancelIcon from '@material-ui/icons/Cancel';
import CircularProgress from '@material-ui/core/CircularProgress';

// Firebase
import { firestore } from '../../../firebase';

// Toast
import { useToasts } from 'react-toast-notifications';

const useStyles = makeStyles((theme) => ({
  top: {
    color: theme.palette.primary.dark,
  },
  bottom: {
    color: theme.palette.primary.light,
    animationDuration: '550ms',
    position: 'absolute',
    left: 0,
  },
}));

const SwipeableItem = ({ order, item, branchId }) => {
  const classes = useStyles();

  const theme = useTheme();
  const matchesLGDown = useMediaQuery('(max-width:1300px)');
  const matchesMDDown = useMediaQuery('(max-width:1200px)');
  const matchesSMDown = useMediaQuery('(max-width:600px)');
  const { addToast } = useToasts();

  const [cancelOrderItemByID, { loading }] = useMutation(
    MUTATION_CANCEL_ORDERITEM_BY_ID,
    {
      onCompleted: (data) => {
        addToast('ยกเลิกรายการอาหารเรียบร้อย', {
          appearance: 'success',
          autoDismiss: true,
        });
      },
    }
  );

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
          setTimeout(async () => {
            try {
              await doneOrderItemByID({
                variables: {
                  orderItemId: item.id,
                },
              });
              let items = order.items.filter((key) => item.id !== key.id);

              if (items.length === 0) {
                firestore
                  .collection(`branchId=${branchId}`)
                  .doc(order.key)
                  .delete();
              } else {
                firestore
                  .collection(`branchId=${branchId}`)
                  .doc(order.key)
                  .update({
                    items,
                  });
              }
            } catch (error) {
              console.log(error.message);
            }
          }, 600);
        },
        actionAnimation: ActionAnimations.REMOVE,
      }}
      swipeRight={
        !order.user.pictureUrl
          ? {
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
                    {loading ? (
                      <div
                        style={{
                          position: 'absolute',
                          display: 'flex',
                          marginLeft: '1vh',
                        }}
                      >
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
                    ) : (
                      <CancelIcon style={{ color: '#fff' }} />
                    )}
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
                        quantity: +item.quantity,
                      },
                    });

                    let items = order.items.filter((key) => item.id !== key.id);
                    if (items.length === 0) {
                      firestore
                        .collection(`branchId=${branchId}`)
                        .doc(order.key)
                        .delete();
                    } else {
                      firestore
                        .collection(`branchId=${branchId}`)
                        .doc(order.key)
                        .update({
                          items,
                        });
                    }
                  } catch (error) {
                    console.log(error.message);
                  }
                }, 600);
              },
              actionAnimation: ActionAnimations.REMOVE,
            }
          : undefined
      }
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
