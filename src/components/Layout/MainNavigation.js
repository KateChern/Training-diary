import { Link } from 'react-router-dom';
import weight from '../../icons/weight.svg';
import classes from './MainNavigation.module.css';
import logout from '../../icons/logout.svg';

const MainNavigation = () => {
  return (
    <header className={classes.header}>
      <Link  to='/'>
        <div className={classes.navigationContainer}>
            <div className={classes.logo}>Training Diary</div>
            <img src={weight} alt='logo img'/>
        </div>
      </Link>
      <nav>
     
            <div className={classes.loginLogout} >
                <img src={logout} alt='logout img'/>
            </div>
         
      </nav>
    </header>
  );
};

export default MainNavigation;
