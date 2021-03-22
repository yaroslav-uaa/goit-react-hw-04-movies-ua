import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

import { getReviews, Status } from '../../../services/theMovieDb';

import Loader from '../../../components/Loader';
import r from './Reviews.module.css';

const Reviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(Status.IDLE);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const { results } = await getReviews(movieId);
        if (results.length === 0) {
          toast.info('No reviews for this movie.');
          setStatus(Status.REJECTED);
          return;
        }
        setReviews(results);
        setStatus(Status.RESOLVED);
      } catch (error) {
        setError(error);
        setReviews([]);
        setStatus(Status.REJECTED);
      }
    };
    fetchReviews();
  }, [movieId]);

  return (
    <>
      {status === Status.PENDING && <Loader />}

      {status === Status.REJECTED && error && <p>Something went wrong</p>}

      {status === Status.RESOLVED && (
        <>
          <ul className={r.list}>
            {reviews.map(({ id, author, content }) => (
              <li key={id} className={r.item}>
                <p className={r.authorName}>{author}</p>
                <p className={r.content}>{content}</p>
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
};

Reviews.propTypes = {
  reviews: PropTypes.array,
};

export default Reviews;
