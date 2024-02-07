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
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import React, { useEffect, useState } from "react";
import Plantedit from "../edit/Plantedit";
import Sb from "../../components/Sb";
import { Card, Popconfirm, Tag } from "antd";
import {
  CheckCircleOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import Navbar from "../../components/Navbar";
import baseurl from "../../../Api";

const Plantview = () => {
  var [ptype, setPtype] = useState([]);
  var [selected, setSelected] = useState();
  var [update, setUpdate] = useState(false);

  useEffect(() => {
    axios
      .get(baseurl + "/planttype/ptview")
      .then((response) => {
        console.log(response.data);
        setPtype(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const deletevalues = (id) => {
    console.log("Deleted", id);
    axios.put(baseurl + "/planttype/ptupdatestatus/" + id).then((response) => {
      alert("DELETED");
      window.location.reload(false);
    });
  };
  const updatevalues = (value) => {
    console.log("UPDATED", value);
    setSelected(value);
    setUpdate(true);
  };
  var result = (
    <div className="background-table">
      <Navbar />

      <h1
        style={{
          textAlign: "center",
          marginTop: "15px",
          marginLeft: "1%",
          color: "#000000",
        }}
      >
        Plant Type View
      </h1>

      <Card
        className="background-2"
        bordered={true}
        style={{
          position: "relative",
          height: "100vh",
          overflowY: "auto",
          marginTop: "-0.1px",
          marginBottom: "8%",
          marginLeft: "5%",
          marginRight: "5%",
        }}
      >
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><b>Plant Type</b></TableCell>
                <TableCell><b>Status</b></TableCell>
                <TableCell><b>Edit</b></TableCell>
                <TableCell><b>Delete</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {ptype.map((value, index) => {
                console.log(value);
                return (
                  <TableRow key={index}>
                    <TableCell>{value.Planttype}</TableCell>
                    <TableCell>
                      {value.Status === "ACTIVE" ? (
                        <Tag icon={<CheckCircleOutlined />} color="success">
                          ACTIVE
                        </Tag>
                      ) : (
                        <Tag
                          icon={<ExclamationCircleOutlined />}
                          color="warning"
                        >
                          INACTIVE
                        </Tag>
                      )}
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
    result = <Plantedit data={selected} method="put" />;
  }
  return result;
};

export default Plantview;
