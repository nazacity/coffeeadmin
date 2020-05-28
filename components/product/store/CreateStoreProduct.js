import React from 'react';
import { useForm, Controller } from 'react-hook-form';

// Apollo
import { useMutation, useQuery } from '@apollo/react-hooks';
import { MUTAION_CREATE_STOREPRODUCT } from '../../../apollo/mutation';
import { QUERY_STOCKNAME } from '../../../apollo/query';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { createStoreProducts } from '../../../redux/actions/productAction';

// MUI
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Avatar from '@material-ui/core/Avatar';
import CircularProgress from '@material-ui/core/CircularProgress';

// Toast
import { useToasts } from 'react-toast-notifications';

const defaultValues = {
  title: 'hey',
};

const useStyles = makeStyles((theme) => ({
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
}));

const CreateStoreProduct = ({ handleAddStoreProductDialogClose }) => {
  const classes = useStyles();
  const [indexes, setIndexes] = React.useState([0]);
  const [counter, setCounter] = React.useState(1);
  const { addToast } = useToasts();
  const action = useDispatch();
  const matches600down = useMediaQuery('(max-width:600px)');
  const { data } = useQuery(QUERY_STOCKNAME);

  const catalogs = useSelector((state) => state.products.storeProductCatalogs);
  const [createStoreProduct, { loading, error }] = useMutation(
    MUTAION_CREATE_STOREPRODUCT,
    {
      onCompleted: (data) => {
        action(createStoreProducts(data.createStoreProduct));
        const content = (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Avatar
              src={data.createStoreProduct.pictureUrl}
              alt={data.createStoreProduct.name}
              style={{
                marginRight: '1vh',
                backgroundColor: '#fff',
                boxShadow: theme.common.shadow.black,
              }}
            />
            <Typography>
              เพิ่มสินค้า {data.createStoreProduct.name} ในร้านเรียบร้อย
            </Typography>
          </div>
        );
        addToast(content, {
          appearance: 'success',
          autoDismiss: true,
        });
        handleAddStoreProductDialogClose();
      },
    }
  );
  const theme = useTheme();
  const {
    register,
    handleSubmit,
    unregister,
    control,
    errors,
    formState: { dirty },
  } = useForm({ defaultValues });

  const onSubmit = async (data) => {
    let convertStockOutDetail = [];
    data.stockOutDetail?.map((detail) => {
      convertStockOutDetail.push({ name: detail.name, out: +detail.out });
    });
    await createStoreProduct({
      variables: {
        name: data.name,
        stockOutDetail: convertStockOutDetail,
        price: +data.price,
        pictureUrl:
          'https://firebasestorage.googleapis.com/v0/b/coffeecafesho.appspot.com/o/products%2Fno-product-picture.png?alt=media',
        catalogId: data.catalogId,
      },
    });
  };

  const addFriend = () => {
    setIndexes((prevIndexes) => [...prevIndexes, counter]);
    setCounter((prevCounter) => prevCounter + 1);
  };

  const removeFriend = (index) => () => {
    setIndexes((prevIndexes) => [
      ...prevIndexes.filter((item) => item !== index),
    ]);
    const fieldName = `stockOutDetail[${index}]`;
    unregister(`${fieldName}.stockName`);
    unregister(`${fieldName}.out`);
  };

  return (
    <div
      style={{
        padding: '2vh',
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography align="center" variant="h6">
          เพิ่มสินค้าในร้านค้า
        </Typography>
        <Controller
          as={TextField}
          name="name"
          control={control}
          defaultValue=""
          label="ชื่อสินค้า"
          variant="outlined"
          rules={{
            required: 'กรุณาใส่ชื่อสินค้า',
          }}
          error={errors.name && true}
          helperText={errors.name?.message}
          size="small"
          // disabled={loading}
          style={{ width: '100%', margin: '1vh auto' }}
        />
        <Controller
          as={TextField}
          name="price"
          control={control}
          defaultValue=""
          label="ราคา"
          variant="outlined"
          rules={{
            required: 'กรุณาใส่ประเภทภาษาอังกฤษ',
          }}
          error={errors.name && true}
          helperText={errors.name?.message}
          size="small"
          // disabled={loading}
          style={{ width: '100%', margin: '1vh auto' }}
        />
        <FormControl
          variant="outlined"
          style={{
            width: '100%',
            margin: '1vh auto',
          }}
        >
          <InputLabel id="demo-simple-select-outlined-label">
            ประเภทสินค้า
          </InputLabel>
          <Controller
            as={
              <Select label="ประเภทสินค้า" style={{ height: '50px' }}>
                {catalogs.map((catalog) => (
                  <MenuItem key={catalog.id} value={catalog.id}>
                    <div style={{ display: 'flex', alignItem: 'center' }}>
                      <Typography style={{ margin: '1auto 2vh' }}>
                        {catalog.th}
                      </Typography>
                    </div>
                  </MenuItem>
                ))}
              </Select>
            }
            control={control}
            name="catalogId"
            defaultValue=""
          />
        </FormControl>
        <div
          style={{
            padding: '2vh',
            display: 'grid',
            gridTemplateColumns: '1.3fr 0.7fr',
          }}
        >
          <div>
            {indexes.map((index) => {
              const fieldName = `stockOutDetail[${index}]`;
              return (
                <Card
                  name={fieldName}
                  key={fieldName}
                  style={{
                    padding: '2vh',
                    marginBottom: '1vh',
                    boxShadow: theme.common.shadow.main1,
                    position: 'relative',
                  }}
                >
                  <IconButton
                    variant="outlined"
                    color="primary"
                    onClick={removeFriend(index)}
                    style={{ position: 'absolute', top: 0, right: 0 }}
                    disabled={index === 0}
                  >
                    <HighlightOffIcon />
                  </IconButton>
                  <FormControl
                    variant="outlined"
                    style={{
                      width: '100%',
                      marginRight: matches600down ? 0 : '2vh',
                      marginTop: '1vh',
                    }}
                  >
                    <InputLabel id="demo-simple-select-outlined-label">
                      ชื่อวัตถุดิบ
                    </InputLabel>
                    <Controller
                      as={
                        <Select label="ชื่อวัตถุดิบ" style={{ height: '50px' }}>
                          {data &&
                            data.stockName.map((data) => (
                              <MenuItem key={data.name} value={data.name}>
                                <div
                                  style={{
                                    display: 'flex',
                                    alignItem: 'center',
                                  }}
                                >
                                  <Typography style={{ margin: 'auto 2vh' }}>
                                    {data.name}
                                  </Typography>
                                </div>
                              </MenuItem>
                            ))}
                        </Select>
                      }
                      control={control}
                      name={`${fieldName}.name`}
                      defaultValue=""
                    />
                  </FormControl>
                  <Controller
                    as={TextField}
                    name={`${fieldName}.out`}
                    control={control}
                    defaultValue=""
                    label="ปริมาณ"
                    variant="outlined"
                    size="small"
                    // disabled={loading}
                    style={{
                      width: '100%',
                      margin: '1vh auto',
                      height: '50px',
                    }}
                  />
                </Card>
              );
            })}
          </div>
          <Card
            style={{
              display: 'flex',
              flexDirection: 'column',
              padding: '2vh',
              marginLeft: '2vh',
              boxShadow: theme.common.shadow.main1,
            }}
          >
            <Button
              variant="outlined"
              onClick={addFriend}
              style={{ marginBottom: '2vh' }}
              color="primary"
            >
              เพิ่มรายการวัตถุดิบ
            </Button>
            <Button
              variant="contained"
              type="submit"
              style={{ marginBottom: '2vh' }}
              color="primary"
              disabled={loading}
              classes={{ root: classes.buttonRoot, disabled: classes.disabled }}
            >
              เพิ่มสินค้า
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
          </Card>
        </div>
      </form>
    </div>
  );
};

export default CreateStoreProduct;
