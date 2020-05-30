import React, { useState, useEffect } from 'react';
import moment from 'moment';

// Apollo
import { useMutation } from '@apollo/react-hooks';
import { MUTATION_SALESTOREPRODUCT } from '../../../apollo/mutation';

// MUI
import { makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useTheme } from '@material-ui/core/styles';

// Components
import MotionSlider from '../../homepage/admin/motionslider';

// Redux
import { useSelector } from 'react-redux';

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

const ProductSale = ({ branchId }) => {
  const classes = useStyles();
  const theme = useTheme();
  const matches450down = useMediaQuery('(max-width:450px)');
  const matches600down = useMediaQuery('(max-width:600px)');
  const matches1024down = useMediaQuery('(max-width:1024px)');
  const startDate = useSelector((state) => state.reportDate.startDate);
  const endDate = useSelector((state) => state.reportDate.endDate);
  const catalogs = useSelector((state) => state.products.storeProductCatalogs);
  const [storeProductSaleData, setStoreProductSaleData] = useState([]);

  const [saleStoreProduct, { loading }] = useMutation(
    MUTATION_SALESTOREPRODUCT,
    {
      onCompleted: (data) => {
        setStoreProductSaleData(data.saleStoreProduct);
      },
    }
  );

  useEffect(() => {
    saleStoreProduct({ variables: { startDate, endDate, branchId } });
  }, [startDate, endDate]);

  return (
    <React.Fragment>
      <div
        style={{
          boxShadow: matches1024down ? undefined : theme.common.shadow.black,
          margin: '2vh 0',
        }}
      >
        <CardContent>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Typography>ยอดขายสินค้าในร้าน</Typography>
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
            storeProductSaleData &&
            catalogs.map((catalog) => {
              let filterByCatalog = storeProductSaleData.filter(
                (product) => product.catalog.id === catalog.id
              );
              return (
                <MotionSlider
                  padding={30}
                  gap={30}
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%',
                  }}
                  key={catalog.id}
                >
                  {filterByCatalog.map((product) => (
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
                          classes={{
                            colorPrimary: classes.BadgeColor,
                            anchorOriginTopLeftRectangle: classes.topLeft10,
                          }}
                        >
                          <div
                            style={{
                              background: `url(${product.pictureUrl})`,
                              backgroundSize: 'cover',
                              height: matches450down ? '100px' : '150px',
                              width: matches450down ? '100px' : '150px',
                              borderRadius: '50%',
                            }}
                          />
                        </Badge>
                      </div>
                      <Typography align="center" color="secondary">
                        {product.name}
                      </Typography>
                    </div>
                  ))}
                </MotionSlider>
              );
            })
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default ProductSale;
