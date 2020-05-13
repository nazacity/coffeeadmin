import React from 'react';
import { useForm, Controller } from 'react-hook-form';

// Redux
import { useDispatch } from 'react-redux';
import { createCatalogs } from '../../redux/actions/productAction';

// Apollo
import { useMutation } from '@apollo/react-hooks';
import { MUTAION_CREATECATALOG } from '../../apollo/mutation';

// MUI
import { useTheme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

// Components
import ProductTable from './components/ProductTable';

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
  name: '',
  th: '',
};

const DtProduct = () => {
  const theme = useTheme();
  const { control, handleSubmit, reset, errors } = useForm();
  const action = useDispatch();
  const classes = useStyles();
  const [createCatalog, { loading, error }] = useMutation(
    MUTAION_CREATECATALOG,
    {
      onCompleted: (data) => {
        action(createCatalogs(data.createCatalog));
        reset(defaultValues);
      },
    }
  );

  const onSubmit = (data) => {
    createCatalog({
      variables: {
        name: data.name.toLowerCase(),
        th: data.th,
      },
    });
  };
  return (
    <div style={{ maxWidth: theme.layer.maxwidth, margin: 'auto' }}>
      <Card style={{ margin: '2vh auto', width: '50%', padding: '2vh' }}>
        <Typography align="center" variant="h4">
          เพิ่มประเภทสินค้า
        </Typography>
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
              style={{ width: '100%', marginBottom: '1vh' }}
              disabled={loading}
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
              style={{ width: '100%', marginBottom: '1vh' }}
              disabled={loading}
            />
          </CardContent>
          <CardActions style={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={{ marginRight: '2em' }}
              disabled={loading}
              classes={{ root: classes.buttonRoot, disabled: classes.disabled }}
            >
              Confirm
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
            >
              Cancel
            </Button>
          </CardActions>
        </form>
      </Card>
      <ProductTable />
    </div>
  );
};

export default DtProduct;
