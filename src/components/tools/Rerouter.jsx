import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const Rerouter = () => {
    const navigate = useNavigate();
    useEffect(() => {
      navigate("/plantdetailsview");
      
    })
  return (
    <div>
      
    </div>
  )
}

export default Rerouter
