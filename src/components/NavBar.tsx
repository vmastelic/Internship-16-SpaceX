import { Link } from 'react-router-dom';
import styles from './NavBar.module.css';

function NavBar(){
    return(
        <>
         <div className={styles.navbar}>
            <Link to="/">Home</Link>
            <Link to="/launches">Launches</Link>
            <button>Theme</button>
         </div>
        </>
    )
}

export default NavBar;