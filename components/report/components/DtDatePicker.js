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
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const DtDatePicker = () => {
  const theme = useTheme();
  const startDate = useSelector((state) => state.reportDate.startDate);
  const endDate = useSelector((state) => state.reportDate.endDate);
  const action = useDispatch();
  return (
    <Card
      style={{
        display: 'flex',
        alignitems: 'center',
        justifyContent: 'space-around',
        margin: '2vh auto',
        maxWidth: theme.layer.maxWidth,
        padding: '1vh',
      }}
    >
      <MuiPickersUtilsProvider utils={MomentUtils} locale="th">
        <KeyboardDatePicker
          placeholder="2018/10/10"
          value={startDate}
          onChange={(date) => {
            action(setStartDate(parseFloat(date.add(1, 'day').format('x'))));
          }}
          format="DD/MMM/YYYY"
        />
        <Typography style={{ margin: '1vw' }}>ถึง</Typography>
        <KeyboardDatePicker
          placeholder="2018/10/10"
          value={endDate}
          onChange={(date) => action(setEndDate(parseFloat(date.format('x'))))}
          format="DD/MMM/YYYY"
        />
      </MuiPickersUtilsProvider>
      <div>
        <Button variant="outlined" color="primary">
          ค้นหา
        </Button>
      </div>
    </Card>
  );
};

export default DtDatePicker;
