import React, { useState } from "react";
import axios from "axios";
import { Button, Input, Select, Card, Form } from "antd";
import { useNavigate } from "react-router-dom";
import Sb from "./Sb";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
const { Option } = Select;

const Planttype = () => {
  const [form] = Form.useForm();
  const [ptype, setPtype] = useState({ Planttype: "", Status: "ACTIVE" });

  const navigate = useNavigate();

  const ptypehandler = (event) => {
    const {name, value} = event.target
  setPtype((ptype) => ({ ...ptype, [name]: value }));
  console.log(ptype)
  };

  const saveData = () => {
    console.log(ptype);
    axios
      .post("http://localhost:3005/ptnew", ptype)
      .then((response) => {
        alert("Record saved");
      })
      .catch((err) => console.log(err));
    navigate("/Planttypeview");
  };

  return (
    <div className='background-4'>

     <Navbar/>
     <Sidebar/>
     
      <h1 style={{ textAlign: 'center', marginTop: '70px', marginLeft: '220px' }}>
        Plant Type
      </h1>

      <Card
        className='background-4'
        bordered={true}
        style={{
          width: 500,
          height: 300,
          marginTop: "-5px",
          marginBottom: "50%",
          marginLeft: "40%",
        }}>

        <Form
          form={form}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 22 }}
          colon={false}
        >
          <Form.Item
            label={<span style={{ color: '#ffffff', fontFamily: 'cursive', fontSize: '16px' }}>
              Plant Type </span>}
            >
            <Input
            name="plantid"
              value={ptype.Planttype}
              onChange={(e) => ptypehandler(e.target.value, "Planttype")}
            />
          </Form.Item>

          <Form.Item
            label={<span style={{ color: '#ffffff', fontFamily: 'cursive', fontSize: '16px' }}>
              Status </span>}
            >
            <Select
            name="status"
              value={ptype.Status}
              onChange={(value) => ptypehandler(value, "Status")}>
              <Option value="ACTIVE">ACTIVE</Option>
              <Option value="INACTIVE">INACTIVE</Option>
            </Select>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 12, span: 16 }}
            onClick={saveData}>
            <Button htmlType="submit">
              Save
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Planttype;
