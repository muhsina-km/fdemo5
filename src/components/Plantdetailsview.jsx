import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Plantdetailsedit from './Plantdetailsedit';
import { Buffer } from 'buffer'
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { Modal, Card } from 'antd';

const Plantdetailsview = () => {

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

  var [Plantdetailsview, setPlantdetailsview] = useState([])
  var [selected, setSelected] = useState();
  var [update, setUpdate] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:3005/pview/")
      .then(response => {
        console.log(response.data)
        setPlantdetailsview(response.data)
      })
      .catch(err => console.log(err))
  }, [])

  const deletevalues = (id) => {
    console.log("Deleted", id)
    axios.put("http://localhost:3005/updatestatus/" + id)
      .then((response) => {
        alert("DELETED")
        window.location.reload(false);
      })
  }

  const updatevalues = (value) => {
    console.log("Updated", value);
    setSelected(value);
    setUpdate(true);
  }

  var result =

    <div className='background-table'>

      <Navbar />
      <Sidebar/>

      <h1 style={{ textAlign: 'center', marginTop: '100px', marginLeft: '100px', color: '#ffffff' }}>
        Plant Details View
      </h1>

      <Card
      className='background-2'
      bordered={true}
      style={{ 
        marginTop: "-0.1%",
        marginBottom: "2%",
        marginLeft:'20%',
        marginRight:'3%'
        }}>

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
              return (
                <TableRow key={index}>
                  <TableCell>{value.plantid}</TableCell>
                  <TableCell>{value.plantname}</TableCell>
                  <TableCell>{value.planttype}</TableCell>
                  <TableCell>{value.color}</TableCell>
                  <TableCell>{value.size}</TableCell>
                  <TableCell>{value.price}</TableCell>
                  <TableCell>{value.description}</TableCell>
                  <TableCell>{value.stock}</TableCell>
                  <TableCell>
                    <img src={`data:image/jpeg;base64,${Buffer.from(value.plantphoto.data).toString('base64')}`} width="50" height="50" alt="Error" />
                  </TableCell>
                  <TableCell>{value.status}</TableCell>
                  <TableCell>
                    <EditIcon color='secondary' onClick={() => updatevalues(value)} />
                  </TableCell>
                  <TableCell>
                    <DeleteIcon color='error' onClick={() => deletevalues(value._id)} />
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>

        </Table>
      </TableContainer>
</Card>
    </div>

  if (update) {
    result = <Plantdetailsedit data={selected} method='put' />
  }

  return (result)
}


export default Plantdetailsview