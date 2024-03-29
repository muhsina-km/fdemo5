import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Space, Switch } from 'antd';

const OrderTable = ({ orders, onSwitchChange }) => {
  // Function to format plant names and quantities
  const formatItems = (items) => {
    return items.map((item, index) => (
      <span key={index}>
        {index + 1}. <b>{item.plantname}</b> <b>(</b>ID: {item.productId}, Qty: {item.quantity}<b>)</b>
        {index < items.length - 1 ? ', ' : ''}
      </span>
    ));
  };

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell><b>No.</b></TableCell>
            <TableCell><b>Order ID</b></TableCell>
            <TableCell><b>OrderedItems</b></TableCell>
            <TableCell><b>Order Date</b></TableCell>
            <TableCell><b>Email Id</b></TableCell>
            <TableCell><b>Name</b></TableCell>
            <TableCell><b>Address</b></TableCell>
            <TableCell><b>Phone</b></TableCell>
            <TableCell><b>District</b></TableCell>
            <TableCell><b>Payment</b></TableCell>
            <TableCell><b>Status</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order._id}>
              <TableCell>{orders.indexOf(order) + 1}</TableCell>
              <TableCell>{order._id}</TableCell>
              <TableCell>
                <Space
                  direction='vertical'
                  size='middle'
                  style={{ display: 'flex' }}>
                  {formatItems(order.items)}
                </Space>
              </TableCell>
              <TableCell>{new Date(order.orderDate).toLocaleDateString()}</TableCell>
              <TableCell>{order.email}</TableCell>
              <TableCell>{order.name}</TableCell>
              <TableCell>{order.address}</TableCell>
              <TableCell>{order.phone}</TableCell>
              <TableCell>{order.district}</TableCell>
              <TableCell>{order.payment}</TableCell>
              <TableCell>
                <Switch 
                 checkedChildren={<span>ORDERING</span>}  
                 unCheckedChildren={<span>DELIVERED</span>} 
                  checked={order.status === "ORDERING"}
                  onChange={(checked) => onSwitchChange(order._id, checked)}
                  aria-label="secondary checkbox"
                  disabled = {order.status === "DELIVERED"}
                />
                {/* {order.status} */}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default OrderTable;
