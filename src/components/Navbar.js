import { useDispatch } from 'react-redux';
import React from "react";
import { filterActions } from '../store/filter';
export default function Navbar() {
  const dispatch = useDispatch();
  
  return (
    <nav>
      <img src="../Images/yifymovies-logo.png" className="nav--logo" />
      <input
        type="text"
        placeholder="Search.."
        onChange={(event) => {
         dispatch(filterActions.setSearchTerm(event.target.value));
        }}
      />
    </nav>
  );
}
