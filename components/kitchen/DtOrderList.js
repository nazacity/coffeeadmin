import React from 'react';
import _ from 'lodash';
import 'moment/locale/th';
import moment from 'moment';
import { SwipeableList } from '@sandstreamdev/react-swipeable-list';
import SwipeableItem from './components/SwipeableItem';
import OrderAction from './components/OrderAction';

moment.locale('th');

// MUI
import { useTheme } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';

const DtOrderList = ({ order }) => {
  const theme = useTheme();
  return (
    <Card
      key={order.id}
      style={{
        margin: '1vh',
        display: 'flex',
        padding: '1vh',
      }}
    >
      <Card style={{ marginRight: '1vh', padding: '1vh' }}>
        <Avatar
          src={order.user.pictureUrl}
          alt={order.user.name}
          style={{
            margin: 'auto',
            boxShadow: theme.common.shadow.black,
            width: 80,
            height: 80,
          }}
        />
        <Typography variant="h6" align="center">
          {order.user.firstName}
        </Typography>
        <Typography align="center">{order.user.phone}</Typography>
        <Typography align="center">
          {moment(+order.createdAt).format('DD/MMM/YYYY HH:mm')}
        </Typography>
      </Card>
      <div style={{ flexGrow: 1 }}>
        <Card>
          <SwipeableList threshold={0.5}>
            {order?.items?.map((item) => (
              <SwipeableItem item={item} key={item.id} order={order} />
            ))}
          </SwipeableList>
        </Card>
        <OrderAction order={order} />
      </div>
    </Card>
  );
};

export default DtOrderList;
