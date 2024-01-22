import { TextField } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Button, Input, Select, Card, Form } from "antd";
import Navbar from './Navbar';
import Sidebar from './Sidebar';
const { Option } = Select;


const Plantedit = (props) => {
   
    const [form] = Form.useForm();

        var[ptype,setPtype]=useState(props.data)
    
    const navigate =useNavigate();
    
    
    const ptypehandler =(event)=>{
        const {name,value}=event.target
        setPtype((ptype)=>({...ptype,[name]:value}))
        console.log(ptype)
    }  
     const saveData =()=>{
        
        if
        (props.method==="put")
        {
            axios.put("http://localhost:3005/ptedit/"+ptype._id,ptype)
            .then((response)=>{
                alert("UPDATED")
                window.location.reload(false)
            })
            .catch(err=>console.log(err))
        }
     }
     
  return (
    <div className='background-4'>
        <Navbar/>
        <Sidebar/>

        <h1 style={{ textAlign: 'center', marginTop: '70px', marginLeft: '220px' }}>
        Plant Type
      </h1>

    {/* <TextField label="Plant Type" name="Planttype" value={ptype.Planttype} onChange={ptypehandler}/> */}
    <br></br>
    <br></br>

    <Card
        className='background-4'
        bordered={true}
        style={{
          width: 500,
          height: 300,
          marginTop: "-15px",
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
              onChange={ptypehandler}
            />
          </Form.Item>


    {/* status &nbsp;&nbsp;&nbsp;
    <select name="Status" value={ptype.Status} onChange={ptypehandler}>
        <option value="ACTIVE">ACTIVE</option>
        <option value="INACTIVE">INACTIVE</option>
    </select>
    <br></br>
    <button onClick={saveData} >SUBMIT</button> */}

<Form.Item
            label={<span style={{ color: '#ffffff', fontFamily: 'cursive', fontSize: '16px' }}>
              Status </span>}
            >
            <Select
            name="status"
              value={ptype.Status}
              onChange={ptypehandler}>
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

  )
}

export default Plantedit
