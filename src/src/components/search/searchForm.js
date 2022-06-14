import { useNavigate } from 'react-router-dom';
import { STR, T } from '../translation';
import { useContext, useState, useEffect } from 'react';
import { GlobalContext } from '../../contexts/globalContext';

const SearchForm = () => {
  const { state } = useContext(GlobalContext);
  const [searchValue, setSearchValue] = useState(state.searchTerm);
  const navigation = useNavigate();

  const setInputValue = (evt) => {
    const value = evt.target.value;
    setSearchValue(value);
  };

  useEffect(() => {
    setSearchValue(state.searchTerm);
  }, [state.searchTerm]);

  const onSubmit = (evt) => {
    evt.preventDefault();
    navigation(`/products/search?searchTerm=${searchValue}`);
  };

  return (
    <form className="search-form" onSubmit={onSubmit}>
      <button type="submit" className="search-form__icon">
        <span className="visually-hidden">Search</span>
        <svg className="svg-search" aria-hidden="true">
          <use href="#svg-search" />
        </svg>
      </button>
      <label htmlFor="home-search" className="visually-hidden">
        <T strProp="searchFormLabelText" />
      </label>
      <input
        type="text"
        name="home-search"
        id="home-search"
        className="search-form__input"
        placeholder={STR('searchFormLabelText')}
        onChange={setInputValue}
        value={searchValue}
      />
    </form>
  );
};

export { SearchForm };
