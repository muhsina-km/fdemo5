import React, { useState, useEffect } from 'react'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import axios from 'axios';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import baseurl from "../Api";

const Plantdetailsedit = (props) => {

  var [inputs, setInputs] = useState(props.data)
  var [selectedimage, setSelectedimage] = useState([]);
  var [planttype, setPlanttype] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    console.log(inputs)
    axios.get(baseurl + "/plantdetails/pview")
      .then(response => {
        console.log(response.data)
        setPlanttype(response.data)
      })
      .catch(err => console.log(err))
  }, [])

  const inputHandler = (event) => {
    const { name, value } = event.target
    setInputs((inputs) => ({ ...inputs, [name]: value }))
    console.log(inputs)
  }

  const handleImage = (event) => {
    const file = event.target.files[0];
    setSelectedimage(file)
    inputs.plantphoto = file;
  }

  const savedata = () => {
    const formdata = new FormData();
    formdata.append('plantid', inputs.plantid);
    formdata.append('plantname', inputs.plantname);
    formdata.append('planttype', inputs.planttype);
    formdata.append('color', inputs.color);
    formdata.append('size', inputs.size);
    formdata.append('price', inputs.price);
    formdata.append('description', inputs.description);
    formdata.append('stock', inputs.stock);
    formdata.append('status', inputs.status);
    formdata.append('plantphoto', selectedimage);
    // console.log(formdata);
    console.log(inputs);
    // remove plant photo from inputs
    delete inputs.plantphoto

    const data1 = JSON.stringify(inputs)
    try {
      axios.put(`http://localhost:3005/ptedit/${inputs._id}`, data1)
    }
    catch (error) {
      console.log(error)
    }
    // navigate('/plantdetailsview')
  }

  return (
    <div>
      <Navbar />
      {/* <Sidebar /> */}
      <Card sx={{ minWidth: 500 }}>
        <CardContent>
          <center><h1>Plant Details</h1>

            <form>
              Plant ID : <input type="text" name="plantid" id='p1' value={inputs.plantid} onChange={inputHandler} />
              <br /><br />
              Plant Name : <input type="text" name="plantname" id="p2" value={inputs.plantname} onChange={inputHandler} />
              <br /><br />
              Plant Type :<select name="planttype" value={inputs.planttype} onChange={inputHandler}  >
                {
                  planttype.map((value, index) => {
                    return (
                      <option key={index} value={value._id}>{value.Pname}</option>
                    )
                  })
                }
              </select>
              <br /><br />
              Color : <input type="color" name="clr" id="p4" value={inputs.color} onChange={inputHandler} />
              <br /><br />
              Size :
              <select name='size' value={inputs.size} onChange={inputHandler}>
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
              </select>
              <br /><br />
              Price : <input type="number" name="price" id="p6" value={inputs.price} onChange={inputHandler} />
              <br /><br />
              Description : <textarea rows='4' name='description' id='p7' value={inputs.description} onChange={inputHandler} />
              <br /><br />
              Stock : <input type="number" name="stock" id="p8" value={inputs.stock} onChange={inputHandler} />
              <br /><br />
              Image : <input type="file" onChange={handleImage} />
              <br /><br />
              Status   &nbsp;
              <select name='status' value={inputs.status} onChange={inputHandler}>
                <option value="ACTIVE">ACTIVE</option>
                <option value="INACTIVE">INACTIVE</option>
              </select>
              <br />
              <br />
              <Button variant='contained' onClick={savedata}>SAVE</Button>
            </form>
          </center>

        </CardContent>
      </Card>

    </div>
  )
}

export default Plantdetailsedit