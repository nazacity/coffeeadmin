import React from 'react';

// MUI
import CardActionArea from '@material-ui/core/CardActionArea';

// Chartjs
import { HorizontalBar } from 'react-chartjs-2';

// Moment
import moment from 'moment';

const am = new Date().setHours(0, 0, 0, 0);
const pm = new Date().setHours(14, 0, 0, 0);

const data = {
  labels: ['FOOD', 'DRINK', 'SWEET'],
  datasets: [
    {
      backgroundColor: [
        'rgba(255,99,132,0.6)',
        'rgba(235, 247, 161,0.6)',
        'rgba(156, 234, 246, 0.6)',
      ],
      borderColor: [
        'rgba(255,99,132,1)',
        'rgba(181, 206, 18, 1)',
        'rgba(16, 157, 178, 1)',
      ],
      borderWidth: 1,
      data: [65, 59, 80, 90],
    },
  ],
};

const options = {
  legend: {
    display: false,
    position: 'top',
  },
};

const WeekChart = () => {
  return (
    <CardActionArea style={{ padding: '2vw' }}>
      <HorizontalBar data={data} options={options} width={400} height={200} />
    </CardActionArea>
  );
};

export default WeekChart;
