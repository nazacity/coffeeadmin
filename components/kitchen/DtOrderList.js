import React from 'react';
import _ from 'lodash';
import 'moment/locale/th';
import moment from 'moment';

moment.locale('th');

// MUI
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import { useTheme } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

// framer motion
import { motion } from 'framer-motion';

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
        <Typography align="center">{order.place.branch}</Typography>
        <Typography align="center">{order.place.table}</Typography>
        <Typography align="center">
          {moment(+order.createdAt).format('DD/MMM/YYYY HH:mm')}
        </Typography>
      </Card>
      <Card style={{ padding: '1vh', flexGrow: 1 }}>
        {order.items.map((item) => (
          <CardActionArea
            key={item.id}
            style={{
              display: 'flex',
              margin: '1vh 0',
              justifyContent: 'space-between',
              padding: '0.5vh',
            }}
          >
            <Avatar
              src={item.product.pictureUrl}
              alt={item.name}
              style={{
                boxShadow: theme.common.shadow.black,
                width: 40,
                height: 40,
              }}
            />
            <Typography>{item.product.name}</Typography>
            <Typography>{item.quantity}</Typography>
          </CardActionArea>
        ))}
      </Card>
    </Card>
  );
};

export default DtOrderList;
