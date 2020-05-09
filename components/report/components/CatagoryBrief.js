import React from 'react';

// MUI
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import Divider from '@material-ui/core/Divider';
import WeekChart from './WeekChart';

const DailyBrief = () => {
  return (
    <Card>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '0.6fr 0.2fr 1.2fr',
          padding: '2vw',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Typography>ยอดขาย</Typography>
          <Typography>2500.00</Typography>
        </div>
        <Divider orientation="vertical" />
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div>
            <Typography>จำนวนบิล</Typography>
            <Typography>เงินสด</Typography>
            <Typography>เครดิต</Typography>
          </div>
          <div
            style={{
              paddingRight: '2vw',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-end',
            }}
          >
            <Typography>10</Typography>
            <Typography>2000.00</Typography>
            <Typography>500.00</Typography>
          </div>
          <div style={{ paddingRight: '2vw' }}>
            <Typography>ใบ</Typography>
            <Typography>THB</Typography>
            <Typography>THB</Typography>
          </div>
        </div>
      </div>
      <Divider variant="middle" style={{ width: '80%', margin: 'auto' }} />
      <WeekChart />
    </Card>
  );
};

export default DailyBrief;
