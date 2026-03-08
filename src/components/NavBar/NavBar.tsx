import { Link } from 'react-router-dom';
import styles from './NavBar.module.css';
import { useTheme } from "../../context/ThemeContext";

function NavBar(){
    const { theme, toggleTheme } = useTheme();

    return(
        <>
         <div className={styles.navbar}>
            <Link to="/">Home</Link>
            <Link to="/launches">Launches</Link>
            <button onClick={toggleTheme}>
              {theme === "light" ? "Dark mode" : "Light mode"}
            </button>
         </div>
        </>
    )
}

export default NavBar;