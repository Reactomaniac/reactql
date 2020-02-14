import React from "react";
import { NavLink } from "react-router-dom";

const mainNavigation = props => (
  <div class="sidebar" data-color="black" data-active-color="info">
    <div class="logo">
        <NavLink className="simple-text logo-normal" to="/">Events</NavLink>
    </div>
    <div class="sidebar-wrapper">
      <ul class="nav">
        <li class="active">
          <NavLink aria-current="page" className="nav-link active" to="/events">
            <i class="nc-icon nc-bank"></i>
            <p>Events</p>
          </NavLink>
        </li>
      </ul>
    </div>
  </div>
);

export default mainNavigation;
