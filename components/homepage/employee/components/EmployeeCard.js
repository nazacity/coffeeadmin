import React, { useState, useEffect } from 'react';

// Apollo
import { useQuery } from '@apollo/react-hooks';
import { QUERY_EMPLOYEE } from '../../../../apollo/query';

// Component
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({}));

const EmployeeCard = () => {
  const { data, loading, error } = useQuery(QUERY_EMPLOYEE);
  const classes = useStyles();
  const [state, setState] = useState(data);

  useEffect(() => {
    setState(data?.employee);
  }, [loading]);

  return (
    <Card style={{ padding: '2vh' }}>
      {state?.user && (
        <CardActionArea
          style={{ display: 'flex', justifyContent: 'flex-start' }}
        >
          <Avatar
            src={state.user.pictureUrl}
            alt={state.user.firstName}
            style={{ width: '80px', height: '80px', marginRight: '2vw' }}
          />
          <div>
            <Typography>
              {state.user.firstName} {state.user.lastName}
            </Typography>
            <Typography>{state.user.phone}</Typography>
          </div>
        </CardActionArea>
      )}
    </Card>
  );
};

export default EmployeeCard;
