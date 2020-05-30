import React, { useState, useEffect, useRef } from 'react';

// firebase
import { storage } from '../../firebase';

// Apollo
import { useMutation } from '@apollo/react-hooks';
import {
  MUTAION_UPDATEEMPLOYEE,
  MUTAION_DELETEEMPLOYEE,
} from '../../apollo/mutation';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import {
  updateEmployees,
  deleteEmployees,
} from '../../redux/actions/employeeActions';

// Moment
import moment from 'moment';
import 'moment/locale/th';
moment.locale('th');

// MUI
import MaterialTable from 'material-table';
import CardActionArea from '@material-ui/core/CardActionArea';
import { useTheme } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles((theme) => ({
  top: {
    color: theme.palette.primary.dark,
    position: 'absolute',
    left: 7,
  },
  bottom: {
    color: theme.palette.primary.light,
    animationDuration: '550ms',
    position: 'absolute',
    left: 7,
  },
}));

const EmployeeTable = () => {
  const theme = useTheme();
  const classes = useStyles();
  const [row, setRow] = useState({});
  const [pictureUploading, setPictureUploading] = useState(false);
  const matches600down = useMediaQuery('(max-width:600px)');
  const matches1024down = useMediaQuery('(max-width:1024px)');
  const employees = useSelector((state) => state.employees);

  const [state, setState] = useState([]);

  const convertForm = async () => {
    let employeeData = [];
    await employees.map((employee) => {
      let formUserData = {
        id: employee.id,
        user: {
          lineId: employee.user.lineId,
          pictureUrl: employee.user.pictureUrl,
          firstName: employee.user.firstName,
          lastName: employee.user.lastName,
          phone: employee.user.phone,
          state: employee.user.state,
        },
        state: employee.state,
        IDcardPictureUrl: employee.IDcardPictureUrl,
        position: employee.position,
      };
      employeeData.push(formUserData);
    });
    setState(employeeData);
  };

  useEffect(() => {
    convertForm();
  }, [employees]);

  const imageInput = useRef();

  const [updateEmployee, { loading, data }] = useMutation(
    MUTAION_UPDATEEMPLOYEE,
    {
      onCompleted: async (data) => {
        await setRow({});
        await setPictureUploading(false);
        await action(updateEmployees(data.updateEmployee));
        await setState(() => {
          let employeeData = [];
          employees.map((employee) => {
            let formUserData = {
              id: employee.id,
              user: {
                lineId: employee.user.lineId,
                pictureUrl: employee.user.pictureUrl,
                firstName: employee.user.firstName,
                lastName: employee.user.lastName,
                phone: employee.user.phone,
                state: employee.user.state,
              },
              state: employee.state,
              IDcardPictureUrl: employee.IDcardPictureUrl,
              position: employee.position,
            };
            employeeData.push(formUserData);
          });
          return employeeData;
        });
      },
    }
  );

  const [deleteEmployee] = useMutation(MUTAION_DELETEEMPLOYEE, {
    onCompleted: async (data) => {
      await action(deleteEmployees(data.deleteEmployee));
      setRow({});
    },
  });

  const handleEditPicture = () => {
    imageInput.current.click();
  };
  const handleImageChange = (e) => {
    setPictureUploading(true);
    const Image = e.target.files[0];
    if (!e.target.value.length) {
      setRow({});
    }
    const uploadTask = storage.ref(`employee/idcard/${Image.name}`).put(Image);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        // progress function ....
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
      },
      (err) => {
        // error function ....
        console.log(err);
      },
      () => {
        // complete function ...
        storage
          .ref(`employee/idcard/`)
          .child(Image.name)
          .getDownloadURL()
          .then((url) => {
            updateEmployee({
              variables: {
                id: row.id,
                IDcardPictureUrl: url,
              },
            });
          });
      }
    );
  };
  const action = useDispatch();
  const columnTitle = [
    {
      title: 'รูปภาพ',
      field: 'user.pictureUrl',
      render: (rowData) => (
        <img
          src={rowData.user.pictureUrl}
          style={{ width: 40, borderRadius: '50%' }}
        />
      ),
      editable: 'never',
    },
    { title: 'ชื่อ', field: 'user.firstName', editable: 'never' },
    { title: 'นามสกุล', field: 'user.lastName', editable: 'never' },
    {
      title: 'เบอร์',
      field: 'user.phone',
      editable: 'never',
    },
    {
      title: 'สถานะ',
      field: 'user.state',
      lookup: {
        admin: 'ผู้ดูแล',
        employee: 'พนักงาน',
      },
      editable: 'never',
    },
    {
      title: 'ตำแหน่ง',
      field: 'position',
      lookup: {
        admin: 'ผู้ดูแล',
        manager: 'ผู้จัดการ',
        waiter: 'พนักงานเสิร์ฟ',
        chef: 'พ่อครัว',
      },
    },
    {
      title: 'การทำงาน',
      field: 'state',
      lookup: {
        work: 'ทำงาน',
        leave: 'ลา',
        out: 'สิ้นสถานะพนักงาน',
      },
    },
  ];

  return (
    <React.Fragment>
      <input
        type="file"
        ref={imageInput}
        hidden="hidden"
        onChange={(e, rowData) => handleImageChange(e, rowData)}
      />
      <MaterialTable
        title="สมาชิกทั้งหมด"
        columns={columnTitle}
        data={state}
        options={{
          exportButton: true,
          pageSize: 10,
        }}
        isLoading={!state ? true : false}
        editable={{
          onRowUpdate: (newData, oldData) =>
            new Promise(async (resolve) => {
              if (!oldData || newData === oldData) {
                return;
              }
              try {
                updateEmployee({
                  variables: {
                    id: newData.id,
                    state: newData.state ? newData.state : oldData.state,
                    position: newData.position
                      ? newData.position
                      : oldData.position,
                    pin: newData.pin ? newData.pin : oldData.pin,
                    IDcardPictureUrl: newData.IDcardPictureUrl
                      ? newData.IDcardPictureUrl
                      : oldData.IDcardPictureUrl,
                  },
                });
                resolve();
              } catch (error) {
                console.log(error.message);
                resolve();
              }
            }),
          onRowDelete: (oldData) =>
            new Promise(async (resolve) => {
              try {
                deleteEmployee({
                  variables: {
                    id: oldData.id,
                  },
                });
                resolve();
              } catch (error) {
                console.log(error.message);
                resolve();
              }
            }),
        }}
        actions={[
          {
            tooltip: 'อัพโหลด IDcard',
            icon: () => <i className="far fa-id-card"></i>,
            onClick: (evt, data) => {
              setRow(data);
              handleEditPicture();
            },
          },
        ]}
        localization={{
          body: {
            emptyDataSourceMessage: 'ยังไม่มีสมาชิก',
            editTooltip: 'แก้ไข',
          },
          toolbar: {
            searchTooltip: 'ค้นหาสมาชิก',
            searchPlaceholder: 'ค้นหาสมาชิก',
            exportName: 'ดาวโหลด รายงาน',
            nRowsSelected: 'เลือกสมาชิก {0} คน',
          },
          pagination: {
            labelRowsSelect: 'แถว',
            labelDisplayedRows: ' {from}-{to} จาก {count}',
            firstTooltip: 'หน้าแรก',
            previousTooltip: 'หน้าก่อน',
            nextTooltip: 'หน้าต่อไป',
            lastTooltip: 'หน้าสุดท้าย',
          },
          header: {
            actions: '',
          },
        }}
        style={{
          boxShadow: matches1024down ? 'none' : theme.common.shadow.black,
          width: matches1024down ? undefined : '80%',
          margin: matches1024down ? '0 0 150px 0' : '1vh auto',
        }}
        detailPanel={(rowData) => {
          return (
            <div style={{ marginLeft: '10%', padding: '1vh', display: 'flex' }}>
              <img
                src={
                  rowData.IDcardPictureUrl
                    ? rowData.IDcardPictureUrl
                    : './images/employee/noidcard.png'
                }
                alt={rowData.user.firstName}
                style={{
                  boxShadow: theme.common.shadow.black,
                  borderRadius: '5px',
                  width: matches600down ? 150 : 300,
                  height: matches600down ? 100 : 200,
                }}
              />
            </div>
          );
        }}
        onRowClick={(event, rowData, togglePanel) => togglePanel()}
      />
    </React.Fragment>
  );
};

export default EmployeeTable;
