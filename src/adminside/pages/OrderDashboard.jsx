// OrderDashboard.js
import React, { useEffect, useState } from 'react';
import { Divider, Typography, Card, Row, Col } from 'antd';
import axios from 'axios';
import baseurl from '../../Api';
import OrderTable from './OrderTable';

const OrderDashboard = () => {
  const { Title } = Typography;
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Fetch orders
    axios.get(`${baseurl}/order/fetch-orders/admin`)
      .then((response) => {
        setOrders(response.data.orders);
      })
      .catch((error) => {
        console.error('Error fetching orders:', error);
      });
  }, []);

  const handleSwitchChange = async (orderId, checked) => {
    try {
      const status = checked ? 'ORDERING' : 'DELIVERED';
      await axios.patch(`${baseurl}/order/update-order-status/${orderId}`, { status });
      setOrders(prevOrders => prevOrders.map(order => order._id === orderId ? { ...order, status } : order));
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  return (
    <div className="background-table">
      <h1
        style={{
          textAlign: "center",
          marginTop: "15px",
          marginLeft: "1%",
          color: "#000000",
        }}
      >
        Order details View
      </h1>

      <Card
        className="background-2"
        bordered={true}
        style={{
          position: 'relative',
            height: '100vh',
            overflowX: 'hidden',
            overflowY: 'auto',
          marginTop: "-0.1%",
          marginBottom: "8%",
          marginLeft: "3%",
          marginRight: "3%",
        }}
      >
        <OrderTable orders={orders} onSwitchChange={handleSwitchChange} />
      </Card>
    </div>
  );
};

export default OrderDashboard;