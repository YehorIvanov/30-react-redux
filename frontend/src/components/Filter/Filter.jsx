import './Filter.css';
import {
  selectFilterTitle,
  setTitleFilter,
  resetFilters,
  // setAuthorFilter,
  // setOnlyFavoriteFilter,
} from '../../redux/slices/filterSlice';
import { useDispatch, useSelector } from 'react-redux';

const Filter = () => {
  const filterTitle = useSelector(selectFilterTitle);
  const dispatch = useDispatch();
  const handleTitleFilterChange = (event) =>
    dispatch(setTitleFilter(event.target.value));
  const handleResetFilters = () => dispatch(resetFilters());
  return (
    <div className="app-block filter">
      <div className="filter-row">
        <div className="filter-group">
          <input
            type="text"
            onChange={handleTitleFilterChange}
            placeholder="Filter by title..."
            value={filterTitle}
          />
        </div>
        <button type="button" onClick={handleResetFilters}>
          Reset Filters
        </button>
      </div>
    </div>
  );
};

export default Filter;
