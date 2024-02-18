import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import '../../stylesheets/Main.css';
import { Button, Card, Checkbox, Form, Input, Select, Switch, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import Sb from '../../components/Sb';
import Navbar from '../../components/Navbar';
import baseurl from "../../../Api";
import HostImg from '../../components/HostImg';
import ReactTextTransition, { presets } from "react-text-transition";


const { Option } = Select;

const Plant = () => {
  const [form] = Form.useForm();

  var [inputs, setInputs] = useState({
    "plantid": '', "plantname": '', "planttypeid": '', "color": '', "size": '',
    "price": '', "description": '', "stock": '', "status": 'ACTIVE', "plantphoto": "",
  });

  var [planttype, setPlanttype] = useState([]);
  var [selectedimage, setSelectedimage] = useState(null);
  const [pdetail, setPdetail] = useState({ Plantdetails: "", Status: "ACTIVE" });

  const navigate = useNavigate();

  useEffect(() => {

    axios.get (baseurl+"/planttype/ptview")
      .then(response => {
        setPlanttype(response.data)
      })
      .catch(err => console.log(err))
  }, [])

  const inputHandler = (event) => {
    const { name, value } = event.target
    setInputs((inputs) => ({ ...inputs, [name]: value }))
    console.log(inputs)
  }

  const handleStatusChange = (e) => {
    if(e){
      inputs.status = "ACTIVE"
    }
    else{
      inputs.status = "INACTIVE"
    }
  }

  const handleImage = (info) => {
    console.log(info)
    inputs.plantphoto =info
    setSelectedimage(info);
    return
  };
  

  const savedata = () => {
    axios.post(baseurl + '/plantdetails/pnew', inputs)
      .then((response) => response.data)
      .then((data) => {
        alert('Record Saved');
      })
      .catch((err) => {
        console.error(err);
      });
    navigate('/plantdetailsview');
  };
  
  

  return (

    <div className='background-4'>
      <div>
      <h1 style={{ textAlign: 'center', marginLeft: '50px' }}>
       To Add Plant Details
      </h1>

      <Card 
      className='glasscard'
      bordered={true}
      style={{ 
        width: 500 ,
        height: 800,
        marginBottom: "10%",
        marginLeft: "28%",
      }}>
        <Form
          form={form}
          onFinish={savedata}
          initialValues={inputs}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 22 }}
          colon={false}
        >
          <Form.Item 
          label={<span style={{ fontFamily: 'cursive', fontSize: '16px' }}>
          Plant Code </span>}
          >
            <Input  name="plantid"
            value={inputs.plantid}
            onChange={inputHandler} />
          </Form.Item>

          <Form.Item
          label={<span style={{ fontFamily: 'cursive', fontSize: '16px' }}>
          Plant Name </span>} 
          >
            <Input 
            name="plantname"
            value={inputs.plantname}
            onChange={inputHandler} />
          </Form.Item>

          <Form.Item
          label={<span style={{ fontFamily: 'cursive', fontSize: '16px' }}>
          Plant Type </span>}
          >
            <Select 
            name="planttypeid"
            value={inputs.planttypeid}  onChange={value => inputHandler({target : {value, name: "planttypeid"}})}>
              {
              planttype.map((value,index) => {
                return(
                <Option key={index} value={value._id}>{value.Planttype}</Option>
                )
                })
              }
            </Select>
          </Form.Item>

          <Form.Item 
          label={<span style={{ fontFamily: 'cursive', fontSize: '16px' }}>
          Color </span>}
          >
            <Input 
            name="color"
            value={inputs.color}
            onChange={inputHandler} />
          </Form.Item>

          <Form.Item
          label={<span style={{ fontFamily: 'cursive', fontSize: '16px' }}>
          Size </span>}
          >
           <Select 
            name="size"
            value={inputs.size}
            onChange={value => inputHandler({target : {value, name: "size"}})}>
              <Option value="small">Small</Option>
              <Option value="medium">Medium</Option>
              <Option value="large">Large</Option>
            </Select>
          </Form.Item>

          <Form.Item 
          label={<span style={{ fontFamily: 'cursive', fontSize: '16px' }}>
          Price </span>}
         >
            <Input 
             name="price"
             type="number" 
            value={inputs.price}
            onChange={inputHandler} />
          </Form.Item>

          <Form.Item 
          label={<span style={{ fontFamily: 'cursive', fontSize: '16px' }}>
          Description </span>}
          >
            <Input.TextArea rows={4} 
            name="description"
            value={inputs.description}
            onChange={inputHandler} />
          </Form.Item>

          <Form.Item
          label={<span style={{ fontFamily: 'cursive', fontSize: '16px' }}>
          Stock </span>}
         >
            <Input type="number" 
             name="stock"
            value={inputs.stock}
            onChange={inputHandler} />
          </Form.Item>

          <Form.Item
          label={<span style={{ fontFamily: 'cursive', fontSize: '16px' }}>
          Image </span>}
          >
            {/* <Upload
            name="plantphoto"
              customRequest={() => {}} // You need to implement the file upload logic here
              onChange={handleImage}
              showUploadList={false}
            >
              <Button icon
              ={<UploadOutlined />}>Upload Image</Button>
            </Upload> */}
            <HostImg onUrlChange={handleImage} resetAfterUpload={true} />
            {/* <input type="file" onChange={handleImage}/> */}
          </Form.Item>

          <Form.Item
            label={<span style={{fontFamily: 'cursive', fontSize: '16px' }}>
              Status </span>}
            >
              <Switch
              checkedChildren="ACTIVE" 
              unCheckedChildren="INACTIVE" 
              defaultChecked={inputs.status === "ACTIVE" ? true : false} onChange={handleStatusChange}
               />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 12, span: 16 }}>
            <Button htmlType="submit">
              Save
            </Button>
          </Form.Item>
        </Form>
      </Card>
      </div>
      </div>
  )
}

export default Plant