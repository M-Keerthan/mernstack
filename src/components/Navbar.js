import React from 'react'
import { Link,useNavigate } from "react-router-dom"
import Badge from "@material-ui/core/Badge";
import Modal from '../Modal';
import Cart from '../screens/Cart';
import { useState } from 'react';
import { useCart } from './ContextReducer';
function Navbar() {
  const navigate=useNavigate()
  const [cartView,setView]=useState(false)
  let data=useCart()
  const handleLogout=()=>{
    localStorage.removeItem("authToken")
    navigate("\login")
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-success h-200">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">Go Food</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto ">
              <li className="nav-item">
                <Link className="nav-link active fs-5" aria-current="page" to="/">Home</Link>
              </li>
              {
                (localStorage.getItem("authToken")) ?
                  <li className="nav-item">
                    <Link className="nav-link active fs-5" aria-current="page" to="/">My orders</Link>
                  </li> : ""
              }

            </ul>
            {(!localStorage.getItem("authToken")) ?
              <div className='d-flex'>

                <Link className="btn bg-white text-green mx-1" to="/login">Login</Link>


                <Link className="btn bg-white text-green mx-1" to="/createuser">Signup</Link>

              </div>
              : <div>
                <div className="btn bg-white text-green mx-1" to="/cart" onClick={()=>{setView(true)}}>My cart {' '}
                <Badge pill color="error" badgeContent={data.length}/>
                
                </div>
                {cartView ? <Modal onClose={() => setView(false)}><Cart></Cart></Modal> : ""}
                <Link className="btn bg-white text-danger mx-1" to="/login" onClick={handleLogout}>Logout</Link>
              </div>
            }

          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar