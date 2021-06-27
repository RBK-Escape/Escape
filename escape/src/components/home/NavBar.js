import React from "react";
import { Link } from "react-router-dom";
import logo from "../../photos/logo.png";

const Navbar = () => {
  return (
    <>
      <nav class="navbar navbar-expand-lg navbar-light  " style={{ backgroundColor: "#0F1111" }}>
        <div class="container-fluid justify-content-between">

          <div class="d-flex">
            <Link to='/' class="navbar-brand me-2 mb-1 d-flex align-items-center" >
              <img
                src={logo}
                height="70"

                alt=""
                loading="lazy"
                style={{ marginTop: '0px', borderRadius: '5px' }}
              />
            </Link>
            {/* //searchBare */}
            {/* <form class="input-group w-auto my-auto d-none d-sm-flex">
        <input
          autocomplete="off"
          type="search"
          class="form-control rounded"
          placeholder="Search"
          style={{minWidth: "125px"}}
        />
        <span  class="input-group-text border-0 d-none d-lg-flex" style={{ backgroundColor: "#0F1111", color:"white"}}
          ><i class="fas fa-search"></i
        ></span>
      </form> */}
            <div class="input-group w-auto my-auto d-none d-sm-flex">
              <span>Escape To Mother Nature</span>
            </div>

          </div>
          <ul class="navbar-nav flex-row d-none d-md-flex">
            <li class="nav-item me-3 me-lg-1">
              <Link to='/' class="nav-link">
                <span style={{ color: "white" }}><i class="fas fa-home fa-lg"></i> Home</span>
              </Link>
            </li>


            <li class="nav-item me-3 me-lg-1">
              <Link to='/store' class="nav-link" style={{ textDecoration: 'none' }} >
                <span style={{ color: "white" }}><i class="fas fa-store fa-lg"></i> Store</span>
              </Link>
            </li>
            <li class="nav-item me-3 me-lg-1">
              <Link to="/blog" class="nav-link d-sm-flex align-items-sm-center" >
                <span style={{ color: "white" }}><i class="fab fa-blogger fa-lg"></i> Blog</span>
              </Link>
            </li>
            <li class="nav-item me-3 me-lg-1">
              <Link to='/about' class="nav-link" style={{ textDecoration: 'none' }}>
                <span style={{ color: "white" }}><i class="fas fa-info-circle fa-lg"></i> About Us</span>
              </Link>
            </li>
          </ul>

          <ul class="navbar-nav flex-row">
            <li class="nav-item me-3 me-lg-1">
              <Link to="/UserAccount" class="nav-link d-sm-flex align-items-sm-center" style={{ textDecoration: 'none' }}>
                <span style={{ color: "white" }}><i class="fas fa-user fa-lg"></i> Acoount</span>
              </Link>
            </li>
            <li class="nav-item me-3 me-lg-1">
              <Link to="/cart" class="nav-link">
                <span style={{ color: "white" }}><i class="fas fa-shopping-bag fa-lg"></i> Cart</span>
              </Link>
            </li>
            <li class="nav-item me-3 me-lg-1" >
              <Link to="/SigIn" class="nav-link" style={{ textDecoration: 'none' }}>
                <span style={{ color: "white" }}><i class="fa fa-sign-in"></i> Sign In</span>
              </Link>
            </li>
          </ul>
        </div>
      </nav>







      {/* <Nav>
      <NavLink to="/">
        <p>imlage</p>
        <Bars />
        <NavMenu>
          <NavLink to="/about" activeStyle>
              About
          </NavLink>
          <NavLink to="/about" activeStyle>
            haha
            </NavLink>
            <NavLink to="/about" activeStyle>
            mamama
            </NavLink>
        </NavMenu>
        <NavBtn>
          <NavBtnLink to ='account' activeStyle>
            Account
          </NavBtnLink>
        </NavBtn>
      </NavLink>
    </Nav> */}
    </>
  );
};

export default Navbar;
