import React from 'react';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import {
  setStartDate,
  setEndDate,
} from '../../../redux/actions/reportDateAction';

// MUI DATE PICKER
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { KeyboardDatePicker } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import 'moment/locale/th';
import moment from 'moment';

moment.locale('th');

// MUI
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const MbDatePicker = () => {
  const theme = useTheme();
  const matches450down = useMediaQuery('(max-width:450px)');
  const startDate = useSelector((state) => state.reportDate.startDate);
  const endDate = useSelector((state) => state.reportDate.endDate);
  const action = useDispatch();
  return (
    <React.Fragment>
      <Card
        style={{
          padding: '1vh 1vw',
          margin: '1vw',
          display: 'flex',
          flexDirection: matches450down ? 'column' : 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            display: 'flex',
            padding: '1.5vw',
            alignItems: 'center',
            justifyContent: 'space-around',
          }}
        >
          <MuiPickersUtilsProvider utils={MomentUtils} locale="th">
            <KeyboardDatePicker
              placeholder="10/10/2020"
              value={startDate}
              onChange={(date) => {
                action(setStartDate(parseFloat(date.format('x'))));
              }}
              format="DD/MMM/YY"
            />
            <Typography style={{ margin: '1vw' }}>ถึง</Typography>
            <KeyboardDatePicker
              placeholder="10/10/2020"
              value={endDate}
              onChange={(date) =>
                action(setEndDate(parseFloat(date.format('x'))))
              }
              format="DD/MMM/YY"
            />
          </MuiPickersUtilsProvider>
        </div>
        <div style={{ margin: '2vw' }}>
          <Button variant="outlined" color="primary">
            ค้นหา
          </Button>
        </div>
      </Card>
    </React.Fragment>
  );
};

export default MbDatePicker;
