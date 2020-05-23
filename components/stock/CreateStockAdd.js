import React from 'react';

// Apollo
import { useMutation } from '@apollo/react-hooks';
import { MUTATION_CREATE_STOCKADD } from '../../apollo/mutation';

// Redux
import { useDispatch } from 'react-redux';
import { updateBranch } from '../../redux/actions/storeActions';

// MUI
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useForm, Controller } from 'react-hook-form';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

// Toast
import { useToasts } from 'react-toast-notifications';

const useStyles = makeStyles((theme) => ({
  title: {
    fontSize: '1.5em',
    color: theme.common.color.white,
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  logo: {
    width: '300px',
    height: '300px',
    margin: 'auto',
    border: '10px solid #764d24',
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
  buttonRoot: {
    '&$disabled': {
      color: theme.palette.primary.light,
      backgroundColor: '#e2e2e2',
    },
  },
  disabled: {},
  userlogo: {
    width: '80px',
    height: '80px',
    margin: 'auto',
    border: '5px solid #764d24',
  },
}));

const defaultValues = {
  buy: '',
  amount: '',
};

const CreateStockAdd = ({ row, setRerender, handleClose }) => {
  const action = useDispatch();
  const { control, handleSubmit, reset, errors } = useForm();
  const classes = useStyles();
  const { addToast } = useToasts();

  const [createStockAdd, { loading, error }] = useMutation(
    MUTATION_CREATE_STOCKADD,
    {
      onCompleted: async (data) => {
        await action(updateBranch(data.createStockAdd));
        setRerender(true);
        setRerender(false);
        const content = (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Avatar
              src={data.createStockAdd.pictureUrl}
              alt={data.createStockAdd.name}
              style={{
                marginRight: '1vh',
                backgroundColor: '#fff',
                boxShadow: theme.common.shadow.black,
              }}
            />
            <Typography>
              เพิ่มวัตถุดิบ {data.createStockAdd.name} เรียบร้อย
            </Typography>
          </div>
        );
        addToast(content, {
          appearance: 'success',
          autoDismiss: true,
        });
      },
    }
  );

  const onSubmit = async (data) => {
    try {
      await createStockAdd({
        variables: {
          stockId: row.id,
          buy: +data.buy,
          amount: +data.amount,
        },
      });
      handleClose();
    } catch (error) {
      addToast('ไม่สามารถเพิ่มปริมาณวัตถุดิบได้', {
        appearance: 'error',
        autoDismiss: true,
      });
      handleClose();
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <CardContent>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <Controller
            as={TextField}
            name="buy"
            control={control}
            defaultValue=""
            label="จำนวนที่เพิ่ม"
            variant="outlined"
            rules={{
              required: 'กรุณาจำนวนที่เพิ่ม',
            }}
            error={errors.buy && true}
            helperText={errors.buy?.message}
            size="small"
            style={{ width: '100%', marginBottom: '1vh' }}
            disabled={loading}
          />
          <Controller
            as={TextField}
            name="amount"
            control={control}
            defaultValue=""
            label="ราคาซื้อ"
            variant="outlined"
            rules={{
              required: 'กรุณาใส่ราคาซื้อ',
            }}
            error={errors.amount && true}
            helperText={errors.amount?.message}
            size="small"
            style={{ width: '100%', marginBottom: '1vh' }}
            disabled={loading}
          />
        </div>
      </CardContent>
      <CardActions>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{ marginRight: '2em', margin: 'auto' }}
          disabled={loading}
          classes={{ root: classes.buttonRoot, disabled: classes.disabled }}
        >
          เพิ่ม
          {loading && (
            <div style={{ position: 'absolute', display: 'flex' }}>
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
          )}
        </Button>
        <Button
          type="button"
          onClick={() => {
            reset(defaultValues);
            handleClose();
          }}
          variant="outlined"
          color="primary"
          style={{ margin: 'auto' }}
        >
          ยกเลิก
        </Button>
      </CardActions>
    </form>
  );
};

export default CreateStockAdd;
