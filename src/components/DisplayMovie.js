import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import axios from "axios";
import { cardDataActions } from "../store/cardcontent";
import { Container } from "@mui/system";
import MovieCard from "./MovieCard";
import { useSelector, useDispatch } from "react-redux";

const DisplayMovie = () => {
  const [APIData, setAPIData] = useState([]);
  const dispatch = useDispatch();

  const { searchTerm, isNewMovieAddedOrUpdated } = useSelector(
    (state) => state.filter
  );

  const displayData = () => {
    axios
      .get(`https://react-poc-947aa-default-rtdb.firebaseio.com/films.json`)
      .then((response) => {
        // console.log(response.data);
        const loadedMovies = [];
        const data = response.data;
        dispatch(cardDataActions.setCardData(data));
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
  }, [isNewMovieAddedOrUpdated]);

  return (
    <>
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
