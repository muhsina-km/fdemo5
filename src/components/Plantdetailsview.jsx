import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Plantdetailsedit from "./Plantdetailsedit";
import { Buffer } from "buffer";
import Navbar from "./Navbar";
import { Modal, Card, Image, Popconfirm, Alert, message, Tag } from "antd";
import baseurl from "../Api";
import { CheckCircleOutlined, ExclamationCircleOutlined } from "@ant-design/icons";

const Plantdetailsview = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  var [Plantdetailsview, setPlantdetailsview] = useState([]);
  const [planttype, setPlanttype] = useState([]);
  var [selected, setSelected] = useState();
  var [update, setUpdate] = useState(false);
  const [trigger, setTrigger] = useState(false);

  useEffect(() => {
    axios
      .get(baseurl + "/plantdetails/pview")
      .then((response) => {
        console.log(response.data);
        setPlantdetailsview(response.data);
      })
      .catch((err) => console.log(err));
      axios.get(baseurl + "/planttype/ptview")
      .then((response) => {
        console.log(response.data);
        setPlanttype(response.data);
      })
  }, [trigger]);

  const deletevalues = (id) => {
    console.log("Deleted", id);
    axios.put(baseurl + "/plantdetails/updatestatus/" + id).then((response) => {
      setTrigger(!trigger);
      messageApi.open({
        type: "success",
        content: "Deleted Successfully",
      });
    });
  };

  const updatevalues = (value) => {
    console.log("Updated", value);
    setSelected(value);
    setUpdate(true);
  };

  var result = (
    <div className="background-table">
      {contextHolder}
      <Navbar />

      <h1
        style={{
          textAlign: "center",
          marginTop: "10px",
          marginLeft: "30px",
          color: "#ffffff",
        }}
      >
        Plant Details View
      </h1>
      <Card
        className="background-2"
        bordered={true}
        style={{
          position: 'relative',
            height: '100vh',
            overflowX: 'hidden',
            overflowY: 'auto',
          marginTop: "-0.1%",
          marginBottom: "2%",
          marginLeft: "3%",
          marginRight: "3%",
        }}
      >
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Plant ID</TableCell>
                <TableCell>Plant Name</TableCell>
                <TableCell>Plant Type</TableCell>
                <TableCell>Color</TableCell>
                <TableCell>Size</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Stock</TableCell>
                <TableCell>Image</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Edit</TableCell>
                <TableCell>Delete</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {Plantdetailsview.map((value, index) => {
                let plantType = planttype.find(type => type._id === value.planttypeid);
                return (
                  <TableRow key={index}>
                    <TableCell>{value.plantid}</TableCell>
                    <TableCell>{value.plantname}</TableCell>
                    <TableCell>{plantType ? plantType.Planttype : "N/A"}</TableCell>
                    <TableCell>{value.color}</TableCell>
                    <TableCell>{value.size}</TableCell>
                    <TableCell>{value.price}</TableCell>
                    <TableCell>{value.description}</TableCell>
                    <TableCell>{value.stock}</TableCell>
                    <TableCell>
                      <Image
                        src={value.plantphoto}
                        style={{
                          height: "100px",
                          width: "100px",
                          objectFit: "contain",
                        }}
                        alt="Error"
                      />
                    </TableCell>
                    <TableCell>
                      {value.status==="ACTIVE" ? <Tag icon={<CheckCircleOutlined />} color="success">
                        ACTIVE
                      </Tag> : <Tag icon={<ExclamationCircleOutlined />} color="warning">
                        INACTIVE
                      </Tag>}
                    </TableCell>
                    <TableCell>
                      <EditIcon
                        color="secondary"
                        onClick={() => updatevalues(value)}
                      />
                    </TableCell>
                    <TableCell>
                      <Popconfirm
                        title="Delete the task"
                        description="Are you sure to delete this item?"
                        onConfirm={() => deletevalues(value._id)}
                        okText="Yes"
                        cancelText="No"
                      >
                        <DeleteIcon color="error" />
                      </Popconfirm>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </div>
  );

  if (update) {
    result = <Plantdetailsedit data={selected} method="put" />;
  }

  return result;
};

export default Plantdetailsview;
