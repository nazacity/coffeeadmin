import React from 'react';
import { useForm, Controller } from 'react-hook-form';

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
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';

// Framer-motion
import { motion } from 'framer-motion';

// Apollo
import { useQuery, useMutation } from '@apollo/react-hooks';
import { QUERY_ORDER_FORPAYING } from '../../apollo/query';
import { MUTAION_CLEAR_PLACE } from '../../apollo/mutation';

// Redux
import { useDispatch } from 'react-redux';
import { clearTable } from '../../redux/actions/storeActions';

// Toast
import { useToasts } from 'react-toast-notifications';

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
  const { control, handleSubmit, reset, errors } = useForm();
  const matches600down = useMediaQuery('(max-width:600px)');
  const matches1024down = useMediaQuery('(max-width:1024px)');
  const action = useDispatch();
  const classes = useStyles();
  const theme = useTheme();
  const { addToast } = useToasts();

  const { data, loading, error } = useQuery(QUERY_ORDER_FORPAYING, {
    variables: { orderId: orderId },
    onCompleted: (data) => {},
  });

  const [clearPlace] = useMutation(MUTAION_CLEAR_PLACE, {
    onCompleted: (data) => {
      action(clearTable(data.clearPlace));
      setBillDisplayOpen(false);
      setRerender(true);
      setRerender(false);
    },
  });

  const onSubmit = async (db) => {
    if (!db.by) {
      addToast(<div style={{ zIndex: 101 }}>กรุณาเลือกวิธีชำระเงิน</div>, {
        appearance: 'error',
        autoDismiss: true,
      });
      return;
    } else {
      try {
        await clearPlace({
          variables: {
            placeId: data.order.place.id,
            by: db.by,
          },
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Dialog
      fullScreen
      open={billDisplayOpen}
      onClose={() => setBillDisplayOpen(false)}
      TransitionComponent={Transition}
      style={{ zIndex: 100 }}
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
      <Typography align="center">เพิ่มโต๊ะ</Typography>
      <AppBar
        position="fixed"
        color="primary"
        style={{
          top: 'auto',
          bottom: 0,
          backgroundColor: '#fff',
        }}
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{
            margin: '2vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <FormControl
            variant="outlined"
            style={{
              width: '80%',
              marginBottom: '2vh',
            }}
          >
            <InputLabel id="demo-simple-select-outlined-label">
              ชำระโดย
            </InputLabel>
            <Controller
              as={
                <Select label="ชำระโดย">
                  <MenuItem value="cash">
                    <div
                      style={{
                        display: 'flex',
                        alignItem: 'center',
                      }}
                    >
                      <Typography
                        style={{
                          margin: 'auto 2vh',
                        }}
                      >
                        เงินสด
                      </Typography>
                    </div>
                  </MenuItem>
                  <MenuItem value="creditcarก">
                    <div
                      style={{
                        display: 'flex',
                        alignItem: 'center',
                      }}
                    >
                      <Typography style={{ margin: 'auto 2vh' }}>
                        บัตรเครดิต
                      </Typography>
                    </div>
                  </MenuItem>
                </Select>
              }
              control={control}
              name="by"
              defaultValue=""
            />
          </FormControl>
          <Button
            variant="contained"
            color="primary"
            style={{ marginBottom: '2vh', width: '80%' }}
            type="submit"
            classes={{
              root: classes.buttonRoot,
              disabled: classes.disabled,
            }}
          >
            เคลียร์โต๊ะ
          </Button>
        </form>
      </AppBar>
    </Dialog>
  );
};

export default BillDisplay;
