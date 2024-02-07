import Login from './adminside/pages/Login';
import Home from './adminside/pages/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Welcomepage from './adminside/pages/Welcomepage';
import Plant from './adminside/pages/add/Plant';
import Plantdetailsview from './adminside/pages/view/Plantdetailsview';
import Sb from './adminside/components/Sb';
import Planttype from './adminside/pages/add/Planttype';
import Plantview from './adminside/pages/view/Plantview';
import Rerouter from './adminside/tools/Rerouter';


function App() {
  return (
    <div>

      
      <BrowserRouter>
      <Routes>

        <Route path='/' element={<Login/>}></Route>

        {/* <Route path='/main' element={<Home></Home>}></Route> */}
        <Route path="/home" element={<Sb></Sb>}></Route>
        <Route path="/replantplantdetails" element={<Rerouter></Rerouter>}></Route>
        <Route path="/replantplanttype" element={<Rerouter></Rerouter>}></Route>
        <Route path="/plant" element={<Sb></Sb>}></Route>
        <Route path="/plantdetailsview" element={<Sb></Sb>}></Route>
        <Route path="/planttype" element={<Sb></Sb>}></Route>
        <Route path="/dashboard" element={<Sb></Sb>}></Route>
        <Route path="/planttypeview" element={<Sb></Sb>}></Route>
      </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
