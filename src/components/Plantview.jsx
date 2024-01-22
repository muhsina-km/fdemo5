import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import React, { useEffect, useState } from 'react'
import Plantedit from './Plantedit';
import Sb from './Sb';
import { Card } from 'antd';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const Plantview = () => {
    var [ptype, setPtype]  = useState([]);
    var [selected, setSelected] = useState();
    var [update, setUpdate] = useState(false);

    useEffect(() => {
        axios.get("http://localhost:3005/ptview")
            .then(response => {
                console.log(response.data)
                setPtype(response.data)
            })
            .catch(err => console.log(err))
    }, [])

    const deletevalues = (id) => {
        console.log("Deleted", id)
        axios.put("http://localhost:3005/ptupdatestatus/" + id)
            .then((response) => {
                alert("DELETED")
                window.location.reload(false);
            })

    }
    const updatevalues = (value) => {
        console.log("UPDATED", value);
        setSelected(value);
        setUpdate(true);

    }
    var result =
        <div className='background-table'>

            <Navbar/>
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
        marginRight:'5%',
        }}>

            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Plant Type</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Edit</TableCell>
                            <TableCell>Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {ptype.map((value, index) => {
                            return (
                                <TableRow key={index}>
                                    <TableCell>{value.Planttype}</TableCell>
                                    <TableCell>{value.Status}</TableCell>
                                    <TableCell><EditIcon color='secondary' onClick={() => updatevalues(value)} /></TableCell>
                                    <TableCell><DeleteIcon color='error' onClick={() => deletevalues(value._id)} /></TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>

                </Table>
            </TableContainer>
            </Card>
        </div>

    if (update) {
        result = <Plantedit data={selected} method='put' />
    }
    return (result)

}




export default Plantview
