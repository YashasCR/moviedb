import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import { useDispatch, useSelector} from 'react-redux';
import { filterActions } from "../store/filter";

export default function AddMovie(props) {
  const { setOpen, open } = props;
  const dispatch=useDispatch();
  const id = (useSelector((state) => state.cardContent.cardData)).length;
  const initialValues = {
    Actors: "",
    Awards: "",
    Genre: "",
    Director: "",
    Language: "",
    Title: "",
    imdbRating: "",
    Poster: "",
    Released: "",
  };
  const handleClose = () => {
    setOpen(false);
    setTimeout(()=>{
      dispatch(filterActions.setIsNewMovieAddedOrUpdated(false));
      // redux toolkit value to false
    },5000)
  };

  const [values, setValues] = useState(initialValues);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
      Id: id + 1,
    });
  };

  const addMovieData =async (data) => {
    const uploadMovie = await axios.post(
      `https://react-poc-947aa-default-rtdb.firebaseio.com/films.json`,
      JSON.stringify(data)
    );

    if(uploadMovie){
      dispatch(filterActions.setIsNewMovieAddedOrUpdated(true))
      handleClose();
      // redux toolkit -> update value to setUpload to true
    }
  };
  const handleCreate = () => {
    addMovieData(values);
    
  };
  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Movie </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="Title"
            label="Title"
            type="text"
            fullWidth
            variant="standard"
            value={values.Title}
            onChange={handleInputChange}
          />
          <TextField
            autoFocus
            margin="dense"
            name="Actors"
            label="Actors"
            type="text"
            fullWidth
            variant="standard"
            value={values.Actors}
            onChange={handleInputChange}
          />
          <TextField
            autoFocus
            margin="dense"
            name="Awards"
            label="Awards"
            type="text"
            fullWidth
            variant="standard"
            value={values.Awards}
            onChange={handleInputChange}
          />
          <TextField
            autoFocus
            margin="dense"
            name="Genre"
            label="Genre"
            type="text"
            fullWidth
            variant="standard"
            value={values.Genre}
            onChange={handleInputChange}
          />
          <TextField
            autoFocus
            margin="dense"
            name="Director"
            label="Director"
            type="text"
            fullWidth
            variant="standard"
            value={values.Director}
            onChange={handleInputChange}
          />
          <TextField
            autoFocus
            margin="dense"
            name="Language"
            label="Language"
            type="text"
            fullWidth
            variant="standard"
            value={values.Language}
            onChange={handleInputChange}
          />
          <TextField
            autoFocus
            margin="dense"
            name="imdbRating"
            label="IMDB Rating"
            type="text"
            fullWidth
            variant="standard"
            value={values.imdbRating}
            onChange={handleInputChange}
          />
          <TextField
            autoFocus
            margin="dense"
            name="Poster"
            label="Poster"
            type="text"
            fullWidth
            variant="standard"
            value={values.Poster}
            onChange={handleInputChange}
          />
          <TextField
            autoFocus
            margin="dense"
            name="Released"
            label="Released Date"
            type="date"
            fullWidth
            variant="standard"
            value={values.Released}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleCreate}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
