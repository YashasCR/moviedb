import "./App.css";
import React, { useState } from "react";
import DisplayMovie from './components/DisplayMovie'
import Navbar from './components/Navbar'
import { Redirect } from 'react-router';

function App() {
 
  return (
  
    <div>
      <Navbar/>
      
      <DisplayMovie />
    </div>
 
  );
}

export default App;

