import { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';

import { Pagination } from '@material-ui/lab';

import { getTrending, Status } from '../../services/theMovieDb';

import MoviesList from '../../components/MoviesList/MoviesList';
import Loader from '../../components/Loader/Loader';
import Error from '../../components/Error/Error';
import h from './HomeView.module.css';

const HomeView = () => {
  const [movies, setMovies] = useState([]);
  const [status, setStatus] = useState(Status.PENDING);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const history = useHistory();
  const location = useLocation();

  const page = new URLSearchParams(location.search).get('page') ?? 1;

  useEffect(() => {
    setStatus(Status.PENDING);
    const getMovies = async () => {
      try {
        const { results, total_pages } = await getTrending(page);
        setMovies(results);
        setTotalPages(total_pages);
        setStatus(Status.RESOLVED);
      } catch (error) {
        setError(error);
        setStatus(Status.REJECTED);
      }
    };
    getMovies();
  }, [page]);

  const pageHandler = (event, page) => {
    history.push({ ...location, search: `page=${page}` });
  };

  return (
    <>
      <h2 className={h.title}>Trending today</h2>
      {status === Status.PENDING && <Loader />}
      {status === Status.REJECTED && error && <Error msg={error} />}
      {status === Status.RESOLVED && (
        <>
          <MoviesList movies={movies} url={'movies'} location={'/'} />
          {totalPages > 1 && (
            <div className={h.pagination}>
              <Pagination
                count={totalPages}
                onChange={pageHandler}
                page={Number(page)}
                showFirstButton
                showLastButton
                shape="rounded"
                color="secondary"
                style={{ margin: '10px 0 0 0' }}
              />
            </div>
          )}
        </>
      )}
    </>
  );
};

export default HomeView;
