import React, { useState } from "react";
import axios from "axios";
import { Button, Input, Select, Card, Form } from "antd";
import { useNavigate } from "react-router-dom";
import Sb from "./Sb";
import Navbar from "./Navbar";
import baseurl from "../Api";
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
      .post(baseurl+"/planttype/ptnew", ptype)
      .then((response) => {
        alert("Record saved");
      })
      .catch((err) => console.log(err));
    navigate("/Planttypeview");
  };

  return (
    <div className='background-4'>

     <Navbar/>
     
      <h1 style={{ textAlign: 'center', marginTop: '-310px', marginLeft: '50px' }}>
        To Add Plant Type
      </h1>

      <Card
        className='background-4'
        bordered={true}
        style={{
          width: 500,
          height: 300,
          marginTop: "-600px",
          marginBottom: "1%",
          marginLeft: "27%",
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
            name="Planttype"
              value={ptype.Planttype}
              onChange={(value) => ptypehandler(value, "Planttype")}
            />
          </Form.Item>

          <Form.Item
            label={<span style={{ color: '#ffffff', fontFamily: 'cursive', fontSize: '16px' }}>
              Status </span>}
            >
            <Select name="Status"
              value={ptype.Status}
              onChange={value => ptypehandler({target : {value, name: "Status"}})}>
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
