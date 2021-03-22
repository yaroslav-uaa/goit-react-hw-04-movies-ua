import { NavLink } from 'react-router-dom';
import n from './Navigation.module.css';

const Navigation = () => (
  <>
    <header className={n.navBar}>
      <nav className={n.navigation}>
        <NavLink exact to="/" className={n.link} activeClassName={n.activeLink}>
          Home
        </NavLink>

        <NavLink to="/movies" className={n.link} activeClassName={n.activeLink}>
          Movies
        </NavLink>
      </nav>
    </header>
  </>
);

export default Navigation;
