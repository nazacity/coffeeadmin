import React from 'react';

// MUI
import { useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import Divider from '@material-ui/core/Divider';

const Detail = () => {
  const theme = useTheme();
  return (
    <Card style={{ boxShadow: theme.common.shadow.main1 }}>
      <div
        style={{
          padding: '2vh',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '3fr 1fr 0.2fr',
          }}
        >
          <div>
            <Typography>ยอดรวม</Typography>
            <Typography>ส่วนลด</Typography>
            <Typography>คงเหลือ</Typography>
            <Typography>ค่าบริการ</Typography>
            <Typography>คงเหลือ</Typography>
            <Typography>ค่า VAT</Typography>
            <Typography>คงเหลือ</Typography>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-end',
              marginRight: '2vw',
            }}
          >
            <Typography>1300.00</Typography>
            <Typography>0.00</Typography>
            <Typography>1300.00</Typography>
            <Typography>0.00</Typography>
            <Typography>1300.00</Typography>
            <Typography>{(1300 - (1300 * 100) / 107).toFixed(2)}</Typography>
            <Typography>{((1300 * 100) / 107).toFixed(2)}</Typography>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
            }}
          >
            <Typography>THB</Typography>
            <Typography>THB</Typography>
            <Typography>THB</Typography>
            <Typography>THB</Typography>
            <Typography>THB</Typography>
            <Typography>THB</Typography>
            <Typography>THB</Typography>
          </div>
        </div>
        <Divider
          variant="middle"
          style={{ width: '80%', margin: '2vh auto' }}
        />
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '3fr 1fr 0.2fr',
          }}
        >
          <div>
            <Typography>ส่วนลดท้ายบิล</Typography>
            <Typography>เศษ</Typography>
            <Typography>คงเหลือ</Typography>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-end',
              marginRight: '2vw',
            }}
          >
            <Typography>0.00</Typography>
            <Typography>4.95</Typography>
            <Typography>1210.00</Typography>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
            }}
          >
            <Typography>THB</Typography>
            <Typography>THB</Typography>
            <Typography>THB</Typography>
          </div>
        </div>
        <Divider
          variant="middle"
          style={{ width: '80%', margin: '2vh auto' }}
        />
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '3fr 1fr 0.2fr',
          }}
        >
          <div>
            <Typography>ส่วนลดท้ายบิล</Typography>
            <Typography>เศษ</Typography>
            <Typography>คงเหลือ</Typography>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-end',
              marginRight: '2vw',
            }}
          >
            <Typography>0.00</Typography>
            <Typography>4.95</Typography>
            <Typography>1210.00</Typography>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
            }}
          >
            <Typography>THB</Typography>
            <Typography>THB</Typography>
            <Typography>THB</Typography>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default Detail;
