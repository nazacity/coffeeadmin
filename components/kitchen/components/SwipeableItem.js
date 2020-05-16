import React from 'react';
import {
  SwipeableListItem,
  ActionAnimations,
} from '@sandstreamdev/react-swipeable-list';

// MUI
import Avatar from '@material-ui/core/Avatar';
import CardActionArea from '@material-ui/core/CardActionArea';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

// Firebase
import { db } from '../../../firebase';

const SwipeableItem = ({ item }) => {
  const theme = useTheme();
  const matchesLGDown = useMediaQuery('(max-width:1300px)');
  const matchesMDDown = useMediaQuery('(max-width:1200px)');
  const matchesSMDown = useMediaQuery('(max-width:600px)');
  return (
    <SwipeableListItem
      swipeLeft={{
        content: (
          <div
            style={{
              backgroundColor: '#66bb6a',
              width: '100%',
              height: '100%',
              display: 'flex',
              justifyContent: 'flex-end',
            }}
          >
            <ListItemIcon
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'center',
                paddingRight: matchesSMDown
                  ? '2%'
                  : matchesMDDown
                  ? '4%'
                  : matchesLGDown
                  ? '4.5%'
                  : '5%',
              }}
            >
              <CheckBoxIcon style={{ color: '#fff' }} />
            </ListItemIcon>
          </div>
        ),
        action: () => console.log('test'),
        actionAnimation: ActionAnimations.REMOVE,
      }}
    >
      <CardActionArea
        style={{
          display: 'flex',
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
    </SwipeableListItem>
  );
};

export default SwipeableItem;
