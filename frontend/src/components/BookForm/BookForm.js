import './BookForm.css';
import { useState } from 'react';
const BookForm = () => {
  const [title, setTille] = useState('');
  const [author, setAuthor] = useState('');

  const handleSubmite = (event) => {
    event.preventDefault();
    if (title && author) {
        
      console.log(title, author);
      setTille('');
      setAuthor('');
    }
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
      </form>
    </div>
  );
};
export default BookForm;
