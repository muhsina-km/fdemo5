import React, { useState } from "react";
import axios from "axios";
import { Button, Input, Select, Card, Form, Switch } from "antd";
import { useNavigate } from "react-router-dom";
import baseurl from "../../../Api";
import HostImgCrop from "../../components/HostImgCrop";
const { Option } = Select;


const Planttype = () => {
  const [form] = Form.useForm();
  const [ptype, setPtype] = useState({ Planttype: "",Planttypephoto: "", Status: "AVAILABLE" });
  const [selectedimage, setSelectedimage] = useState(null);

  const navigate = useNavigate();

  const handleStatusChange = (e) => {
    if(e){
      setPtype((ptype) => ({ ...ptype, Status: "AVAILABLE" }));
    }
    else{
      setPtype((ptype) => ({ ...ptype, Status: "UNAVAILABLE" }));
    }
  }

  const ptypehandler = (event) => {
    const {name, value} = event.target
  setPtype((ptype) => ({ ...ptype, [name]: value }));
  console.log(ptype)
  };

  const HandlePtImage = (info) => {
    console.log(info)
    ptype.Planttypephoto =info
    setSelectedimage(info);
    return
  }

  const saveData = () => {
    console.log(ptype);
    axios
      .post(baseurl+"/planttype/ptnew", ptype)
      .then((response) => {
        alert("Record saved");
      })
      .catch((err) => console.log(err));
    navigate("/planttypeview");
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
          height: 350,
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
              PlantType Image </span>}
            >
              <HostImgCrop onUrlChange={HandlePtImage} resetAfterUpload={true} />
              </Form.Item>


          <Form.Item
            label={<span style={{fontFamily: 'cursive', fontSize: '16px' }}>
              Status </span>}
            >
              <Switch
              checkedChildren="AVAILABLE" 
              unCheckedChildren="UNAVAILABLE" 
              defaultChecked={ptype.Status === "AVAILABLE" ? true : false} onChange={handleStatusChange}
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
