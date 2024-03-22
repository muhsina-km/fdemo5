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
  const [ACTIVEPlants, setACTIVEPlants] = useState(0);
  const [INACTIVEPlants, setINACTIVEPlants] = useState(0);

  const [totalPlantTypes, setTotalPlantTypes] = useState(0);
  const [ACTIVEPlantTypes, setACTIVEPlantTypes] = useState(0);
  const [INACTIVEPlantTypes, setINACTIVEPlantTypes] = useState(0);

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Fetch total plants and plant types
    axios.get(`${baseurl}/plantdetails/admin/pview/`)
      .then((response) => {
        console.log('Plant data response', response);
        setTotalPlants(response.data.length);

        const ACTIVEPlantsCount = response.data.filter((plant) => plant.status === 'ACTIVE').length;
        setACTIVEPlants(ACTIVEPlantsCount);
        setINACTIVEPlants(response.data.length - ACTIVEPlantsCount);
      })
      .catch((error) => {
        console.error('Error fetching plant data:', error);
      });

    axios.get(`${baseurl}/planttype/admin/ptview`)
      .then((response) => {
        setTotalPlantTypes(response.data.length);

        const ACTIVEPlantTypesCount = response.data.filter((type) => type.Status === 'ACTIVE').length;
        setACTIVEPlantTypes(ACTIVEPlantTypesCount);
        setINACTIVEPlantTypes(response.data.length - ACTIVEPlantTypesCount);
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
                <Title level={5}>ACTIVE Plants: {ACTIVEPlants}</Title>
                <Title level={5}>INACTIVE Plants: {INACTIVEPlants}</Title>
              </Col>
              <Col span={17} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <PieChartCom 
                totalPlants={totalPlants}
                ACTIVECount={ACTIVEPlants} 
                INACTIVECount={INACTIVEPlants} />
              </Col>
            </Row>
          </Card>
        </Col>

        <Col span={10}>
          <Card style={{ width: 300, height: 320, filter: 'drop-shadow(0px 0px 8px rgba(0, 0, 0, 0.12))' }}>
            <Row gutter={16}>
              <Title level={4}>Total Plant Types : <CountUp end={totalPlantTypes} duration={2.75} /></Title>
              <Title level={5}>ACTIVE Plant Types: {ACTIVEPlantTypes}</Title>
              <Title level={5}>INACTIVE Plant Types: {INACTIVEPlantTypes}</Title>
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
