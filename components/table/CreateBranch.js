import React from 'react';
import { useForm, Controller } from 'react-hook-form';

// Redux
import { useDispatch } from 'react-redux';
import { createCatalogs } from '../../redux/actions/productAction';

// Apollo
import { useMutation } from '@apollo/react-hooks';
import { MUTATION_CREATE_BRANCH } from '../../apollo/mutation';

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
  branch: '',
};

const CreateBranch = () => {
  const { control, handleSubmit, reset, errors } = useForm();
  const theme = useTheme();
  const matches1024down = useMediaQuery('(max-width:1024)');
  const action = useDispatch();
  const classes = useStyles();
  const [createBranch, { loading, error }] = useMutation(
    MUTATION_CREATE_BRANCH,
    {
      onCompleted: (data) => {
        console.log(data);
      },
    }
  );

  const onSubmit = (data) => {
    createBranch({
      variables: {
        branch: data.branch,
      },
    });
  };
  return (
    <div
      style={{
        maxWidth: matches1024down ? undefined : theme.layer.maxwidth,
        margin: 'auto',
      }}
    >
      <Card style={{ margin: '2vh', boxShadow: theme.common.shadow.main1 }}>
        <Typography align="center">เพิ่มสาขา</Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent>
            <Controller
              as={TextField}
              name="branch"
              control={control}
              defaultValue=""
              label="ชื่อสาขา"
              variant="outlined"
              rules={{
                required: 'กรุณาใส่สาขา',
              }}
              error={errors.branch && true}
              helperText={errors.branch?.message}
              size="small"
              classes={{ root: classes.TextFieldRoot }}
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
              เพิ่มสาขา
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

export default CreateBranch;
