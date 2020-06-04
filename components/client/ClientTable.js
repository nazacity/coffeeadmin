import React, { useState, useEffect } from 'react';

// Apollo
import { useMutation } from '@apollo/react-hooks';
import { MUTAION_UPDATEUSER } from '../../apollo/mutation';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { updateClient } from '../../redux/actions/clientActions';

// Moment
import moment from 'moment';
import 'moment/locale/th';
moment.locale('th');

// MUI
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import MaterialTable from 'material-table';

const ClientTable = () => {
  const matches1024down = useMediaQuery('(max-width:1024px)');
  const theme = useTheme();
  const action = useDispatch();
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
      editable: 'never',
    },
    { title: 'ชื่อ', field: 'firstName' },
    { title: 'นามสกุล', field: 'lastName' },
    {
      title: 'อีเมล',
      field: 'email',
    },
    {
      title: 'เบอร์',
      field: 'phone',
    },
    { title: 'เป็นสมาชิกเมื่อ', field: 'createdAt', editable: 'never' },
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
  const clients = useSelector((state) => state.clients);
  const newestClients = clients.sort((a, b) => {
    return b.createdAt - a.createdAt;
  });

  const [state, setState] = useState([]);

  useEffect(() => {
    let clientData = [];
    newestClients.map((client) => {
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
  }, [clients]);

  const [updateUser, { loading, data }] = useMutation(MUTAION_UPDATEUSER, {
    onCompleted: async (data) => {
      await action(updateClient(data.updateUser));
      await setState(() => {
        let clientData = [];
        newestClients.map((client) => {
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
        return clientData;
      });
    },
  });

  return (
    <React.Fragment>
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
            new Promise(async (resolve) => {
              if (!oldData || newData === oldData) {
                resolve();
                return;
              }
              try {
                await updateUser({
                  variables: {
                    id: newData.id,
                    lineId: newData.lineId,
                    firstName: newData.firstName
                      ? newData.firstName
                      : oldData.firstName,
                    lastName: newData.lastName
                      ? newData.lastName
                      : oldData.lastName,
                    phone: newData.phone ? newData.phone : oldData.phone,
                    email: newData.email ? newData.email : oldData.email,
                    state: newData.state ? newData.state : oldData.state,
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
        style={{
          margin: matches1024down ? '0 0 150px 0' : '1vh auto',
        }}
      />
    </React.Fragment>
  );
};

export default ClientTable;
