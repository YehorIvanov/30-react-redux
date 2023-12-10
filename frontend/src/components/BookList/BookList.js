import { useSelector } from 'react-redux';
import './BookList.css';
const BookList = () => {
  const books = useSelector((state) => state.books);
  return (
    <div className="app-block book-list">
      <h2>Book List</h2>
      {books.length === 0 ? (
        <p>No books availabl</p>
      ) : (
        <ul>
          {books.map((book, i) => {
            return (
              <li key={book.id}>
                {++i}. {book.title} by<strong>{book.author}</strong>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default BookList;
