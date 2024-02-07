import React from 'react'
import '../stylesheets/Main.css';
import LocalFloristIcon from '@mui/icons-material/LocalFlorist';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { Fade , JackInTheBox } from "react-awesome-reveal";

const Home = () => {
  return (

    <div className='background-container'>

      <center>

        <lord-icon
          src="https://cdn.lordicon.com/dyfotzbb.json"
          trigger="loop"
          delay="1500"
          stroke="light"
          state="in-reveal"
          colors="primary:#ffffff,secondary:#ffffff"
          style={{ width: '150px', height: '150px' }}
        >
        </lord-icon>
        <h1 style={{ fontFamily: 'Cursive ', color: 'inherit',marginTop: '1px' }}>BloomingBuds</h1>

        <Fade delay={1e3} cascade damping={1e-1} 
        style={{ fontFamily: 'Lucida Handwriting ', color: 'inherit', fontSize: "1.20em", fontWeight: "bolder"}}>
        Blossom Every Moment with BloomingBuds
        </Fade>

        <br />
        <Link to="/login"
          style={{ color: 'white' }}
          hoverable>
          <Button variant="text" color='inherit'>LOGIN</Button>
        </Link>

      </center>

    </div>

  )
}

export default Home