import React from 'react';
import {
  SwipeableListItem,
  ActionAnimations,
} from '@sandstreamdev/react-swipeable-list';

// Apollo
import { useMutation } from '@apollo/react-hooks';
import {
  MUTATION_CANCEL_ORDERITEM_BY_ID,
  MUTATION_DONE_ORDERITEM_BY_ID,
} from '../../../apollo/mutation';

// MUI
import Avatar from '@material-ui/core/Avatar';
import CardActionArea from '@material-ui/core/CardActionArea';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import CancelIcon from '@material-ui/icons/Cancel';
import CircularProgress from '@material-ui/core/CircularProgress';

// Firebase
import { firestore } from '../../../firebase';

// Toast
import { useToasts } from 'react-toast-notifications';

const useStyles = makeStyles((theme) => ({
  top: {
    color: theme.palette.primary.dark,
  },
  bottom: {
    color: theme.palette.primary.light,
    animationDuration: '550ms',
    position: 'absolute',
    left: 0,
  },
}));

const FoodItem = ({ item }) => {
  return (
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
          backgroundColor: '#fff',
          width: 40,
          height: 40,
        }}
      />
      <Typography variant="body1" color="primary">
        {item.product.name}
      </Typography>
      <Typography variant="body1" color="primary">
        {item.quantity}
      </Typography>
    </CardActionArea>
  );
};

export default FoodItem;
