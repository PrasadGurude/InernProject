import React, { useState , useRef} from 'react'

let month;

const Header = () => {
  return (
    <div className='header'>
    <button className='header-btn'>Search Transcation</button>
    <select name='month' className='header-drop'>
      
      <option >All</option>
      <option >January</option>
      <option >February</option>
      <option >March</option>
      <option >April</option>
      <option >May</option>
      <option >June</option>
      <option >July</option>
      <option >August</option>
      <option >September</option>
      <option >October</option>
      <option >November</option>
      <option >December</option>

    </select>
    </div>
  )
}

export default Header ;
