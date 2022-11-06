import { Link } from 'react-router-dom';
import classes from './MainNavigation.module.css';
import { useHistory } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import { authActions } from '../../store/auth';

const MainNavigation = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state)=>state.auth.isLoggedIn);

  const logoutHandler = () => {
    dispatch(authActions.logout());
    history.replace('/auth');
    // optional: redirect the user
  };

  return (
    <header className={classes.header}>
      <Link to='/'>
        <div className={classes.logo}>Yify Movies</div>
      </Link>
      <nav>
        <ul>
          {!isLoggedIn && (
            <li>
              <Link to='/auth'>Login</Link>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <button onClick={logoutHandler}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
