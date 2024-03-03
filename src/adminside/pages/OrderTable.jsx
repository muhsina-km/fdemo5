import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Switch } from '@mui/material';

const OrderTable = ({ orders }) => {
  const [status, setStatus] = useState("ORDERING");

  const handleStatusChange = (event) => {
    setStatus(status => status === "ORDERING" ? "DELIVERED" : "ORDERING");
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell><b>Order ID</b></TableCell>
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
              <TableCell>{order._id}</TableCell>
              <TableCell>{order.email}</TableCell>
              <TableCell>{order.name}</TableCell>
              <TableCell>{order.address}</TableCell>
              <TableCell>{order.phone}</TableCell>
              <TableCell>{order.district}</TableCell>
              <TableCell>{order.payment}</TableCell>
              <TableCell>
                <Switch
                  checked={status === "ORDERING"}
                  onChange={handleStatusChange}
                  name="statusSwitch"
                  inputProps={{ 'aria-label': 'secondary checkbox' }}
                />
                {status}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default OrderTable;