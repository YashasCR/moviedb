import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import axios from "axios";
import AddMovie from "./AddMovie";
import { Container } from "@mui/system";
import MovieCard from "./MovieCard";
import { useSelector,useDispatch } from 'react-redux';

const DisplayMovie = () => {
  const [APIData, setAPIData] = useState([]);

  const [openAddMovie, setOpenAddMovie] = useState(false);

  const searchTerm=useSelector((state)=>state.filter.searchTerm);

  const displayData = () => {
    axios
      .get(`https://react-poc-947aa-default-rtdb.firebaseio.com/films.json`)
      .then((response) => {
        // console.log(response.data);
        const loadedMovies = [];
        const data = response.data;
        for (const key in data) {
          const movie = data[key];
          if (movie !== null) {
            loadedMovies.push(movie);
          }
        }
        setAPIData(loadedMovies);
      });
  };

  useEffect(() => {
    displayData();
  }, []);

  return (
    <>
      
      <button onClick={() => setOpenAddMovie(true)}>Add Movie</button>
      <AddMovie
        movieData={APIData}
        setOpen={setOpenAddMovie}
        open={openAddMovie}
      />

      <Container>
        <Grid container spacing={3}>
          {APIData.filter((val) => {
            if (searchTerm === "") {
              return val;
            } else if (
              val.Title.toLowerCase().includes(searchTerm.toLowerCase())
            ) {
              return val;
            }
          }).map((row) => (
            <Grid item key={row.Id} xs={12} md={6} lg={3}>
              <MovieCard {...row} displayData={displayData} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default DisplayMovie;
