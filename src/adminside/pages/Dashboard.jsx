import { Card, Col, Divider, Row, Typography } from "antd";
import React from "react";
import CountUp from "react-countup";
import PieChartCom from "../components/PieChartCom";

const Dashboard = () => {
  const { Title, Paragraph, Text, Link } = Typography;
  const data = [
    { name: 'Total', value: 40 },
    { name: 'Active', value: 30 },
    { name: 'Inactive', value: 10 },
  ];
  return (
    <div>
      <Divider orientation="left">
        <Title level={2}>Dashboard</Title>
      </Divider>
      
      <Row gutter={16} style={{ margin: "20px" }}>
        <Col span={12}>
          <Card style={{ width: "100%", height: 350,filter: "drop-shadow(0px 0px 8px rgba(0, 0, 0, 0.20))" }}>
            <Row gutter={16}>
              <Col span={7}>
                <Title level={4}>Total Plants : <CountUp end={15} duration={2.75} /></Title>
                <Title level={5}>Active Plants</Title>
                <Title level={4}><CountUp end={15} duration={2.75} /></Title>
                <Title level={5}>Inactive Plants</Title>
                <Title level={4}><CountUp end={15} duration={2.75} /></Title>
              </Col>
              <Col span={17} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <PieChartCom data={data} />
              </Col>
            </Row>
          </Card>
        </Col>
        
        <Col span={10}>
          <Card style={{ width: 300, height: 350, filter: "drop-shadow(0px 0px 8px rgba(0, 0, 0, 0.12))" }}>
            <Row gutter={16}>
              <Title level={4}>Total Plant Types : <CountUp end={15} duration={2.75} /></Title>
            </Row>
            <Title level={5}>Active Plant Types</Title>
            <Title level={4}><CountUp end={15} duration={2.75} /></Title>
            <Title level={5}>Inactive Plant Types</Title>
            <Title level={4}><CountUp end={15} duration={2.75} /></Title>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
