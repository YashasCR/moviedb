import "./App.css";
import React, { useEffect, useState } from "react";
import DisplayMovie from "./components/DisplayMovie";
import { Switch, Route } from "react-router-dom";
import MainNavigation from "./components/MainNavigation";
import AuthForm from "./components/Auth/AuthForm";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router";
import { authActions } from "./store/auth";

function App() {
  const loggedIn=useSelector((state)=>state.auth.isLoggedIn);
  const [isLoggedIn,setIsLoggedin] = useState(false)
  const dispatch=useDispatch();
  const checkIfUserIsLoggedIn =  () => {
const isTokenExist =  localStorage.getItem("token")
console.log(isTokenExist);
if(isTokenExist !== null && isTokenExist){
  dispatch(authActions.login(isTokenExist));
  setIsLoggedin(!isLoggedIn);
}
else{
  setIsLoggedin(false);
}

  }
  useEffect(()=>{
    checkIfUserIsLoggedIn()
  },[loggedIn])
  return (
    <>
      <MainNavigation />
      <Switch>
        {!isLoggedIn && (
          <Route path="/auth">
            <AuthForm />
          </Route>
        )}
        {isLoggedIn && (
          <DisplayMovie />
        )}
        <Route path="*">
          <Redirect to="/auth" />
        </Route>
      </Switch>
    </>
  );
}

export default App;

