import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Divider, Row, Col, Typography, Card } from 'antd';
import CountUp from 'react-countup';
import PieChartCom from '../components/PieChartCom';
import baseurl from '../../Api';
import Meta from 'antd/es/card/Meta';

const Dashboard = () => {
  const { Title } = Typography;
  const [totalPlants, setTotalPlants] = useState(0);
  const [activePlants, setActivePlants] = useState(0);
  const [inactivePlants, setInactivePlants] = useState(0);

  const [totalPlantTypes, setTotalPlantTypes] = useState(0);
  const [activePlantTypes, setActivePlantTypes] = useState(0);
  const [inactivePlantTypes, setInactivePlantTypes] = useState(0);

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Fetch total plants and plant types
    axios.get(`${baseurl}/plantdetails/pview/`)
      .then((response) => {
        console.log('Plant data response', response);
        setTotalPlants(response.data.length);

        const activePlantsCount = response.data.filter((plant) => plant.status === 'ACTIVE').length;
        setActivePlants(activePlantsCount);
        setInactivePlants(response.data.length - activePlantsCount);
      })
      .catch((error) => {
        console.error('Error fetching plant data:', error);
      });

    axios.get(`${baseurl}/planttype/ptview`)
      .then((response) => {
        setTotalPlantTypes(response.data.length);

        const activePlantTypesCount = response.data.filter((type) => type.Status === 'ACTIVE').length;
        setActivePlantTypes(activePlantTypesCount);
        setInactivePlantTypes(response.data.length - activePlantTypesCount);
      })
      .catch((error) => {
        console.error('Error fetching plant types data:', error);
      });
  }, []);

  return (
    <div>
      <Divider orientation="left">
        <Title level={2}>Dashboard</Title>
      </Divider>

      <Row gutter={16} style={{ margin: '20px' }}>
        <Col span={12}>
          <Card style={{ width: '100%', height: 320, filter: 'drop-shadow(0px 0px 8px rgba(0, 0, 0, 0.20))' }}>
            <Row gutter={16}>
              <Col span={7}>
                <Title level={4}>Total Plants : <CountUp end={totalPlants} duration={2.75} /></Title>
                <Title level={5}>Active Plants: {activePlants}</Title>
                <Title level={5}>Inactive Plants: {inactivePlants}</Title>
              </Col>
              <Col span={17} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <PieChartCom 
                totalPlants={totalPlants}
                activeCount={activePlants} 
                inactiveCount={inactivePlants} />
              </Col>
            </Row>
          </Card>
        </Col>

        <Col span={10}>
          <Card style={{ width: 300, height: 320, filter: 'drop-shadow(0px 0px 8px rgba(0, 0, 0, 0.12))' }}>
            <Row gutter={16}>
              <Title level={4}>Total Plant Types : <CountUp end={totalPlantTypes} duration={2.75} /></Title>
              <Title level={5}>Active Plant Types: {activePlantTypes}</Title>
              <Title level={5}>Inactive Plant Types: {inactivePlantTypes}</Title>
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
