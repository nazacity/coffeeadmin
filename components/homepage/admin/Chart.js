import React from 'react';
import moment from 'moment';

// Apollo
import { useQuery } from '@apollo/react-hooks';
import { QUERY_BESTSALEMONTHLY } from '../../../apollo/query';

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
import CircularProgress from '@material-ui/core/CircularProgress';

// Chartjs
import { Line } from 'react-chartjs-2';

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
  top: {
    color: theme.palette.primary.dark,
    position: 'absolute',
  },
  bottom: {
    color: theme.palette.primary.light,
    animationDuration: '550ms',
  },
}));

const dashboardNASDAQChart = {
  data: {
    labels: [
      'ม.ค.',
      'ก.พ.',
      'มี.ค.',
      'เม.ษ.',
      'พ.ค.',
      'มิ.ย.',
      'ก.ค.',
      'ส.ค.',
      'ก.ย.',
      'ต.ค.',
      'พ.ย.',
      'ธ.ค.',
    ],
    datasets: [
      {
        data: [
          32000,
          45000,
          38000,
          41000,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
        ],
        fill: false,
        borderColor: '#fbc658',
        backgroundColor: 'transparent',
        pointBorderColor: '#fbc658',
        pointRadius: 1,
        pointHoverRadius: 2,
        pointBorderWidth: 8,
        label: 'รายได้',
      },
    ],
  },
  options: {
    legend: {
      display: false,
      position: 'top',
    },
  },
};

const Chart = () => {
  const matches450down = useMediaQuery('(max-width:450px)');
  const matches600down = useMediaQuery('(max-width:600px)');
  const matches840down = useMediaQuery('(max-width:840px)');
  const classes = useStyles();
  const { data, loading, error } = useQuery(QUERY_BESTSALEMONTHLY, {
    variables: {
      year: moment(new Date()).get('year'),
      month: moment(new Date()).get('month') + 1,
    },
  });

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
            <Typography>สินค้าขายดีประจำเดือน</Typography>
          </div>
        </CardContent>
        <div>
          {loading ? (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                padding: '2vh',
              }}
            >
              <CircularProgress
                variant="determinate"
                value={100}
                className={classes.top}
                size={matches600down ? 60 : 120}
                thickness={4}
              />
              <CircularProgress
                variant="indeterminate"
                disableShrink
                className={classes.bottom}
                size={matches600down ? 60 : 120}
                thickness={4}
              />
            </div>
          ) : (
            data && (
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
                {data?.bestSaleMonthly.map((product) => (
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
                        badgeContent={product.totalSales}
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
            )
          )}
        </div>
      </Card>
    </div>
  );
};

export default Chart;
