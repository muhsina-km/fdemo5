import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

const Rerouter = () => {
    const navigate = useNavigate();
    const location = useLocation();
    useEffect(() => {
      switch (location.pathname) {
        case "/replantplantdetails":
          navigate("/plantdetailsview");
          break;
        case "/replantplanttype":
          navigate("/planttypeview");
          break;
      }
    })
  return (
    <div>
      
    </div>
  )
}

export default Rerouter
