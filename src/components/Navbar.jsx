import { AppBar, Button, Toolbar, Typography } from '@mui/material'
import LocalFloristIcon from '@mui/icons-material/LocalFlorist';
import { Link } from 'react-router-dom'
import { Box } from '@mui/system'
import React from 'react'

const Navbar = () => {
  return (
    <div>

    <Box>
      <AppBar position="fixed" 
      sx={{ backgroundColor : '#001932' }}>
        <Toolbar>
        <LocalFloristIcon/> &nbsp;
          <Typography variant="h6" 
          component="div" sx={{ flexGrow: 1 ,
          fontFamily : 'Cursive'}}>
            BloomingBuds
          </Typography>
          <Button component={Link} to="/" color="inherit">Logout</Button>
        </Toolbar>
      </AppBar>
    </Box>

    </div>
  )
}

export default Navbar