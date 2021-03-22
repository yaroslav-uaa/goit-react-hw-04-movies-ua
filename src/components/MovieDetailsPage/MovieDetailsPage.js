import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import m from './MovieDetailsPage.module.css';

import poster404 from '../../images/poster404.jpg';

const MoviesDetails = ({ movie, url, location }) => {
  return (
    <>
      <div className={m.details}>
        <img
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
              : poster404
          }
          alt={movie.title && movie.original_name}
          width="350px"
          className={m.poster}
        />
        <div className={m.description}>
          <h2 className={m.title}>
            {movie.title && movie.original_nam}
            {movie.title}
            {movie.release_date && (
              <span> ({movie.release_date.slice(0, 4)})</span>
            )}
          </h2>
          <h3 className={m.title}>
            Rating:
            <span className={(m.info, m.rating)}>⭐{movie.vote_average}</span>
          </h3>
          <h3 className={m.title}>Overview</h3>
          <p className={m.info}>{movie.overview}</p>
          <h2 className={m.title}>
            Genres:
            <ul className={m.genreList}>
              {movie.genres.map(genre => (
                <li key={genre.id}>{genre.name}</li>
              ))}
            </ul>
          </h2>
        </div>
      </div>
      <nav className={m.navigation}>
        <NavLink
          to={{
            pathname: `${url}/cast`,
            state: { from: location.state ? location.state.from : '/' },
          }}
          className={m.link}
          activeClassName={m.activeLink}
        >
          Credits
        </NavLink>

        <NavLink
          to={{
            pathname: `${url}/reviews`,
            state: { from: location.state ? location.state.from : '/' },
          }}
          className={m.link}
          activeClassName={m.activeLink}
        >
          Reviews
        </NavLink>
      </nav>
    </>
  );
};

MoviesDetails.propTypes = {
  movie: PropTypes.object.isRequired,
  url: PropTypes.string.isRequired,
};

export default MoviesDetails;
