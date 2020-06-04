import React, { useState, useEffect } from 'react';

// Apollo
import { useQuery } from '@apollo/react-hooks';
import { QUERY_EMPLOYEE } from '../../../../apollo/query';

// Redux
import { useSelector } from 'react-redux';

// Component
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import CallIcon from '@material-ui/icons/Call';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SpaIcon from '@material-ui/icons/Spa';

const useStyles = makeStyles((theme) => ({}));

const EmployeeCard = () => {
  const user = useSelector((state) => state.user);

  return (
    <div style={{ padding: '2vh' }}>
      {user && (
        <CardActionArea
          style={{ display: 'flex', justifyContent: 'flex-start' }}
        >
          <img
            src={user.pictureUrl}
            alt={user.firstName}
            style={{
              width: '200px',
              height: '200px',
              marginRight: '2vw',
              borderRadius: '00px 50px 0px 50px',
            }}
          />
          <div>
            <Typography
              style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '2vh',
              }}
            >
              <AccountCircleIcon color="primary" /> {user.firstName}{' '}
              {user.lastName}
            </Typography>
            <Typography
              style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '2vh',
              }}
            >
              <CallIcon color="primary" /> {user.phone}
            </Typography>
            <Typography
              style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '2vh',
              }}
            >
              <SpaIcon color="primary" /> {user.employee.position}
            </Typography>
          </div>
        </CardActionArea>
      )}
    </div>
  );
};

export default EmployeeCard;
