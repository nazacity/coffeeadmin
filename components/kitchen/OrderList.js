import React from 'react';
import _ from 'lodash';
import 'moment/locale/th';
import moment from 'moment';
import { SwipeableList } from '@sandstreamdev/react-swipeable-list';
import SwipeableItem from './components/SwipeableItem';
//import OrderAction from './components/OrderAction';

moment.locale('th');

// MUI
import { useTheme } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';

const OrderList = ({ order, branchId }) => {
  const theme = useTheme();
  return (
    <Card
      key={order.id}
      style={{
        margin: '3vh 1vh',
        display: 'flex',
        padding: '1vh',
      }}
    >
      <div
        style={{
          marginRight: '1vh',
          padding: '1vh',
        }}
      >
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
        <div style={{ margin: '1vh 0' }}>
          <Typography variant="h6" color="primary">
            {order.user.pictureUrl ? 'คุณ' : 'โต๊ะ'} {order.user.firstName}
          </Typography>
          <Typography variant="body1" color="primary">
            {order.user.phone}
          </Typography>
          <Typography variant="body2" color="primary">
            วันที่ {moment(+order.createdAt).format('DD MMM YY')}
          </Typography>
          <Typography variant="body2" color="primary">
            เวลา {moment(+order.createdAt).format('HH:mm')}
          </Typography>
        </div>
      </div>
      <div style={{ flexGrow: 1 }}>
        <div
          style={{
            marginRight: '1vh',
          }}
        >
          <SwipeableList threshold={0.5}>
            {order?.items?.map((item) => (
              <SwipeableItem
                item={item}
                key={item.id}
                order={order}
                branchId={branchId}
              />
            ))}
          </SwipeableList>
        </div>
        <div style={{ margin: '1vh auto' }}>
          <Typography align="center" variant="body2" style={{ color: 'green' }}>
            *เลื่อนไปด้านซ้ายเมื่อเมนูเรียบร้อย
          </Typography>
          <Typography align="center" variant="body2" style={{ color: 'red' }}>
            *เลื่อนไปด้านขวาเพื่อยกเลิกเมนู
          </Typography>
        </div>
      </div>
    </Card>
  );
};

export default OrderList;
