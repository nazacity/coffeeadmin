import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';

// Apollo
import { useMutation } from '@apollo/react-hooks';
import { MUTAION_CREATE_ORDERFROMSTOREORDER } from '../../apollo/mutation';

// MUI
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import TextField from '@material-ui/core/TextField';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useTheme, makeStyles } from '@material-ui/core/styles';

// Redux
import { useDispatch } from 'react-redux';
import { updateTableOrder } from '../../redux/actions/storeActions';

const defaultValues = {
  discount: 0,
};

const useStyles = makeStyles((theme) => ({
  buttonRoot: {
    '&$disabled': {
      color: theme.palette.primary.light,
      backgroundColor: '#e2e2e2',
    },
  },
  disabled: {},
}));

const CheckBillForm = ({ table, setState, handleClose }) => {
  const { control, handleSubmit, reset, errors } = useForm();
  const matches600down = useMediaQuery('(max-width:600px)');
  const theme = useTheme();
  const classes = useStyles();
  const action = useDispatch();

  const [createOrderFromStoreOrder, { loading, error }] = useMutation(
    MUTAION_CREATE_ORDERFROMSTOREORDER,
    {
      onCompleted: (data) => {
        console.log(data.createOrderFromStoreOrder);
        action(updateTableOrder(data.createOrderFromStoreOrder));
        handleClose();
      },
    }
  );

  const onSubmit = async (data) => {
    await createOrderFromStoreOrder({
      variables: {
        tableId: table.bill.id,
        discount: data.discount ? +data.discount : 0,
      },
    });
  };
  return (
    <div style={{ padding: '2vh' }}>
      <Typography variant="h6" align="center">
        เช็คบิล {table.table}
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent>
          <div
            style={{
              display: 'flex',
              flexDirection: matches600down ? 'column' : 'row',
              justifyContent: 'center',
            }}
          >
            <Controller
              as={TextField}
              name="discount"
              control={control}
              defaultValue=""
              label="เปอร์เซ็นส่วนลด"
              variant="outlined"
              error={errors.th && true}
              helperText={errors.th?.message}
              size="small"
              disabled={loading}
              style={{ width: '100%', margin: '1vh auto' }}
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
            classes={{
              root: classes.buttonRoot,
              disabled: classes.disabled,
            }}
          >
            เช็คบิล
            {loading && (
              <div style={{ position: 'absolute', display: 'flex' }}>
                <CircularProgress
                  variant="determinate"
                  value={100}
                  style={{ color: theme.palette.primary.dark }}
                  size={24}
                  thickness={4}
                />
                <CircularProgress
                  variant="indeterminate"
                  disableShrink
                  style={{
                    color: theme.palette.primary.light,
                    animationDuration: '550ms',
                    position: 'absolute',
                    left: 0,
                  }}
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
              setState(0);
            }}
            variant="outlined"
            color="primary"
            style={{ margin: 'auto' }}
          >
            ยกเลิก
          </Button>
        </CardActions>
      </form>
    </div>
  );
};

export default CheckBillForm;
