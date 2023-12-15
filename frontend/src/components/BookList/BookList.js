import { useDispatch, useSelector } from 'react-redux';
import { BsBookmarkStarFill, BsBookmarkStar } from 'react-icons/bs';
import './BookList.css';
import { deleteBook, toggleFavoriteBook } from '../../redux/slices/booksSlice';
import {
  selectFilterAuthor,
  selectFilterOnlyFavorite,
  selectFilterTitle,
} from '../../redux/slices/filterSlice';
import { selectBooks } from '../../redux/slices/booksSlice';

const BookList = () => {
  const books = useSelector(selectBooks);
  const titleFilter = useSelector(selectFilterTitle);
  const authorFilter = useSelector(selectFilterAuthor);
  const onlyFavoriteFilter = useSelector(selectFilterOnlyFavorite);

  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(titleFilter.toLowerCase()) &&
      book.author.toLowerCase().includes(authorFilter.toLowerCase()) &&
      (onlyFavoriteFilter ? book.isFavorite : true)
  );
  const dispatch = useDispatch();
  const handleDeleteBook = (id) => dispatch(deleteBook(id));
  const handleToggleFavorite = (id) => dispatch(toggleFavoriteBook(id));

  const highlightMatch = (text, filter) => {
    if (!filter) return text;
    const regex = new RegExp(`(${filter})`, 'gi');
    console.log(text.split(regex));
    return text.split(regex).map((substring, i) => {
      if (substring.toLowerCase() === filter.toLowerCase()) {
        return (
          <span key={i} className="highlight">
            {substring}
          </span>
        );
      }
      return substring;
    });
  };

  return (
    <div className="app-block book-list">
      <h2>Book List</h2>
      {books.length === 0 ? (
        <p>No books availabl</p>
      ) : (
        <ul>
          {filteredBooks.map((book, i) => {
            return (
              <li key={book.id}>
                <div className="book-info">
                  {++i}. {highlightMatch(book.title, titleFilter)} by{' '}
                  <strong> {highlightMatch(book.author, authorFilter)}</strong>
                </div>
                <div className="book-actions">
                  {book.isFavorite ? (
                    <BsBookmarkStarFill
                      onClick={() => handleToggleFavorite(book.id)}
                      className="star-icon"
                    />
                  ) : (
                    <BsBookmarkStar
                      onClick={() => handleToggleFavorite(book.id)}
                      className="star-icon"
                    />
                  )}
                  <button onClick={() => handleDeleteBook(book.id)}>
                    Delete
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default BookList;
