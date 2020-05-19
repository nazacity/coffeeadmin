import React, { useState } from 'react';

// Mui
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import moment from 'moment';
//import EditStatus from './EditStatus';
import Dialog from '@material-ui/core/Dialog';
import EditTableState from './EditTableState';

const useStyles = makeStyles(({ palette }) => ({
  card: {
    borderRadius: 12,
    minWidth: 250,
    textAlign: 'center',
  },
  avatar: {
    width: 60,
    height: 60,
    margin: 'auto',
    backgroundColor: '#fff',
    color: 'black',
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: '0.5px',
    marginTop: 8,
    marginBottom: 0,
  },
  subheader: {
    fontSize: 14,
    color: palette.grey[500],
    marginBottom: '0.875em',
  },
  statLabel: {
    fontSize: 20,
    fontWeight: 500,
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    margin: 0,
    textAlign: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
    letterSpacing: '1px',
    textAlign: 'center',
  },
  cardfooter: {
    width: '100%',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
  },
  cardtabledetail: {
    width: '100%',
    display: 'grid',
    gridTemplateColumns: '1fr 2fr',
  },
  cardclientdetail: {
    width: '100%',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
  },
}));

const TableItem = ({ table, setRerender }) => {
  const [open, setOpen] = useState(false);
  const handleClickOpen = (e) => {
    setOpen(true);
  };
  const handleClose = (e) => {
    setOpen(false);
  };
  const classes = useStyles();

  return (
    <Card
      style={{
        border: `2px solid ${
          table.state === 'Open'
            ? 'green'
            : table.state === 'Close'
            ? 'red'
            : table.state === 'Wait' && 'orange'
        }`,
        borderRadius: '5px',
      }}
    >
      <CardActionArea onClick={handleClickOpen}>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              {table.table}
            </Avatar>
          }
          style={{
            backgroundColor:
              table.state === 'Open'
                ? 'green'
                : table.state === 'Close'
                ? 'red'
                : table.state === 'Wait' && 'orange',
            color: 'white',
          }}
          title={table.status}
        />
        <CardContent className={classes.cardcontent}>
          <Typography gutterBottom variant="h4" component="h2">
            <Box className={classes.cardclientdetail}>
              <Box p={2} flex={'auto'}>
                <p className={classes.statLabel}>ผู้ใหญ่</p>
                <p className={classes.statValue}>{table.adult}</p>
              </Box>
              <Box p={2} flex={'auto'}>
                <p className={classes.statLabel}>เด็ก</p>
                <p className={classes.statValue}>{table.children}</p>
              </Box>
              <Box p={2} flex={'auto'}>
                <p className={classes.statLabel}>เริ่ม</p>
                <p className={classes.statValue}>{table.startTime}</p>
              </Box>
            </Box>
          </Typography>
        </CardContent>
      </CardActionArea>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="xs"
        fullWidth={true}
      >
        <EditTableState
          table={table}
          handleClose={handleClose}
          setRerender={setRerender}
        />
      </Dialog>
    </Card>
  );
};

export default TableItem;
