import React from 'react';
import HomeIcon from '@mui/icons-material/Home';
import EditNoteIcon from '@mui/icons-material/EditNote';
import VisibilityIcon from '@mui/icons-material/Visibility';

const Sidebar = () => {
    
    return (
        <div className="sidebar">

            <ul>
                <a href='/home'><li className='list-item'> 
                <HomeIcon className='icon'/> HOME </li></a>
            </ul>
            <br />
            <div className='list-item'>
                <EditNoteIcon className='icon' fontSize='large'/> Registrations
            </div>
            <ul>
                <a href='/planttype'><li>Plant Type</li></a>
                <a href='/plant'><li>
                    Plant Details
                    </li></a>
            </ul>
            <div className='list-item'>
                <VisibilityIcon className='icon'/> View
            </div>
            <ul>
                <a href="/planttypeview"><li>Plant Type View</li></a>
                <a href="/plantdetailsview"><li>Plant Details View</li></a>

            </ul>

        </div>
    );
};

export default Sidebar;