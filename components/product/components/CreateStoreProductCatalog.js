import React from 'react';
import { useForm, Controller } from 'react-hook-form';

// Redux
import { useDispatch } from 'react-redux';
import { createStoreProductCatalogs } from '../../../redux/actions/productAction';

// Apollo
import { useMutation } from '@apollo/react-hooks';
import { MUTAION_CREATE_STOREPRODUCTCATALOG } from '../../../apollo/mutation';

// MUI
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import useMediaQuery from '@material-ui/core/useMediaQuery';

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
  buttonRoot: {
    '&$disabled': {
      color: theme.palette.primary.light,
      backgroundColor: '#e2e2e2',
    },
  },
  disabled: {},
}));

const defaultValues = {
  name: '',
  th: '',
};

const CreateStoreProductCatalog = ({ setRerender }) => {
  const { addToast } = useToasts();
  const { control, handleSubmit, reset, errors } = useForm();
  const theme = useTheme();
  const matches1024down = useMediaQuery('(max-width:1024)');
  const action = useDispatch();
  const classes = useStyles();
  const [createStoreProductCatalog, { loading, error }] = useMutation(
    MUTAION_CREATE_STOREPRODUCTCATALOG,
    {
      onCompleted: (data) => {
        console.log(data);
        action(createStoreProductCatalogs(data.createStoreProductCatalog));
        reset(defaultValues);
        addToast('เพิ่มประเภทสินค้าในร้านเรียบร้อย', {
          appearance: 'success',
          autoDismiss: true,
        });
        setRerender(true);
        setRerender(false);
      },
    }
  );

  const onSubmit = async (data) => {
    console.log(data);
    try {
      await createStoreProductCatalog({
        variables: {
          name: data.name,
          th: data.th,
        },
      });
    } catch (error) {
      console.log(error);
      addToast(
        error.message === 'GraphQL error: StcokCatalog already exsit' &&
          'ไม่สามารถเพิ่มประเภทสินค้าในร้านซ้ำได้',
        {
          appearance: 'error',
          autoDismiss: true,
          placement: 'top-center',
        }
      );
    }
  };
  return (
    <div
      style={{
        maxWidth: matches1024down ? undefined : theme.layer.maxwidth,
        margin: 'auto',
      }}
    >
      <Card style={{ margin: '2vh', boxShadow: theme.common.shadow.main1 }}>
        <Typography align="center">เพิ่มประเภทสินค้าในร้าน</Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent>
            <Controller
              as={TextField}
              name="name"
              control={control}
              defaultValue=""
              label="ภาษาอังกฤษ"
              variant="outlined"
              rules={{
                required: 'กรุณาใส่ประเภทภาษาอังกฤษ',
              }}
              error={errors.name && true}
              helperText={errors.name?.message}
              size="small"
              disabled={loading}
              style={{ width: '100%', margin: '1vh auto' }}
            />
            <Controller
              as={TextField}
              name="th"
              control={control}
              defaultValue=""
              label="ภาษาไทย"
              variant="outlined"
              rules={{
                required: 'กรุณาใส่ประเภทภาษาไทย',
              }}
              error={errors.th && true}
              helperText={errors.th?.message}
              size="small"
              disabled={loading}
              style={{ width: '100%', margin: '1vh auto' }}
            />
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
              เพิ่มประเภทสินค้าในร้าน
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
              }}
              variant="outlined"
              color="primary"
              style={{ margin: 'auto' }}
            >
              ยกเลิก
            </Button>
          </CardActions>
        </form>
      </Card>
    </div>
  );
};

export default CreateStoreProductCatalog;
