import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';

// Apollo
import { useMutation } from '@apollo/react-hooks';
import { MUTATION_UPDATEPLACE_CREATETABLE } from '../../apollo/mutation';

// Redux
import { useDispatch } from 'react-redux';
import { updateBranch } from '../../redux/actions/storeActions';

// Mui
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { makeStyles } from '@material-ui/core/styles';
import CardHeader from '@material-ui/core/CardHeader';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Avatar from '@material-ui/core/Avatar';

// Components
import CheckBillForm from './CheckBillForm';

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
  adult: 0,
  children: 0,
  package: 0,
};

const number = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const EditTableState = ({
  table,
  handleClose,
  setRerender,
  setBillDisplayOpen,
}) => {
  const matches600down = useMediaQuery('(max-width:600px)');
  const { control, handleSubmit, reset, errors } = useForm();
  const action = useDispatch();
  const [state, setState] = useState(0);

  const classes = useStyles();
  const [updatePlaceAndCreateTable, { loading, error }] = useMutation(
    MUTATION_UPDATEPLACE_CREATETABLE,
    {
      onCompleted: (data) => {
        action(updateBranch(data.updatePlaceAndCreateTable));
        reset(defaultValues);
        handleClose();
        setRerender(true);
        setRerender(false);
      },
    }
  );

  const onSubmit = async (data) => {
    await updatePlaceAndCreateTable({
      variables: {
        placeId: table.id,
        adult: data.adult,
        children: data.children,
        package: data.package,
      },
    });
  };
  if (table.state === 'Open') {
    return (
      <div style={{ padding: '2vh' }}>
        <Typography variant="h6" align="center">
          เปิดโต๊ะ {table.table}
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
              <FormControl
                variant="outlined"
                style={{
                  width: '100%',
                  marginRight: matches600down ? 0 : '2vh',
                  marginBottom: '2vh',
                }}
              >
                <InputLabel id="demo-simple-select-outlined-label">
                  ผู้ใหญ่
                </InputLabel>
                <Controller
                  as={
                    <Select label="ผู้ใหญ่">
                      {number.map((value) => (
                        <MenuItem key={value} value={value}>
                          <div style={{ display: 'flex', alignItem: 'center' }}>
                            <Typography style={{ margin: 'auto' }}>
                              {value}
                            </Typography>
                          </div>
                        </MenuItem>
                      ))}
                    </Select>
                  }
                  control={control}
                  name="adult"
                  defaultValue={0}
                />
              </FormControl>
              <FormControl
                variant="outlined"
                style={{
                  width: '100%',
                  marginRight: matches600down ? 0 : '2vh',
                }}
              >
                <InputLabel id="demo-simple-select-outlined-label">
                  เด็ก
                </InputLabel>
                <Controller
                  as={
                    <Select label="เด็ก">
                      {number.map((value) => (
                        <MenuItem key={value} value={value}>
                          <div style={{ display: 'flex', alignItem: 'center' }}>
                            <Typography style={{ margin: 'auto' }}>
                              {value}
                            </Typography>
                          </div>
                        </MenuItem>
                      ))}
                    </Select>
                  }
                  control={control}
                  name="children"
                  defaultValue={0}
                />
              </FormControl>
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
              เปิดโต๊ะ
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
      </div>
    );
  }
  return (
    <React.Fragment>
      <CardActionArea>
        <CardHeader
          avatar={
            <Avatar
              aria-label="recipe"
              style={{
                width: 60,
                height: 60,
                margin: 'auto',
                backgroundColor: '#fff',
                color: 'black',
              }}
            >
              {table.table}
            </Avatar>
          }
          style={{
            backgroundColor:
              table.state === 'Open'
                ? 'green'
                : table.state === 'Close'
                ? 'red'
                : table.state === 'Wait' && 'orange',
            color: 'white',
          }}
          title={table.status}
        />
      </CardActionArea>
      {state === 0 ? (
        <CardActions style={{ display: 'flex', flexDirection: 'column' }}>
          {table.state === 'Close' && (
            <Button
              variant="contained"
              color="primary"
              style={{ margin: 'auto', marginBottom: '2vh', width: '80%' }}
              //สั่งเช็คบิล ปิด editstatedialog เปิดfullscreendialog แบบใบเสร็จ
              classes={{ root: classes.buttonRoot, disabled: classes.disabled }}
              onClick={() => setState(1)}
            >
              เช็คบิล
            </Button>
          )}
          {table.state === 'Wait' && (
            <React.Fragment>
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
                  setBillDisplayOpen(true);
                  handleClose();
                }}
              >
                ใบเสร็จ
              </Button>
            </React.Fragment>
          )}

          <Button
            type="button"
            onClick={handleClose}
            variant="outlined"
            color="primary"
            style={{ margin: 'auto', marginBottom: '2vh', width: '80%' }}
          >
            ยกเลิก
          </Button>
        </CardActions>
      ) : (
        <CheckBillForm
          table={table}
          setState={setState}
          handleClose={handleClose}
          setRerender={setRerender}
        />
      )}
    </React.Fragment>
  );
};

export default EditTableState;
