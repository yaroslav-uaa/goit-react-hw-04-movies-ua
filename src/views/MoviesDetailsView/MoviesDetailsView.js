import { useEffect, useState, lazy, Suspense } from 'react';
import {
  Route,
  useParams,
  useRouteMatch,
  useHistory,
  useLocation,
} from 'react-router-dom';

import { getMoviesDetails, Status } from '../../services/theMovieDb';

import Loader from '../../components/Loader/Loader';
import Error from '../../components/Error/Error';
import MoviesDetails from '../../components/MovieDetailsPage/MovieDetailsPage';
import { Button } from '@material-ui/core';

const Cast = lazy(() => import('./Cast/Cast'));
const Reviews = lazy(() => import('./Reviews/Reviews'));

const MoviesDetailsView = () => {
  const [movie, setMovie] = useState([]);
  const { movieId } = useParams();
  const { url, path } = useRouteMatch();
  const [status, setStatus] = useState(Status.IDLE);
  const [error, setError] = useState(null);
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    const getMoviesByID = async () => {
      try {
        const result = await getMoviesDetails(movieId);
        setMovie(result);
        setStatus(Status.RESOLVED);
      } catch (error) {
        setError(error.msg);
        setStatus(Status.REJECTED);
        console.log(error.msg);
      }
    };

    getMoviesByID();
  }, [movieId]);

  const goBackHandler = () => {
    history.push(location?.state?.from ?? '/');
  };

  return (
    <>
      {status === Status.PENDING && <Loader />}

      {status === Status.RESOLVED && (
        <div>
          <Button
            onClick={goBackHandler}
            variant="outlined"
            color="secondary"
            style={{ backgroundColor: '#071e3d', margin: '10px 0 0 0' }}
          >
            Back
          </Button>
          <MoviesDetails movie={movie} url={url} location={location} />
          <Suspense fallback={<Loader />}>
            <Route path={`${path}/cast`}>
              {status === Status.RESOLVED && <Cast />}
            </Route>
            <Route path={`${path}/reviews`}>
              {status === Status.RESOLVED && <Reviews />}
            </Route>
          </Suspense>
        </div>
      )}

      {status === Status.REJECTED && error && <Error msg={error} />}
    </>
  );
};

export default MoviesDetailsView;
