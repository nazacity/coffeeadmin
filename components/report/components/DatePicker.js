import React, { useEffect } from 'react';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import {
  setStartDate,
  setEndDate,
} from '../../../redux/actions/reportDateAction';
import { setOrder } from '../../../redux/actions/orderActions';

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
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

// Apollo
import { useMutation } from '@apollo/react-hooks';
import { MUTATION_ORDERS_BYDATE } from '../../../apollo/mutation';

const DatePicker = () => {
  const theme = useTheme();
  const matches450down = useMediaQuery('(max-width:450px)');
  const matches1024down = useMediaQuery('(max-width:1024px)');
  const startDate = useSelector((state) => state.reportDate.startDate);
  const endDate = useSelector((state) => state.reportDate.endDate);
  const action = useDispatch();

  const [ordersByDate, { loading, error }] = useMutation(
    MUTATION_ORDERS_BYDATE,
    {
      onCompleted: (data) => {
        action(setOrder(data.ordersByDate));
      },
    }
  );

  useEffect(() => {
    ordersByDate({
      variables: {
        startDate,
        endDate,
      },
    });
  }, [startDate, endDate]);

  return (
    <React.Fragment>
      <div
        style={{
          padding: '1vh 1vw',
          margin: '1vh 0',
          display: 'flex',
          flexDirection: matches450down ? 'column' : 'row',
          justifyContent: 'center',
          alignItems: 'center',
          boxShadow: matches1024down ? undefined : theme.common.shadow.black,
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
              onChange={(date) => {
                action(
                  setEndDate(
                    parseFloat(
                      date
                        .set({
                          hour: 23,
                          minute: 59,
                          second: 59,
                          millisecond: 59,
                        })
                        .format('x')
                    )
                  )
                );
              }}
              format="DD/MMM/YY"
            />
          </MuiPickersUtilsProvider>
        </div>
      </div>
    </React.Fragment>
  );
};

export default DatePicker;
