import { Link } from 'react-router-dom';
import styles from './NavBar.module.css';
import { useTheme } from "../../context/ThemeContext";

function NavBar(){
    const { theme, toggleTheme } = useTheme();

    return(
        <>
         <div className={styles.navbar}>
            <Link className={styles.link} to="/">
              Home
            </Link>
            <Link className={styles.link} to="/launches">
              Launches
            </Link>
            <Link className={styles.link} to="/ships">
              Ships
            </Link>
            <button className={styles.button} onClick={toggleTheme}>
              {theme === "light" ? "Dark mode" : "Light mode"}
            </button>
         </div>
        </>
    )
}

export default NavBar;