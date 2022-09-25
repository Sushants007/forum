import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import './App.css';
import Feed from './Feed';
import Header from './Header';
import Login from './Login';
import { selectUser } from './features/userSlice';


function App() {
  const user = useSelector(selectUser);
  const[searchInput,setSearchInput]=useState("");
  //console.log(searchInput)
  return (
    <div className="app">
      <Header setInput={setSearchInput}/>
      {!user?(
        <Login/>
      ):
      (<div className='app__body'>
      <Feed searchInput={searchInput} setSearchInput={setSearchInput}/>
    </div>)
    }
  </div>
      
      
  );
}

export default App;
