import { useState, useEffect } from 'react';
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom';
import { Pagination } from '@material-ui/lab';

import { searchMovies, Status } from '../../services/theMovieDb';

import SearchBar from '../../components/SearchBar/SearchBar';
import MoviesList from '../../components/MoviesList/MoviesList';
import Loader from '../../components/Loader/Loader';
import Error from '../../components/Error/Error';
import m from './MoviesView.module.css';

const MoviesView = () => {
  const history = useHistory();
  const location = useLocation();
  const { url } = useRouteMatch();
  const [totalPages, setTotalPages] = useState(0);
  const [status, setStatus] = useState(Status.IDLE);
  const [movies, setMovies] = useState(null);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState('');

  const page = new URLSearchParams(location.search).get('page') ?? 1;

  useEffect(() => {
    if (location.search === '') {
      return;
    }

    const newQuery = new URLSearchParams(location.search).get('query');
    setQuery(newQuery, page);
  }, [location.search, page]);

  useEffect(() => {
    if (!query) return;
    const getMoviesBySearch = async () => {
      setStatus(Status.PENDING);
      try {
        const { results, total_pages } = await searchMovies(query, page);
        if (results.length === 0) {
          setError(`Nothing was found for your search "${query}"`);
          setStatus(Status.REJECTED);
          return;
        }
        setMovies(results);
        setTotalPages(total_pages);
        setStatus(Status.RESOLVED);
      } catch (error) {
        setStatus(Status.REJECTED);
      }
    };
    getMoviesBySearch();
  }, [query, page]);

  const searchHandler = newQuery => {
    if (query === newQuery) return;
    setQuery(newQuery);
    setMovies(null);
    setError(null);
    setStatus(Status.IDLE);
    history.push({ ...location, search: `query=${newQuery}&page=1` });
  };

  const pageHandler = (event, page) => {
    history.push({ ...location, search: `query=${query}&page=${page}` });
  };

  return (
    <>
      <SearchBar onSubmit={searchHandler} />
      {status === Status.PENDING && <Loader />}
      {status === Status.RESOLVED && (
        <>
          <MoviesList movies={movies} url={url} location={location} />
          {totalPages > 1 && (
            <div className={m.wrapper}>
              <Pagination
                count={totalPages}
                onChange={pageHandler}
                page={Number(page)}
                showFirstButton
                showLastButton
                variant="outlined"
                shape="rounded"
              />
            </div>
          )}
        </>
      )}
      {status === Status.REJECTED && error && <Error msg={error} />}
    </>
  );
};

export default MoviesView;
