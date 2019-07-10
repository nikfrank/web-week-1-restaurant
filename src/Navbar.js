import React from 'react';
import './Navbar.css';

import { Link } from 'react-router-dom';

const Navbar = ()=> (
  <div className='Navbar'>
    <h1>Taco Tuesday</h1>
    <ul>
      <li><div>Menu Base</div></li>
      <li>
        <Link to='/home'>
          <div>Home</div>
        </Link>
      </li>
      <li>
        <Link to='/menu'>
          <div>Menu</div>
        </Link>
      </li>
      <li>
        <Link to='/contact'>
          <div>Contact</div>
        </Link>
      </li>
    </ul>
  </div>
);

export default Navbar;
