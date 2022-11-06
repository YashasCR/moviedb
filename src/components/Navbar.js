import { useDispatch } from 'react-redux';
import React from "react";
import { filterActions } from '../store/filter';
export default function Navbar() {
  const dispatch = useDispatch();
  
  return (
    <nav>
      <input
        type="text"
        placeholder="Search.."
        onChange={(event) => {
         dispatch(filterActions.setSearchTerm(event.target.value))
        }}
      />
    </nav>
  );
}
