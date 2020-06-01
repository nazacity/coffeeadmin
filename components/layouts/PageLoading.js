import React from 'react';

// MUI
import { useTheme } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Avatar, Typography } from '@material-ui/core';

const PageLoading = ({ title }) => {
  const theme = useTheme();

  return (
    <div
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%,-50%)',
      }}
    >
      <Avatar
        src="./images/logo/logo.jpg"
        alt="logo"
        style={{ width: 200, height: 200, margin: 'auto' }}
      />
      <Typography
        align="center"
        color="primary"
        variant="h6"
        style={{ letterSpacing: 2, marginBottom: '2vh' }}
      >
        {title}
      </Typography>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <CircularProgress
          variant="determinate"
          value={100}
          style={{
            color: theme.palette.primary.dark,
            position: 'absolute',
          }}
          size={60}
          thickness={4}
        />
        <CircularProgress
          variant="indeterminate"
          disableShrink
          style={{
            color: theme.palette.primary.light,
            animationDuration: '550ms',
          }}
          size={60}
          thickness={4}
        />
      </div>
    </div>
  );
};

export default PageLoading;
