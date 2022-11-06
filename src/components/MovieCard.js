import React, { useState } from "react";
import Card from "@mui/material/Card";
import { CardActions, CardContent } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { DeleteOutlined } from "@mui/icons-material";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Update from "./Update";
import axios from "axios";

export default function MovieCard(props) {
  const [open, setOpen] = useState(false);

  const deleteData = (id) => {
    axios
      .delete(
        `https://react-poc-947aa-default-rtdb.firebaseio.com/films/${id}.json`
      )
      .then(() => {
        props.displayData();
      });
  };
  const handleUpdate = () => {

   
      setOpen(true);
   
    
  };

  return (
    <Card>
    <CardMedia
      component="img"
      height="400"
      image={props.Poster}
      sx={{ objectFit: "contain" }}
      alt="Movie Poster"
    />
    <CardContent>
      <Typography gutterBottom variant="h5" component="div">
        {props.Title}
      </Typography>
      <Typography variant="caption">
        
      <img
          src="../Images/IMDB-logo.png"
          style={{ width: 60, height: 30 }}
        ></img>:{props.imdbRating}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {props.Plot}
      </Typography>
    </CardContent>
    <CardActions>
      <EditIcon onClick={() => handleUpdate()} />
      <Update movieData={props} setOpen={setOpen} open={open} />
      <DeleteOutlined onClick={() => deleteData(props.Id - 1)} />
    </CardActions>
  </Card>
  )
}
