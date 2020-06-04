import React from 'react';
import { useForm, Controller } from 'react-hook-form';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { createTables } from '../../redux/actions/storeActions';

// Apollo
import { useMutation } from '@apollo/react-hooks';
import { MUTATION_CREATE_TABLE } from '../../apollo/mutation';

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
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

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
  branchId: '',
  table: '',
};

const CreateTable = ({ setRerender }) => {
  const matches600down = useMediaQuery('(max-width:600px)');
  const { addToast } = useToasts();
  const { control, handleSubmit, reset, errors } = useForm();
  const theme = useTheme();
  const matches1024down = useMediaQuery('(max-width:1024)');
  const branchs = useSelector((state) => state.store.branch);
  const action = useDispatch();
  const classes = useStyles();
  const [createTable, { loading, error }] = useMutation(MUTATION_CREATE_TABLE, {
    onCompleted: (data) => {
      action(createTables(data.createPlace));
      reset(defaultValues);
      addToast('เพิ่มโต๊ะในสาขาเรียบร้อย', {
        appearance: 'success',
        autoDismiss: true,
      });
      setRerender(true);
      setRerender(false);
    },
  });

  const onSubmit = async (data) => {
    try {
      await createTable({
        variables: {
          branchId: data.branchId,
          table: data.table,
        },
      });
    } catch (error) {
      console.log(error);
      addToast(
        error.message === 'GraphQL error: Table already exsit' &&
          'ไม่สามารถเพิ่มรหัสโต๊ะซ้ำได้',
        {
          appearance: 'error',
          autoDismiss: true,
          placement: 'top-center',
        }
      );
    }
  };
  return (
    <React.Fragment>
      <div style={{ margin: '2vh' }}>
        <Typography align="center">เพิ่มโต๊ะ</Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent>
            <FormControl
              variant="outlined"
              style={{
                width: '100%',
                marginRight: matches600down ? 0 : '2vh',
                marginBottom: '2vh',
              }}
            >
              <InputLabel id="demo-simple-select-outlined-label">
                สาขา
              </InputLabel>
              <Controller
                as={
                  <Select label="สาขา">
                    {branchs.map((branch) => (
                      <MenuItem key={branch.id} value={branch.id}>
                        <div
                          style={{
                            display: 'flex',
                            alignItem: 'center',
                          }}
                        >
                          <Typography style={{ margin: 'auto 2vh' }}>
                            {branch.branch}
                          </Typography>
                        </div>
                      </MenuItem>
                    ))}
                  </Select>
                }
                control={control}
                name="branchId"
                defaultValue=""
                fullWidth={true}
              />
            </FormControl>
            <Controller
              as={TextField}
              name="table"
              control={control}
              defaultValue=""
              label="รหัสโต๊ะ"
              variant="outlined"
              rules={{
                required: 'กรุณาใส่รหัสโต๊ะ',
              }}
              error={errors.table && true}
              helperText={errors.table?.message}
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
              เพิ่มโต๊ะ
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
      </div>
    </React.Fragment>
  );
};

export default CreateTable;
