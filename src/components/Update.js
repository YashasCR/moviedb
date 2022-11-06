import React, {  useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import { useDispatch } from "react-redux";
import { filterActions } from "../store/filter";

export default function Update(props) {
  const { movieData, setOpen, open } = props;
  const [movieTitle, setMovieTitle] = useState("");
  const [movieGenre, setMovieGenre] = useState("");
  

  const dispatch=useDispatch();
  
  const handleClose = () => {
   
    setOpen(false);
    dispatch(filterActions.setIsNewMovieAddedOrUpdated(true));
    setTimeout(()=>{
      dispatch(filterActions.setIsNewMovieAddedOrUpdated(false));
    },10000)
  };

  const updateData = async () => {
    let data = movieData

    const updatedData = {
      ...data,
      Title : movieTitle?.length > 0 ? movieTitle : movieData.Title,
      Genre:movieGenre?.length > 0 ? movieGenre : movieData.Genre
      
    }

    console.log(updatedData,"data update hua")
    const id = data.Id - 1;
    const isDataUpdated =  await axios.put(
      `https://react-poc-947aa-default-rtdb.firebaseio.com/films/${id}.json`,
      JSON.stringify(updatedData)
    );
    if(isDataUpdated){
      handleClose();
    }
  };
  
  // const handleUpdate = () => {
    
    // setMovie((prevState)=>{
    //   return{
    //     ...prevState,
    //    e,
    //    Title:
    //   }
    // });

    

    // setMovie({...movie,Title:movieTitle?.length > 0 ? movieTitle : movieData.Title,Genre:movieGenre?.length > 0 ? movieGenre : movieData.Genre,\})
    
    // setMovie({
    //   ...movie,
    //   movie.,
    //   movie.
      
    // });

    // props.movieData.Genre=movieGenre;
    // props.movieData.Title=movieTitle;
    // movieData.Genre = movieGenre?.length > 0 ? movieGenre : movieData.Genre;
    // movieData.Title = movieTitle?.length > 0 ? movieTitle : movieData.Title;
  //   updateData(movie);
  // };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Update Movie </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Title"
            type="text"
            fullWidth
            variant="standard"
            defaultValue={movieData.Title}
            onChange={(e) => {
              setMovieTitle(e.target.value);
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="genre"
            label="Genre"
            type="text"
            fullWidth
            variant="standard"
            defaultValue={movieData.Genre}
            onChange={(e) => {
              setMovieGenre(e.target.value);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={updateData}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
