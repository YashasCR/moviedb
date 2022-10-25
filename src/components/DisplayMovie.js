import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import { CardActions, CardContent, Grid, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { DeleteOutlined } from "@mui/icons-material";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import axios from "axios";
import Update from "./Update";
import AddMovie from "./AddMovie";
import { Container } from "@mui/system";

const DisplayMovie = () => {
  const [APIData, setAPIData] = useState([]);
  const [open, setOpen] = useState(false);
  const [openAddMovie, setOpenAddMovie] = useState(false);
  const [movieData, setMovieData] = useState({});
  const [searchTerm, setSearchTerm] = useState("");

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
  const deleteData = (id) => {
    axios
      .delete(
        `https://react-poc-947aa-default-rtdb.firebaseio.com/films/${id}.json`
      )
      .then(() => {
        displayData();
      });
  };

  useEffect(() => {
    displayData();
  }, []);

  const handleUpdate = (movie) => {
    setMovieData(movie);
    setOpen(true);
  };

  return (
      <>
      <input
          type="text"
          placeholder="Search.."
          onChange={(event) => {
            setSearchTerm(event.target.value);
          }}
        />
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
            <Card>
              <CardMedia
                component="img"
                height="400"
                image={row.Poster}
                sx={{ objectFit: "contain" }}
                alt="Movie Poster"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {row.Title}
                </Typography>
                <Typography variant="caption" display="block" >
                  <span style={{}}>
                <img
                    src="../Images/IMDB-logo.png"
                    style={{ width: 60, height: 30 }}
                  ></img>:{row.imdbRating}</span>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {row.Plot}
                </Typography>
              </CardContent>
              <CardActions>
                <EditIcon onClick={() => handleUpdate(row)} />
                <Update movieData={movieData} setOpen={setOpen} open={open} />
                <DeleteOutlined onClick={() => deleteData(row.Id - 1)} />
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      </Container>
      </>
  );
};

export default DisplayMovie;
