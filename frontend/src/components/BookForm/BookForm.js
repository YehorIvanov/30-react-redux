import './BookForm.css';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

import booksData from '../../data/books.json';
import createBookWithId from '../../utils/createBookWithId';
import { addBook, fetchBook } from '../../redux/slices/booksSlice';
import { setError } from '../../redux/slices/errorSlice';

const BookForm = () => {
  const [title, setTille] = useState('');
  const [author, setAuthor] = useState('');
  const dispatch = useDispatch();

  const handleSubmite = (event) => {
    event.preventDefault();
    if (title && author) {
      dispatch(addBook(createBookWithId({ title, author }, 'Manual')));
      setTille('');
      setAuthor('');
    } else {
      dispatch(setError('You must fill Title and Author'));
    }
  };
  const handleAddRandomBook = (event) => {
    event.preventDefault();
    const getRendomBook = (booksData) =>
      booksData[Math.floor(Math.random() * (booksData.length + 1))];
    dispatch(addBook(createBookWithId(getRendomBook(booksData), 'Random')));
  };

  const handleAddRandomBookViaAPI = () => {
    dispatch(fetchBook());
  };

  return (
    <div className="app-block book-form">
      <h2>Add a new book</h2>
      <form onSubmit={handleSubmite}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(event) => setTille(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="author">author:</label>
          <input
            type="text"
            id="author"
            value={author}
            onChange={(event) => setAuthor(event.target.value)}
          />
        </div>
        <button type="submite">Add Book</button>
        <button type="button" onClick={handleAddRandomBook}>
          Add Random
        </button>
        <button type="button" onClick={handleAddRandomBookViaAPI}>
          Add Random via API
        </button>
      </form>
    </div>
  );
};
export default BookForm;
