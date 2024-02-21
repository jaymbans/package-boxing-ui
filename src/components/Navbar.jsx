import React from 'react'

function Navbar() {
  return (
    <nav>
      <div className="nav-left">
        <img src={require("../media/logo.png")} alt='logo' />
        <h1>PackPack<strong>Ship</strong></h1>
      </div>
      <div className="nav-right">
        <a className='active' href='#'>Packing</a>
        <a href='#'>Shipping</a>
        <a href='#'>Tracking</a>
        <a href='#'>Locations</a>
        <a href='#'>Support</a>
      </div>
    </nav>
  )
}

export default Navbar