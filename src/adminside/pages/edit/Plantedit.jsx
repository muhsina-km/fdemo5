import { TextField } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Button, Input, Select, Card, Form, Switch, Space } from "antd";
import Navbar from '../../components/Navbar';
import baseurl from "../../../Api";
import HostImgCrop from '../../components/HostImgCrop';
const { Option } = Select;


const Plantedit = (props) => {
   
    const [form] = Form.useForm();

    var[ptype,setPtype]=useState(props.data)
    const [selectedimage, setSelectedimage] = useState([])
    const [ptypes, setPtypes] = useState({ Planttype: "",Planttypephoto: "", Status: "ACTIVE" });
    
    const navigate =useNavigate();

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

    const HandlePtImage = (url) => {
       ptype.Planttypephoto = url;
    }

     const saveData =()=>{
        
        if(props.method==="put")
        {
          console.log("asd")
            axios.put(baseurl+"/planttype/ptedit/"+ptype._id,ptype)
            .then((response)=>{
                alert("UPDATED")
                navigate("/replantplanttype")
            })
            .catch(err=>console.log(err))
        }
     }
     
  return (
    <div 
    className='background-4'
    >
    
        <h1 style={{ textAlign: 'center', marginLeft: '10px' }}>
        To Update Plant Type
      </h1>

    <Card
        className='glasscard'
        bordered={true}
        style={{
          width: 500,
          height: 350,
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
              PlantType Image </span>}
            >
              <HostImgCrop onUrlChange={HandlePtImage} resetAfterUpload={true} 
              oldimageUrl={ptype.Planttypephoto} />
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
