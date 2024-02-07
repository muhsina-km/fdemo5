import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Card from '@mui/material/Card';
import axios from 'axios';
import Navbar from '../../components/Navbar';
import '../../stylesheets/Main.css';
import baseurl from "../../../Api";
import { Button, Form, Input, Select, Switch } from 'antd';
import HostImg from '../../components/HostImg';

const Plantdetailsedit = (props) => {

  var [inputs, setInputs] = useState(props.data)
  var [selectedimage, setSelectedimage] = useState([]);
  var [planttype, setPlanttype] = useState([]);
  const [pdetail, setPdetail] = useState({ Plantdetails: "", Status: "ACTIVE" });
  const { Option } = Select;
  const [form] = Form.useForm();
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
      inputs.status = "ACTIVE";
    }
    else{
      inputs.status = "INACTIVE";
    }
  }

  const handleImage = (url) => {
    inputs.plantphoto = url;
  }

  const savedata = async () => {
    console.log(inputs);
  
    try {
      const response = await axios.put(`${baseurl}/plantdetails/pedit/${inputs._id}`, inputs);
      console.log(response.data);  // Assuming the server responds with relevant data upon success
      alert("UPDATED")
      navigate('/replantplantdetails');
    } catch (error) {
      console.error(error);
      // Handle error, show a message to the user, etc.
    }
  };
  

  return (
    <div className='background-4'>
      <h1 style={{ textAlign: 'center', marginTop: '40px', marginLeft: '2px' }}>
        To Update Plant Details
      </h1>

      <Card 
      className='background-4'
      bordered={true}
      style={{ 
        width: 500 ,
        padding: 30,
        borderRadius: 25,
        backgroundColor: 'white',
        border: "1px solid #ffffff",
        height: 800,
        marginTop: "1%",
        marginBottom: "2%",
        marginLeft: "25%",
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
  )
}

export default Plantdetailsedit