import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import m from './Movie.module.css';

import poster404 from '../../../images/poster404.jpg';

const Movie = ({ poster, id, title, name, releaseDate, url, location }) => (
  <li className={m.movie}>
    <Link to={{ pathname: `${url}/${id}`, state: { from: location } }}>
      <img
        src={poster ? `https://image.tmdb.org/t/p/w500/${poster}` : poster404}
        alt={title || name}
        className={m.movieImage}
      />
      <h2 className={m.title}>
        {title || name}
        {releaseDate && <span> ({releaseDate.slice(0, 4)})</span>}
      </h2>
    </Link>
  </li>
);

Movie.propTypes = {
  poster: PropTypes.string,
  id: PropTypes.number.isRequired,
  title: PropTypes.string,
};

export default Movie;
