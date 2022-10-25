
import React, { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import DialogTitle from '@mui/material/DialogTitle';

export default function Update(props) {
    const {movieData , setOpen , open} = props;
    const [movieTitle, setMovieTitle] = useState('');
    const [movieGenre, setMovieGenre] = useState('');

  const handleClose = () => {
    setOpen(false)
  };

  
  async function updateData(data) {
    const id=data.Id-1;
     await fetch(
      `https://react-poc-947aa-default-rtdb.firebaseio.com/films/${id}.json`,
      {
        method: "PUT",
        body:JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
  const handleUpdate=()=>{
    movieData.Genre=movieGenre.length>0?movieGenre:movieData.Genre;
    movieData.Title=movieTitle.length>0?movieTitle:movieData.Title;
    updateData(movieData);
    handleClose();
  }

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
            onChange={(e)=>{setMovieTitle(e.target.value)}}
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
            onChange={(e)=>{setMovieGenre(e.target.value)}}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleUpdate}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
    
}

