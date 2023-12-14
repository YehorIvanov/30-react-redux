import './Filter.css';
import {
  selectFilterTitle,
  setTitleFilter,
  resetFilters,
  setAuthorFilter,
  selectFilterAuthor,
  selectFilterOnlyFavorite,
  setOnlyFavoriteFilter,
} from '../../redux/slices/filterSlice';
import { useDispatch, useSelector } from 'react-redux';

const Filter = () => {
  const filterTitle = useSelector(selectFilterTitle);
  const filterAuthor = useSelector(selectFilterAuthor);
  const filterOnlyFavorite = useSelector(selectFilterOnlyFavorite);
  const dispatch = useDispatch();
  const handleTitleFilterChange = (event) =>
    dispatch(setTitleFilter(event.target.value));
  const handleAuthorFilterChange = (event) =>
    dispatch(setAuthorFilter(event.target.value));
  const handleOnlyFavoriteFilterChange = () =>
    dispatch(setOnlyFavoriteFilter());
  const handleResetFilters = () => dispatch(resetFilters());
  return (
    <div className="app-block filter">
      <div className="filter-row">
        <div className="filter-group">
          <input
            type="text"
            onChange={handleTitleFilterChange}
            placeholder="Filter by Title..."
            value={filterTitle}
          />
        </div>
        <div className="filter-group">
          <input
            type="text"
            onChange={handleAuthorFilterChange}
            placeholder="Filter by Author..."
            value={filterAuthor}
          />
        </div>
        <div className="filter-group">
          <label>
            <input
              type="checkbox"
              value={filterOnlyFavorite}
              onChange={handleOnlyFavoriteFilterChange}
            />{' '}
            Only Favorite
          </label>
        </div>
        <button type="button" onClick={handleResetFilters}>
          Reset Filters
        </button>
      </div>
    </div>
  );
};

export default Filter;
