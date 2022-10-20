import React, { useEffect, useState } from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  Paper,
} from "@mui/material";
import axios from "axios";
import { Link } from "react-router-dom";

const DisplayMovie = () => {
  const [APIData, setAPIData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [modalIsOpen,setModalIsOpen] = useState(false);

    const setModalIsOpenToTrue =()=>{
        setModalIsOpen(true)
    }

    const setModalIsOpenToFalse =()=>{
        setModalIsOpen(false)
    }
  async function displayData() {
    const response = await fetch(
      "https://react-poc-947aa-default-rtdb.firebaseio.com/films.json",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    setAPIData(data);
  }
  async function deleteData(id) {
    console.log(id);
    const response = await fetch(
      `https://react-poc-947aa-default-rtdb.firebaseio.com/films/${id}.json`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    console.log(data);
     displayData();
  }

  useEffect(() => {
    displayData();
  }, []);

  return (
    <>
     {}
      <input
        type="text"
        placeholder="Search.."
        onChange={(event) => {
          setSearchTerm(event.target.value);
        }}
      />

      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Release Date</TableCell>
              <TableCell>Genre</TableCell>
              <TableCell>IMDB Rating</TableCell>
              <TableCell>Update</TableCell>
              <TableCell>Delete</TableCell>
              {/* <TableCell>Movie Poster</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {APIData.filter((val) => {
              if (searchTerm === "") {
                return val;
              } else if (
                val.Title.toLowerCase().includes(searchTerm.toLowerCase())
              ) {
                return val;
              }
            }).map((row) => (
              <TableRow
                key={row.Id}
                sx={{ "&:last-child td,&:last-child th": { border: 0 } }}
              >
                <TableCell>{row.Title}</TableCell>
                <TableCell>{row.Released}</TableCell>
                <TableCell>{row.Genre}</TableCell>
                <TableCell>{row.imdbRating}</TableCell>
                {/* <Link to="/update">
                  <Table.Cell>
                    <button>Update</button>
                  </Table.Cell>
                </Link> */}
                <TableCell>
                  <button onClick={setModalIsOpenToTrue}>Update</button>
                </TableCell>
                <TableCell><button onClick={()=>deleteData((row.Id)-1)}>Delete</button></TableCell>
                {/* <TableCell><img src={row.Poster} width="400" 
     height="500"></img></TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default DisplayMovie;
