import Movie from './Movie/Movie';
import PropTypes from 'prop-types';

import m from './MoviesList.module.css';

const MoviesList = ({ movies, url, location }) => {
  return (
    <ul className={m.movieList}>
      {movies.map(({ id, title, name, release_date, poster_path }) => (
        <Movie
          key={id}
          title={title}
          name={name}
          releaseDate={release_date}
          id={id}
          poster={poster_path}
          url={url}
          location={location}
        />
      ))}
    </ul>
  );
};

MoviesList.propTypes = {
  movies: PropTypes.array.isRequired,
};

export default MoviesList;
