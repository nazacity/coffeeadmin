import React from 'react';
import _ from 'lodash';
import 'moment/locale/th';
import moment from 'moment';
import FoodItem from './components/FoodItem';

moment.locale('th');

// MUI
import { useTheme } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import useMediaQuery from '@material-ui/core/useMediaQuery';

// Firebase
import { firestore } from '../../firebase';

const DeliveryList = ({ order, branchId }) => {
  const theme = useTheme();
  const matches600down = useMediaQuery('max-width:600px');
  return (
    <React.Fragment>
      <div
        key={order.id}
        style={{
          margin: '3vh 1vh',
          display: matches600down ? 'grid' : 'flex',
          gridTemplateColumns: '0.8fr 1fr 0.5fr',
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
            alt={order.user.firstName}
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
            {order?.items?.map((item) => (
              <FoodItem
                item={item}
                key={item.id}
                order={order}
                branchId={branchId}
              />
            ))}
          </div>
        </div>
        <div
          style={{
            margin: '1vh auto',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <a
            href={`https://www.google.co.th/maps/place/${order.user.position.lat},${order.user.position.lng}`}
            style={{ textDecoration: 'none' }}
            target="_blank"
          >
            <Button
              color="primary"
              variant="contained"
              style={{ marginBottom: '1vh' }}
            >
              Google Map
            </Button>
          </a>
          <Button
            color="primary"
            variant="contained"
            style={{ marginBottom: '1vh' }}
            onClick={() => {
              firestore
                .collection(`delivery=${branchId}`)
                .doc(order.key)
                .delete();
            }}
          >
            ส่งเรียบร้อย
          </Button>
        </div>
      </div>
      <Divider fullWidth />
    </React.Fragment>
  );
};

export default DeliveryList;
