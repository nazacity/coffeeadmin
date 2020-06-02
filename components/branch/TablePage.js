import React, { useState } from 'react';

// next
import { useRouter } from 'next/router';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { setBranch } from '../../redux/actions/storeActions';

// MUI
import { useTheme } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Avatar, Typography } from '@material-ui/core';

// Apollo
import { useQuery } from '@apollo/react-hooks';
import { QUERY_BRANCHFROMID } from '../../apollo/query';

// MUI
import useMediaQuery from '@material-ui/core/useMediaQuery';

// Componnet
import TableItem from '../table/TableItem';

const TablePage = ({ setRerender }) => {
  const theme = useTheme();
  const matches600down = useMediaQuery('(max-width:600px)');
  const matches1200down = useMediaQuery('(max-width:1200px)');
  const action = useDispatch();
  const branch = useSelector((state) => state.store.branch[0]);

  const router = useRouter();

  const { data, loading, error } = useQuery(QUERY_BRANCHFROMID, {
    variables: {
      branchId: router.query.branch,
    },
    onCompleted: (data) => {
      action(setBranch([{ ...data.branchFromId }]));
    },
  });

  return (
    <React.Fragment>
      {loading ? (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%,-50%)',
          }}
        >
          <Avatar
            src="https://firebasestorage.googleapis.com/v0/b/coffeecafesho.appspot.com/o/logo%2Flogo.jpg?alt=media"
            alt="logo"
            style={{ width: 200, height: 200, margin: 'auto' }}
          />
          <Typography
            align="center"
            color="primary"
            variant="h6"
            style={{ letterSpacing: 2, marginBottom: '2vh' }}
          >
            กรุณารอสักครู่
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
      ) : (
        <div
          key={router.query.branch}
          style={{
            display: 'grid',
            gridTemplateColumns: matches600down
              ? '1fr 1fr'
              : matches1200down
              ? '1fr 1fr 1fr'
              : '1fr 1fr 1fr 1fr',
            gridGap: '1vh',
            padding: '1vh',
          }}
        >
          {branch?.place &&
            branch.place.map((table) => (
              <TableItem
                key={table.id}
                table={table}
                setRerender={setRerender}
              />
            ))}
        </div>
      )}
    </React.Fragment>
  );
};

export default TablePage;
