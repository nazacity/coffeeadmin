import React from 'react';

// MUI
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '1vh auto',
    maxWidth: '300px',
    width: '100%',
    minWidth: '250px',
  },
  productAvatar: {
    width: '100px',
    height: '100px',
    margin: '1vh',
    boxShadow: theme.common.shadow.black,
  },
}));

const PromotionItemList = ({
  promotion: { pictureUrl, title, detail, products, price },
}) => {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom align="center" variant="h5" component="h2">
            {title}
          </Typography>
        </CardContent>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          {products.map((product) => (
            <Avatar
              key={product.id}
              src={product.pictureUrl}
              className={classes.productAvatar}
            />
          ))}
        </div>
        <CardContent>
          <Typography
            variant="body2"
            color="textSecondary"
            align="center"
            component="p"
          >
            {detail}
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            align="center"
            component="p"
          >
            {price}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions style={{ justifyContent: 'center' }}>
        <Button size="large" variant="outlined" color="primary">
          แชร์
        </Button>
        <Button size="large" variant="outlined" color="secondary">
          เพิ่มเติม
        </Button>
      </CardActions>
    </Card>
  );
};

export default PromotionItemList;
