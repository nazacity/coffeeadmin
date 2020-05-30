import React, { useState } from 'react';

// MUI
import Paper from '@material-ui/core/Paper';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Icon from '@material-ui/core/Icon';

// Components
import DatePicker from './components/DatePicker';
import Detail from './components/Detail';
import OrderTable from './components/OrderTable';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

const Report = () => {
  const [index, setIndex] = useState(0);
  const theme = useTheme();
  const matches1024down = useMediaQuery('(max-width:1024px)');
  const classes = useStyles();
  const handleChange = (event, newValue) => {
    setIndex(newValue);
  };
  return (
    <React.Fragment>
      <Paper square className={classes.root}>
        <Tabs
          value={index}
          onChange={handleChange}
          variant="fullWidth"
          indicatorColor="secondary"
          textColor="secondary"
          aria-label="icon label tabs example"
        >
          <Tab
            icon={<Icon className="fas fa-file-medical-alt" />}
            label="รายงาน"
          />
          <Tab
            icon={<Icon className="fas fa-list-ul" fontSize="small" />}
            label="ใบเสร็จ"
          />
        </Tabs>
      </Paper>
      {index === 0 && (
        <div
          style={{
            maxWidth: theme.layer.maxWidth,
            width: matches1024down ? '100%' : '80%',
            margin: 'auto',
          }}
        >
          <DatePicker />
          <div
            style={{
              marginTop: '2vh',
            }}
          >
            <Detail />
          </div>
        </div>
      )}
      {index === 1 && (
        <div
          style={{
            maxWidth: theme.layer.maxWidth,
            width: matches1024down ? '100%' : '80%',
            margin: 'auto',
          }}
        >
          <DatePicker />
          <div
            style={{
              marginTop: '2vh',
            }}
          >
            <OrderTable />
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default Report;
