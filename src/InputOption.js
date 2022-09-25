import React, { useState } from 'react';
import './InputOption.css';

function InputOption({Icon,title,color,clickedColor}) {
  const [active,setActive]=useState(false);
  const handleClick=(e)=>{e.preventDefault(); setActive(true)}
  return (
    <div className='inputOption'>
        <Icon style={{color:active?clickedColor:color}} onClick={handleClick}/>
        <h4>{title}</h4>
    </div>
  )
}

export default InputOption