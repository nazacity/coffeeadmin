import React, { useState, useEffect } from 'react';

// Apollo
import { useMutation } from '@apollo/react-hooks';
import { MUTAION_UPDATEEMPLOYEE } from '../../../apollo/mutation';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { updateEmployees } from '../../../redux/actions/employeeActions';

// Moment
import moment from 'moment';
import 'moment/locale/th';
moment.locale('th');

// Next
import Head from 'next/head';

// MUI
import MaterialTable from 'material-table';

const EmployeeTable = () => {
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
    { title: 'ชื่อ', field: 'user.firstName' },
    { title: 'นามสกุล', field: 'user.lastName' },
    {
      title: 'เบอร์',
      field: 'user.phone',
    },
    {
      title: 'สถานะ',
      field: 'user.state',
      lookup: {
        admin: 'ผู้ดูแล',
        employee: 'พนักงาน',
      },
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
  const employees = useSelector((state) => state.employees);

  const [state, setState] = useState(() => {
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

  const [updateEmployee, { loading, data }] = useMutation(
    MUTAION_UPDATEEMPLOYEE,
    {
      onCompleted: async (data) => {
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

  return (
    <React.Fragment>
      <Head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://use.fontawesome.com/releases/v5.12.0/css/all.css"
        />
      </Head>
      <MaterialTable
        title="สมาชิกทั้งหมด"
        columns={columnTitle}
        data={state}
        options={{
          exportButton: true,
          selection: true,
          pageSize: 10,
        }}
        isLoading={!state ? true : false}
        editable={{
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve) => {
              resolve();
              if (!oldData || newData === oldData) {
                return;
              }
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
            }),
        }}
        actions={[
          {
            tooltip: 'ส่งข้อความ LINE',
            icon: 'send',
            onClick: (evt, data) => {
              // TODO: send line msg
              console.log('send evt', evt);
              console.log('send data', data);
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
        style={{ border: 'none', boxShadow: 'none', marginBottom: '100px' }}
      />
    </React.Fragment>
  );
};

export default EmployeeTable;
