import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import './Main.css';
import { Button, Card, Form, Input, Select, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import Sb from './Sb';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import baseurl from "../Api";



const { Option } = Select;

const Plant = () => {

  const [form] = Form.useForm();
  
  var [inputs, setInputs] = useState({
    "plantid": '', "plantname": '', "planttypeid": '', "color": '', "size": '',
    "price": '', "description": '', "stock": '', "status": 'ACTIVE'
  })

  var [planttype, setPlanttype] = useState([]);
  var [selectedimage, setSelectedimage] = useState(null);

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

  const handleImage = (info) => {
    // console.log(info.file);
    // if (info.file.status === 'done') {
    //   message.success(`${info.file.name} file uploaded successfully`);
    // } else if (info.file.status === 'error') {
    //   message.error(`${info.file.name} file upload failed.`);
    // }
    const file =info.target.files[0];
    setSelectedimage(file);
    inputs.plantphoto =file;
  };
  

  const savedata = () => {
    console.log("js"+setSelectedimage)
    const formdata = new FormData();
    formdata.append('plantid', inputs.plantid);
    formdata.append('plantname', inputs.plantname);
    formdata.append('planttypeid', inputs.planttypeid);
    formdata.append('color', inputs.color);
    formdata.append('size', inputs.size);
    formdata.append('price', inputs.price);
    formdata.append('description', inputs.description);
    formdata.append('stock', inputs.stock);
    formdata.append('status', inputs.status);
  
    // Append the file properly
    if (selectedimage) {
      formdata.append('plantphoto', selectedimage);
    }
  
    console.log(formdata);
  
    fetch(baseurl+"/plantdetails/pnew", {
      method: 'post',
      body: formdata,
    })
      .then((response) => response.json())
      .then((data) => {
        alert('Record Saved');
      })
      .catch((err) => {
        console.log(err);
      });
    navigate('/plantdetailsview');
  };
  

  return (

    <div className='background-4'>

      <Navbar/>
      <Sidebar/>

      <h1 style={{ textAlign: 'center', marginTop: '12px', marginLeft: '220px' }}>
        Plant Details
      </h1>

      <Card 
      className='background-4'
      bordered={true}
      style={{ 
        width: 500 ,
        height: 800,
        marginTop: "-5%",
        marginBottom: "2%",
        marginLeft: "40%",
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
          label={<span style={{ color: '#ffffff', fontFamily: 'cursive', fontSize: '16px' }}>
          Plant Code </span>}
          >
            <Input  name="plantid"
            value={inputs.plantid}
            onChange={inputHandler} />
          </Form.Item>

          <Form.Item
          label={<span style={{ color: '#ffffff', fontFamily: 'cursive', fontSize: '16px' }}>
          Plant Name </span>} 
          >
            <Input 
            name="plantname"
            value={inputs.plantname}
            onChange={inputHandler} />
          </Form.Item>

          <Form.Item
          label={<span style={{ color: '#ffffff', fontFamily: 'cursive', fontSize: '16px' }}>
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
          label={<span style={{ color: '#ffffff', fontFamily: 'cursive', fontSize: '16px' }}>
          Color </span>}
          >
            <Input 
            name="color"
            value={inputs.color}
            onChange={inputHandler} />
          </Form.Item>

          <Form.Item
          label={<span style={{ color: '#ffffff', fontFamily: 'cursive', fontSize: '16px' }}>
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
          label={<span style={{ color: '#ffffff', fontFamily: 'cursive', fontSize: '16px' }}>
          Price </span>}
         >
            <Input 
             name="price"
             type="number" 
            value={inputs.price}
            onChange={inputHandler} />
          </Form.Item>

          <Form.Item 
          label={<span style={{ color: '#ffffff', fontFamily: 'cursive', fontSize: '16px' }}>
          Description </span>}
          >
            <Input.TextArea rows={4} 
            name="description"
            value={inputs.description}
            onChange={inputHandler} />
          </Form.Item>

          <Form.Item
          label={<span style={{ color: '#ffffff', fontFamily: 'cursive', fontSize: '16px' }}>
          Stock </span>}
         >
            <Input type="number" 
             name="stock"
            value={inputs.stock}
            onChange={inputHandler} />
          </Form.Item>

          <Form.Item
          label={<span style={{ color: '#ffffff', fontFamily: 'cursive', fontSize: '16px' }}>
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
            <input type="file" onChange={handleImage}/>
          </Form.Item>

          <Form.Item
          label={<span style={{ color: '#ffffff', fontFamily: 'cursive', fontSize: '16px' }}>
          Status </span>}
          >
            <Select 
            name="status"
            value={inputs.status}
            onChange={value => inputHandler({target : {value, name: "status"}})}>
              <Option value="ACTIVE">ACTIVE</Option>
              <Option value="INACTIVE">INACTIVE</Option>
            </Select>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 12, span: 16 }}>
            <Button htmlType="submit">
              Save
            </Button>
          </Form.Item>
        </Form>
      </Card>
      </div>
  )
}

export default Plant