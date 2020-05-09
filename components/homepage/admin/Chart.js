import React from 'react';

// MUI
import { makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Badge from '@material-ui/core/Badge';
import Tooltip from '@material-ui/core/Tooltip';

// Chartjs
import { Line } from 'react-chartjs-2';
import { dashboardNASDAQChart } from './variablecharts';

// Components
import MotionSlider from './motionslider';

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

const Chart = () => {
  const matches450down = useMediaQuery('(max-width:450px)');
  const matches840down = useMediaQuery('(max-width:840px)');
  const classes = useStyles();
  const bestSaleProduct = [
    {
      id: '5eac57a18d396b1ba0dd0b71',
      name: 'อเมริกาโน่ร้อน',
      pictureUrl:
        'https://drive.google.com/uc?id=1LKpBqxy9dFsGqOXycIVIUh3ozWIv2w-F',
      quantity: 300,
    },
    {
      id: '5eac58538d396b1ba0dd0b7a',
      name: 'แซนวิท2',
      pictureUrl:
        'https://drive.google.com/uc?id=1yZ0YYgKaYF-vN9L6ISGt56KkeuoGHH-a',
      quantity: 120,
    },
    {
      id: '5eac58a28d396b1ba0dd0b7f',
      name: 'เค้ก2',
      pictureUrl:
        'https://drive.google.com/uc?id=108RXwxklmEB9pJzfjX5wROuyR_gR-b4N',
      quantity: 107,
    },
    {
      id: '5eac587e8d396b1ba0dd0b7d',
      name: 'สเต็ก2',
      pictureUrl:
        'https://drive.google.com/uc?id=14NLlG4a_mgPul6Eyz5n04N4FjnMJ4j1g',
      quantity: 70,
    },
    {
      id: '5eac58618d396b1ba0dd0b7b',
      name: 'พายแซนวิท',
      pictureUrl:
        'https://drive.google.com/uc?id=1t6lqXeh_m3853RbS0Pz2olCCqdBpnug6',
      quantity: 45,
    },
  ];
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: matches840down ? '1fr' : '1fr 1fr',
        gridGap: '2vw',
        padding: '2vw',
      }}
    >
      <Card>
        <CardContent>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Typography>รายได้ประจำเดือน</Typography>
          </div>
        </CardContent>
        <CardActionArea style={{ padding: '2vw' }}>
          <Line
            data={dashboardNASDAQChart.data}
            options={dashboardNASDAQChart.options}
            width={400}
            height={200}
          />
        </CardActionArea>
      </Card>
      <Card>
        <CardContent>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Typography>สินค้าขายดี</Typography>
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
            {bestSaleProduct.map((product) => (
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
                    <Tooltip title={product.name} placement="bottom">
                      <Avatar
                        src={product.pictureUrl}
                        style={{
                          height: matches450down ? '100px' : '150px',
                          width: matches450down ? '100px' : '150px',
                        }}
                      />
                    </Tooltip>
                  </Badge>
                </div>
              </div>
            ))}
          </MotionSlider>
        </div>
      </Card>
    </div>
  );
};

export default Chart;
