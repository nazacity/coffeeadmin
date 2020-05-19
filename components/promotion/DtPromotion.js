import React from 'react';
import { useForm, Controller } from 'react-hook-form';

// Apollo
import { useMutation } from '@apollo/react-hooks';
import { MUTAION_CREATEPROMOTION } from '../../apollo/mutation';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { createPromotions } from '../../redux/actions/promotionActions';

// Mui
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';

// Components
import PromotionItemList from './components/PromotionItemList';
import { Avatar } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  title: {
    fontSize: '1.5em',
    color: theme.common.color.white,
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  logo: {
    width: '300px',
    height: '300px',
    margin: 'auto',
    border: '10px solid #764d24',
  },
  top: {
    color: theme.palette.primary.dark,
  },
  bottom: {
    color: theme.palette.primary.light,
    animationDuration: '550ms',
    position: 'absolute',
    left: 0,
  },
  buttonRoot: {
    '&$disabled': {
      color: theme.palette.primary.light,
      backgroundColor: '#e2e2e2',
    },
  },
  disabled: {},
  userlogo: {
    width: '80px',
    height: '80px',
    margin: 'auto',
    border: '5px solid #764d24',
  },
}));

const defaultValues = {
  title: '',
  detail: '',
  pictureUrl: '',
  products: [],
  price: '',
};

const MbPromotion = () => {
  const theme = useTheme();
  const promotions = useSelector((state) => state.promotions);
  const products = useSelector((state) => state.products.products);
  const { control, handleSubmit, reset, errors } = useForm();
  const action = useDispatch();
  const classes = useStyles();
  const [createPromotion, { loading, error }] = useMutation(
    MUTAION_CREATEPROMOTION,
    {
      onCompleted: (data) => {
        action(createPromotions(data.createPromotion));
        reset(defaultValues);
      },
    }
  );

  const onSubmit = async (data) => {
    let productId = [];
    data.product1 && productId.push(data.product1);
    data.product2 && productId.push(data.product2);
    try {
      await createPromotion({
        variables: {
          title: data.title,
          detail: data.detail,
          products: productId,
          price: +data.price,
        },
      });
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <React.Fragment>
      <div
        style={{
          maxWidth: theme.layer.maxwidth,
          margin: '2vh auto',
        }}
      >
        <Card>
          <Typography align="center">เพิ่มประเภทสินค้า</Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <CardContent>
              <Controller
                as={TextField}
                name="title"
                control={control}
                defaultValue=""
                label="ชื่อโปรโมชั่น"
                variant="outlined"
                rules={{
                  required: 'กรุณาใส่ชื่อโปรโมชั่น',
                }}
                error={errors.title && true}
                helperText={errors.title?.message}
                size="small"
                classes={{ root: classes.TextFieldRoot }}
                disabled={loading}
                style={{ width: '100%', margin: '1vh auto' }}
              />
              <Controller
                as={TextField}
                name="detail"
                control={control}
                defaultValue=""
                label="คำบรรยาย"
                variant="outlined"
                rules={{
                  required: 'กรุณาใส่คำบรรยาย',
                }}
                error={errors.detail && true}
                helperText={errors.detail?.message}
                size="small"
                classes={{ root: classes.TextFieldRoot }}
                disabled={loading}
                style={{ width: '100%', margin: '1vh auto' }}
              />
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <FormControl
                  variant="outlined"
                  style={{ width: '100%', marginRight: '2vh' }}
                >
                  <InputLabel id="demo-simple-select-outlined-label">
                    สินค้า 1
                  </InputLabel>
                  <Controller
                    as={
                      <Select label="สินค้าที่ 1">
                        {products.map((product) => (
                          <MenuItem key={product.id} value={product.id}>
                            <div
                              style={{ display: 'flex', alignItem: 'center' }}
                            >
                              <Avatar src={product.pictureUrl} />
                              <Typography style={{ margin: 'auto 2vh' }}>
                                {product.name}
                              </Typography>
                            </div>
                          </MenuItem>
                        ))}
                      </Select>
                    }
                    control={control}
                    name="product1"
                    defaultValue=""
                  />
                </FormControl>
                <FormControl variant="outlined" style={{ width: '100%' }}>
                  <InputLabel id="demo-simple-select-outlined-label">
                    สินค้า 2
                  </InputLabel>
                  <Controller
                    as={
                      <Select label="สินค้าที่ 2">
                        {products.map((product) => (
                          <MenuItem key={product.id} value={product.id}>
                            <div
                              style={{ display: 'flex', alignItem: 'center' }}
                            >
                              <Avatar src={product.pictureUrl} />
                              <Typography style={{ margin: 'auto 2vh' }}>
                                {product.name}
                              </Typography>
                            </div>
                          </MenuItem>
                        ))}
                      </Select>
                    }
                    control={control}
                    name="product2"
                    defaultValue=""
                  />
                </FormControl>
              </div>

              <Controller
                as={TextField}
                name="price"
                control={control}
                defaultValue=""
                label="ราคา"
                variant="outlined"
                rules={{
                  required: 'กรุณาใส่ราคา',
                }}
                error={errors.price && true}
                helperText={errors.price?.message}
                size="small"
                classes={{ root: classes.TextFieldRoot }}
                disabled={loading}
                style={{ width: '100%', margin: '1vh auto' }}
              />
            </CardContent>
            <CardActions>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                style={{ marginRight: '2em', margin: 'auto' }}
                disabled={loading}
                classes={{
                  root: classes.buttonRoot,
                  disabled: classes.disabled,
                }}
              >
                เพิ่มโปโมชั่น
                {loading && (
                  <div style={{ position: 'absolute', display: 'flex' }}>
                    <CircularProgress
                      variant="determinate"
                      value={100}
                      className={classes.top}
                      size={24}
                      thickness={4}
                    />
                    <CircularProgress
                      variant="indeterminate"
                      disableShrink
                      className={classes.bottom}
                      size={24}
                      thickness={4}
                    />
                  </div>
                )}
              </Button>
              <Button
                type="button"
                onClick={() => {
                  reset(defaultValues);
                }}
                variant="outlined"
                color="primary"
                style={{ margin: 'auto' }}
              >
                ยกเลิก
              </Button>
            </CardActions>
          </form>
        </Card>
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gridGap: '1vw',
          marginBottom: 100,
          maxWidth: theme.layer.maxwidth,
          margin: '2vh auto',
        }}
      >
        {promotions.map((promotion) => (
          <PromotionItemList key={promotion.id} promotion={promotion} />
        ))}
      </div>
    </React.Fragment>
  );
};

export default MbPromotion;
