import { Link } from "react-router-dom";
import classes from "./MainNavigation.module.css";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../store/auth";
import Navbar from "./Navbar";
import AddMovie from "./AddMovie";
import { useState } from "react";
const MainNavigation = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [openAddMovie, setOpenAddMovie] = useState(false);

  const logoutHandler = () => {
    dispatch(authActions.logout());
    localStorage.removeItem("token");
    history.replace("/auth");
    // optional: redirect the user
  };

  return (
    <header className={classes.header}>
      <Link to="/">
        <div>
          <img src="../Images/yifymovies-logo.png" alt="logo" className={classes.logo} />
        </div>
      </Link>
      <nav>
        <ul>
          {!isLoggedIn && (
            <li>
              <Link to="/auth">Login</Link>
            </li>
          )}
          {isLoggedIn && (
            <>
              <li>
                <Navbar />
              </li>
              <li>
                <button onClick={() => setOpenAddMovie(true)}>Add Movie</button>
                <AddMovie
                  setOpen={setOpenAddMovie}
                  open={openAddMovie}
                />
              </li>
              <li>
                <button onClick={logoutHandler}>Logout</button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
