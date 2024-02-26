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
    <div>
      <Divider orientation="left">
        <Title level={2}>Order Dashboard</Title>
      </Divider>

      <Row gutter={16} style={{ margin: '20px' }}>
        <Col span={24}>
          <Card style={{ marginBottom: 50, width: 960, height: 320, filter: 'drop-shadow(0px 0px 8px rgba(0, 0, 0, 0.12))' }}>
            <Title level={3}>Orders</Title>
            <OrderTable orders={orders} onSwitchChange={handleSwitchChange} />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default OrderDashboard;