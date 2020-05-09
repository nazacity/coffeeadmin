import React from 'react';

// MUI
import { makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Badge from '@material-ui/core/Badge';
import Tooltip from '@material-ui/core/Tooltip';

// Components
import MotionSlider from '../../homepage/admin/motionslider';

const useStyles = makeStyles((theme) => ({
  media: {
    height: 140,
  },
  statLabel: {
    fontSize: 18,
    color: '#a0a0a0',
    fontWeight: 'bold',
    margin: 0,
  },
  statValue: {
    fontSize: 14,
    marginBottom: 4,
    letterSpacing: '1px',
  },
  BadgeColor: {
    backgroundColor: '#e53935',
  },
  topLeft10: {
    top: '10%',
    left: '10%',
    transform: 'scale(1.3) translate(-50%, -50%)',
  },
}));

const ProductSaleData = [
  {
    id: '5eac57a18d396b1ba0dd0b71',
    name: 'อเมริกาโน่ร้อน',
    pictureUrl:
      'https://drive.google.com/uc?id=1LKpBqxy9dFsGqOXycIVIUh3ozWIv2w-F',
    quantity: 10,
  },
  {
    id: '5eac58538d396b1ba0dd0b7a',
    name: 'แซนวิท2',
    pictureUrl:
      'https://drive.google.com/uc?id=1yZ0YYgKaYF-vN9L6ISGt56KkeuoGHH-a',
    quantity: 12,
  },
  {
    id: '5eac58a28d396b1ba0dd0b7f',
    name: 'เค้ก2',
    pictureUrl:
      'https://drive.google.com/uc?id=108RXwxklmEB9pJzfjX5wROuyR_gR-b4N',
    quantity: 8,
  },
  {
    id: '5eac57c78d396b1ba0dd0b72',
    name: 'เอสเพสโซ่ร้อน',
    pictureUrl:
      'https://drive.google.com/uc?id=18rm7H254wL6ITMP5gLBVdGbpcQj85Bg1',
    quantity: 9,
  },
  {
    id: '5eac587e8d396b1ba0dd0b7d',
    name: 'สเต็ก2',
    pictureUrl:
      'https://drive.google.com/uc?id=14NLlG4a_mgPul6Eyz5n04N4FjnMJ4j1g',
    quantity: 6,
  },
  {
    id: '5eac58618d396b1ba0dd0b7b',
    name: 'พายแซนวิท',
    pictureUrl:
      'https://drive.google.com/uc?id=1t6lqXeh_m3853RbS0Pz2olCCqdBpnug6',
    quantity: 3,
  },
];

const ProductSale = () => {
  const classes = useStyles();
  const matches450down = useMediaQuery('(max-width:450px)');
  return (
    <Card>
      <CardContent>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Typography>ยอดขายสินค้า</Typography>
        </div>
      </CardContent>
      <div>
        <MotionSlider
          padding={30}
          gap={30}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
          }}
          allowSlideToLast
        >
          {ProductSaleData.map((product) => (
            <div key={product.id}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <Badge
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  color="primary"
                  badgeContent={product.quantity}
                  max={999}
                  classes={{
                    colorPrimary: classes.BadgeColor,
                    anchorOriginTopLeftRectangle: classes.topLeft10,
                  }}
                >
                  <Avatar
                    src={product.pictureUrl}
                    style={{
                      height: matches450down ? '100px' : '150px',
                      width: matches450down ? '100px' : '150px',
                    }}
                  />
                </Badge>
              </div>
            </div>
          ))}
        </MotionSlider>
      </div>
    </Card>
  );
};

export default ProductSale;
