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
  branchId: '',
  table: '',
};

const CreateTable = () => {
  const matches600down = useMediaQuery('(max-width:600px)');
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
      console.log(error.message);
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
                style={{ width: '100%' }}
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
      </Card>
    </div>
  );
};

export default CreateTable;
