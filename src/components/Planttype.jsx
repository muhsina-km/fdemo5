import React, { useState } from "react";
import axios from "axios";
import { Button, Input, Select, Card, Form, Switch } from "antd";
import { useNavigate } from "react-router-dom";
import Sb from "./Sb";
import Navbar from "./Navbar";
import baseurl from "../Api";
const { Option } = Select;


const Planttype = () => {
  const [form] = Form.useForm();
  const [ptype, setPtype] = useState({ Planttype: "", Status: "ACTIVE" });

  const navigate = useNavigate();

  const handleStatusChange = (e) => {
    if(e){
      setPtype((ptype) => ({ ...ptype, Status: "ACTIVE" }));
    }
    else{
      setPtype((ptype) => ({ ...ptype, Status: "INACTIVE" }));
    }
  }
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
      <h1 style={{ textAlign: 'center', marginTop:"7%" }}>
        To Add Plant Type
      </h1>

      <Card
        className='glasscard'
        bordered={true}
        style={{
          padding: 30,
          width: 500,
          marginTop: "-100px",
          height: 300,
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
            label={<span style={{fontFamily: 'cursive', fontSize: '16px' }}>
              Plant Type </span>}
            >
            <Input
            name="Planttype"
              value={ptype.Planttype}
              onChange={(value) => ptypehandler(value, "Planttype")}
            />
          </Form.Item>

          <Form.Item
            label={<span style={{fontFamily: 'cursive', fontSize: '16px' }}>
              Status </span>}
            >
              <Switch
              // value={ptype.Status}
              checkedChildren="ACTIVE" 
              unCheckedChildren="INACTIVE" 
              defaultChecked={ptype.Status === "ACTIVE" ? true : false} onChange={handleStatusChange}
               />
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
