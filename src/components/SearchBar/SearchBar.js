import { useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

import s from './SearchBar.module.css';

const SearchBar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const handleChange = ({ currentTarget }) => {
    setQuery(currentTarget.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (query.trim() === '') {
      toast.info('Enter the movie you want to search ');
      return;
    }
    onSubmit(query);
    setQuery('');
  };

  return (
    <>
      <header className={s.SearchBar}>
        <form className={s.SearchForm} onSubmit={handleSubmit}>
          <input
            className={s.SearchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search movies"
            onChange={handleChange}
          />
          <button type="submit" className={s.SearchFormButton}>
            <span className={s.SearchFormButtonLabel}>Search</span>
          </button>
        </form>
      </header>
    </>
  );
};

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default SearchBar;
