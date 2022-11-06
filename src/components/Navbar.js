import { useDispatch } from 'react-redux';
import React, { useState } from "react";
import AddMovie from "./AddMovie";
import { filterActions } from '../store/filter';
export default function Navbar() {
  const dispatch = useDispatch();
  const [openAddMovie, setOpenAddMovie] = useState(false);
  return (
    <nav>
      <input
        type="text"
        placeholder="Search.."
        onChange={(event) => {
         dispatch(filterActions.setSearchTerm(event.target.value))
        }}
      />
      <button onClick={() => setOpenAddMovie(true)}>Add Movie</button>
      <AddMovie
        movieData={APIData}
        setOpen={setOpenAddMovie}
        open={openAddMovie}
      />
    </nav>
  );
}
