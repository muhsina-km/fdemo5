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
    axios.get(`${baseurl}/order/fetch-orders`)
      .then((response) => {
        setOrders(response.data.orders.map(order => ({ ...order, ordering: order.status === 'Ordered' })));
      })
      .catch((error) => {
        console.error('Error fetching orders:', error);
      });
  }, []);

  const handleSwitchChange = async (orderId, checked) => {
    try {
      // Implement the logic for updating the order status
      console.log(`Order with ID ${orderId} is now ${checked ? 'Ordering' : 'Delivered'}.`);

      // Update the state based on your backend logic
      setOrders(prevOrders => prevOrders.map(order => (
        order._id === orderId ? { ...order, ordering: checked } : order
      )));
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