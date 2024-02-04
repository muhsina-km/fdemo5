
import Login from './components/Login';
import Home from './components/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Welcomepage from './components/Welcomepage';
import Sidebar from './components/Sidebar';
import Plant from './components/Plant';
import Plantdetailsview from './components/Plantdetailsview';
import Sb from './components/Sb';
import Planttype from './components/Planttype';
import Plantview from './components/Plantview';


function App() {
  return (
    <div>

      
      <BrowserRouter>
      <Routes>

        <Route path='/' element={<Login/>}></Route>

        <Route path='/main' element={<Home></Home>}></Route>
        <Route path="/home" element={<Sb></Sb>}></Route>
        <Route path="/plant" element={<Plant method='post'/>}></Route>
        <Route path="/plantdetailsview" element={<Plantdetailsview method='get'/>}></Route>
        <Route path="/Planttype" element={<Planttype method='post'/>}></Route>
        <Route path="/planttypeview" element={<Plantview method='get'/>}></Route>
      </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
