import React, { useState } from 'react';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { setClient } from '../../../redux/actions/clientActions';

// Apollo
import { useQuery } from '@apollo/react-hooks';
import { QUERY_USERS } from '../../../apollo/query';

// Moment
import moment from 'moment';
import 'moment/locale/th';
moment.locale('th');

// Next
import Head from 'next/head';

// MUI
import MaterialTable from 'material-table';

const NewClientReport = () => {
  const columnTitle = [
    {
      title: 'รูปภาพ',
      field: 'pictureUrl',
      render: (rowData) => (
        <img
          src={rowData.pictureUrl}
          style={{ width: 40, borderRadius: '50%' }}
        />
      ),
    },
    { title: 'ชื่อ', field: 'firstName' },
    { title: 'นามสกุล', field: 'lastName' },
    {
      title: 'เบอร์',
      field: 'phone',
    },
    { title: 'เป็นสมาชิกเมื่อ', field: 'createdAt' },
    {
      title: 'สถานะ',
      field: 'state',
      lookup: {
        admin: 'ผู้ดูแล',
        employee: 'พนักงาน',
        client0: 'ลูกค้ายังไม่ได้ลงทะเบียน',
        client1: 'ลูกค้าไม่เคยซื้อสินค้า',
        client2: 'ลูกค้า',
      },
    },
  ];

  const action = useDispatch();
  const { users, loading, data } = useQuery(QUERY_USERS, {
    onCompleted: (data) => {
      action(setClient(data.users));
      let clientData = [];
      let newestUsers = data.users.sort((a, b) => {
        return b.createdAt - a.createdAt;
      });
      newestUsers.slice(0, 5).map((client) => {
        let formUserData = {
          id: client.id,
          lineId: client.lineId,
          pictureUrl: client.pictureUrl,
          firstName: client.firstName,
          lastName: client.lastName,
          phone: client.phone,
          email: client.email,
          createdAt: moment(client.createdAt).format('DD/MMM/YY'),
          state: client.state,
        };
        clientData.push(formUserData);
      });
      setState(clientData);
    },
  });

  const [state, setState] = useState(() => users);

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
        title="สมาชิกใหม่"
        columns={columnTitle}
        data={state}
        options={{
          pageSize: 5,
          search: false,
        }}
        isLoading={!state ? true : false}
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
        style={{ border: 'none', boxShadow: 'none' }}
      />
    </React.Fragment>
  );
};

export default NewClientReport;
