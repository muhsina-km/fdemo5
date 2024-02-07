import { TextField } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Button, Input, Select, Card, Form, Switch } from "antd";
import Navbar from './Navbar';
import baseurl from "../Api";
const { Option } = Select;


const Plantedit = (props) => {
   
    const [form] = Form.useForm();

    var[ptype,setPtype]=useState(props.data)
    const [ptypes, setPtypes] = useState({ Planttype: "", Status: "ACTIVE" });
    
    const navigate =useNavigate();

    const handleStatusChange = (e) => {
      if(e){
        setPtypes((ptype) => ({ ...ptype, Status: "ACTIVE" }));
      }
      else{
        setPtypes((ptype) => ({ ...ptype, Status: "INACTIVE" }));
      }
    }
    
    const ptypehandler = (event) => {
      const {name, value} = event.target
    setPtype((ptype) => ({ ...ptype, [name]: value }));
    console.log(ptype)
    };
     const saveData =()=>{
        
        if(props.method==="put")
        {
          console.log("asd")
            axios.put(baseurl+"/planttype/ptedit/"+ptype._id,ptype)
            .then((response)=>{
                alert("UPDATED")
                window.location.reload(false)
            })
            .catch(err=>console.log(err))
        }
     }
     
  return (
    <div 
    className='background-4'
    >
        {/* <Navbar/> */}
    
        <h1 style={{ textAlign: 'center', marginLeft: '10px' }}>
        To Update Plant Type
      </h1>

    <Card
        className='glasscard'
        bordered={true}
        style={{
          width: 500,
          height: 300,
          // marginTop: "-450px",
          marginBottom: "50%",
          marginLeft: "25%",
        }}>

        <Form
          form={form}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 22 }}
          colon={false}
        >

    <Form.Item
            label={<span style={{ fontFamily: 'cursive', fontSize: '16px' }}>
              Plant Type </span>}
            >
            <Input
            name="Planttype"
              value={ptype.Planttype}
              onChange={ptypehandler}
            />
          </Form.Item>

          <Form.Item
            label={<span style={{fontFamily: 'cursive', fontSize: '16px' }}>
              Status </span>}
            >
              <Switch
              checkedChildren="ACTIVE" 
              unCheckedChildren="INACTIVE" 
              defaultChecked={ptype.Status === "ACTIVE" ? true : false} onChange={handleStatusChange}
               />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 12, span: 16 }}
            onClick={saveData}>
            <Button htmlType="submit" >
              Save
            </Button>
          </Form.Item>
          </Form>
          </Card>

</div>

  )
}

export default Plantedit
