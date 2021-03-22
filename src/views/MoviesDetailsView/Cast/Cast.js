import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { getCredits, Status} from '../../../services/theMovieDb';
import avatar404 from '../../../images/avatar404.jpg';


import Loader from '../../../components/Loader';
import s from './Cast.module.css';

const Cast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(Status.IDLE);

  useEffect(() => {
    const getActors = async () => {
      try {
        const { cast } = await getCredits(movieId);
        if (cast.length === 0) {
          toast.info('No results');
          setStatus(Status.IDLE);
          return;
        }
        setCast(cast);
        setStatus(Status.RESOLVED);
      } catch (error) {
        setError(error);
        setCast([]);
        setStatus(Status.REJECTED);
      }
    };
    getActors();
  }, [movieId]);

  return (
    <>
      {status === Status.PENDING && <Loader />}

      {status === Status.RESOLVED && (
        <ul className={s.list}>
          {cast.map(({ id, profile_path, name, character }) => (
            <li key={id} className={s.actor}>
              <img
                className={s.photo}
                src={
                  profile_path
                    ? `https://image.tmdb.org/t/p/w500/${profile_path}`
                    : avatar404
                }
                alt="actor"
              />
              <p className={s.name}>{name}</p>
              <p className={s.character}>{character || 'unknown'}</p>
            </li>
          ))}
        </ul>
      )}

      {status === Status.REJECTED && error && <p>Something went wrong</p>}
    </>
  );
};

export default Cast;
