import { Link } from 'react-router-dom';

import '../navBar/NavBar.css';

function NavBar() {
    return(
        <>
    <nav className="navMenu">
      <Link to="/"> Home</Link>
      <Link to="/favMovies"> Favorite Movies </Link>

    </nav>
        </>
    );
    
}
export default NavBar;

