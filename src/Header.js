import { Home, Search } from '@mui/icons-material';

import React from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from './features/userSlice';
import './Header.css';
import HeaderOption from './HeaderOption';

function Header({setInput}) {
  const handleChange=(e)=>{
    e.preventDefault();
    setInput(e.target.value)
  }
  const user = useSelector(selectUser);
  return (
    <div className='header'> 
        <div className='header__left'> 
            <div className='header__search'> 
              <Search/>
              <input type="text" placeholder='search' onChange={handleChange}/>
            </div>
        </div>
        <div className='header__right'> 
          <HeaderOption Icon={Home} title="Home" />
          <HeaderOption avatar={user.photoUrl} title="Me"/>
        </div>
    </div>
   
  )
}

export default Header