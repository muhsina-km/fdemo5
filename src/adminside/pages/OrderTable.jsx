import React, { useState } from 'react';
import { Table, Button, Switch } from 'antd';

const OrderTable = ({ orders, onSwitchChange }) => {

    const [ptype, setPtype] = useState({ Status: "ORDERING" });

    const handleStatusChange = (e) => {
        if(e){
          setPtype((ptype) => ({ ...ptype, Status: "ORDERING" }));
        }
        else{
          setPtype((ptype) => ({ ...ptype, Status: "DELIVERED" }));
        }
      }

  const columns = [
    {
      title: 'Order ID',
      dataIndex: '_id',
      key: '_id',
    },
    {
        title: 'Email Id',
        dataIndex: 'email',
        key: 'email',
      },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'District',
      dataIndex: 'district',
      key: 'district',
    },
    {
      title: 'Payment',
      dataIndex: 'payment',
      key: 'payment',
    },
    {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        render: (status, record) => (
            <Switch
            checkedChildren="ORDERING" 
            unCheckedChildren="DELIVERED" 
            defaultChecked={ptype.Status === "ORDERING" ? true : false} onChange={handleStatusChange}
             />
        ),
      },
    ];

  return <Table dataSource={orders} columns={columns} />;
};

export default OrderTable;