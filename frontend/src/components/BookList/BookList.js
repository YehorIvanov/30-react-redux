import { useDispatch, useSelector } from 'react-redux';
import { BsBookmarkStarFill, BsBookmarkStar } from 'react-icons/bs';
import './BookList.css';
import {
  deleteBook,
  toggleFavoriteBook,
} from '../../redux/books/actionCreators';
import { selectFilterTitle } from '../../redux/slices/filterSlice';

const BookList = () => {
  const books = useSelector((state) => state.books);
  const titleFilter = useSelector(selectFilterTitle);
  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(titleFilter.toLowerCase())
  );
  const dispatch = useDispatch();
  const handleDeleteBook = (id) => dispatch(deleteBook(id));
  const handleToggleFavorite = (id) => dispatch(toggleFavoriteBook(id));

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
                  {++i}. {book.title} by <strong> {book.author}</strong>
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
