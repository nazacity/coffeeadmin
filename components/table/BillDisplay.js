import React from 'react';

// MUI
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';

// Framer-motion
import { motion } from 'framer-motion';

// Apollo
import { useQuery, useMutation } from '@apollo/react-hooks';
import { QUERY_ORDER_FORPAYING } from '../../apollo/query';
import { MUTAION_CLEAR_PLACE } from '../../apollo/mutation';

// Redux
import { useDispatch } from 'react-redux';
import { clearTable } from '../../redux/actions/storeActions';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },

  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  top: {
    color: theme.palette.primary.dark,
    position: 'absolute',
  },
  bottom: {
    color: theme.palette.primary.light,
    animationDuration: '550ms',
  },
}));

const BillDisplay = ({
  billDisplayOpen,
  setBillDisplayOpen,
  orderId,
  setRerender,
}) => {
  const matches600down = useMediaQuery('(max-width:600px)');
  const matches1024down = useMediaQuery('(max-width:1024px)');
  const action = useDispatch();
  const classes = useStyles();
  const theme = useTheme();

  const { data, loading, error } = useQuery(QUERY_ORDER_FORPAYING, {
    variables: { orderId: orderId },
    onCompleted: (data) => {
      console.log(data.order);
    },
  });

  const [clearPlace] = useMutation(MUTAION_CLEAR_PLACE, {
    onCompleted: (data) => {
      action(clearTable(data.clearPlace));
      setBillDisplayOpen(false);
      setRerender(true);
      setRerender(false);
    },
  });

  return (
    <Dialog
      fullScreen
      open={billDisplayOpen}
      onClose={() => setBillDisplayOpen(false)}
      TransitionComponent={Transition}
    >
      <AppBar className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" align="center" className={classes.title}>
            ใบเสร็จ
          </Typography>
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => setBillDisplayOpen(false)}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <div
        style={{
          maxWidth: '1280px',
          margin: 'auto',
          width: matches1024down ? '100%' : '80%',
          color: theme.palette.secondary.main,
          marginTop: '20px',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 2fr 1fr 1fr',
            width: '100%',
          }}
        >
          <h3 style={{ margin: 'auto' }}></h3>
          <h3 style={{ margin: 'auto' }}>รายการ</h3>
          <h3 style={{ margin: 'auto' }}>จำนวน</h3>
          <h3 style={{ margin: 'auto' }}>ราคา</h3>
        </div>
        <Divider style={{ width: '100%', margin: '20px auto' }} />
        {loading ? (
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%,-50%)',
            }}
          >
            <CircularProgress
              variant="determinate"
              value={100}
              className={classes.top}
              size={matches600down ? 60 : 120}
              thickness={4}
            />
            <CircularProgress
              variant="indeterminate"
              disableShrink
              className={classes.bottom}
              size={matches600down ? 60 : 120}
              thickness={4}
            />
          </div>
        ) : (
          <React.Fragment>
            {data?.order?.items.map((item, index) => (
              <motion.div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 2fr 1fr 1fr',
                  width: '100%',
                  color: theme.palette.secondary.main,
                }}
                initial={{ x: '-30%', opacity: 0 }}
                animate={{ x: '0%', opacity: 1 }}
                exit={{
                  x: '30%',
                  opacity: 0,
                  transition: {
                    duration: 1,
                    ease: 'easeIn',
                    delay: (data?.order?.items.length - index) * 0.2,
                  },
                }}
                transition={{
                  duration: 1,
                  ease: 'easeOut',
                  delay: 0.2 * index,
                }}
                key={`${item.storeProduct.id}${index}`}
              >
                <Avatar
                  src={item.storeProduct.pictureUrl}
                  alt={item.storeProduct.name}
                  style={{ margin: 'auto' }}
                />

                <p style={{ margin: 'auto' }}>{item.storeProduct.name}</p>
                <p style={{ margin: 'auto' }}>{item.quantity}</p>
                <p style={{ margin: 'auto' }}>
                  {item.storeProduct.price * item.quantity}
                </p>
              </motion.div>
            ))}
            {data?.order?.items.length > 0 && (
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 2fr 1fr 1fr',
                  width: '100%',
                  color: theme.palette.secondary.main,
                }}
              >
                <p style={{ margin: 'auto' }}></p>
                <p style={{ marginRight: 'auto' }}>ราคาก่อนส่วนลด</p>
                <p style={{ marginLeft: 'auto' }}>
                  {(data.order.amount / 100).toFixed(2)}
                </p>
                <p style={{ margin: 'auto' }}>บาท</p>
                <p style={{ margin: 'auto' }}></p>
                <p style={{ marginRight: 'auto' }}>ส่วนลด</p>
                <p style={{ marginLeft: 'auto' }}>
                  {(data.order.discount / 100).toFixed(2)}
                </p>
                <p style={{ margin: 'auto' }}>บาท</p>
                <p style={{ margin: 'auto' }}></p>
                <p style={{ marginRight: 'auto' }}>รวม</p>
                <p style={{ marginLeft: 'auto' }}>
                  {(data.order.net / 100).toFixed(2)}
                </p>
                <p style={{ margin: 'auto' }}>บาท</p>
              </div>
            )}
          </React.Fragment>
        )}
      </div>
      <Button
        variant="contained"
        color="primary"
        style={{ margin: 'auto', marginBottom: '2vh', width: '80%' }}
        //สั่งลบ table id เพื่อปิดโต๊ะ
        classes={{
          root: classes.buttonRoot,
          disabled: classes.disabled,
        }}
        onClick={() => {
          console.log(data.order.place.id);
          clearPlace({
            variables: {
              placeId: data.order.place.id,
            },
          });
        }}
      >
        เคลียร์โต๊ะ
      </Button>
    </Dialog>
  );
};

export default BillDisplay;
