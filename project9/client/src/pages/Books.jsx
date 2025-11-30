import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Books = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const res = await axios.get("http://localhost:8800/books");
        if (Array.isArray(res.data)) {
          setBooks(res.data);
        } else if (res.data && Array.isArray(res.data.books)) {
          setBooks(res.data.books);
        } else {
          setBooks([]); 
        }
      } catch (err) {
        console.log("Error fetching books:", err);
      }
    };

    fetchAllBooks();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8800/books/${id}`);
      // Update state without reloading the page
      setBooks((prev) => prev.filter((book) => book.id !== id));
    } catch (err) {
      console.log("Error deleting book:", err);
    }
  };

  return (
    <div>
      <h1>Lama Book Shop</h1>
      <div className="books">
        {Array.isArray(books) && books.length > 0 ? (
          books.map((book) => (
            <div key={book.id} className="book">
              <img src={book.cover} alt={book.title} />
              <h2>{book.title}</h2>
              <p>{book.desc}</p>
              <span>${book.price}</span>
              <button className="delete" onClick={() => handleDelete(book.id)}>
                Delete
              </button>
              <button className="update">
                <Link
                  to={`/update/${book.id}`}
                  style={{ color: "inherit", textDecoration: "none" }}
                >
                  Update
                </Link>
              </button>
            </div>
          ))
        ) : (
          <p>No books available.</p>
        )}
      </div>

      <button className="addHome">
        <Link to="/add" style={{ color: "inherit", textDecoration: "none" }}>
          Add new book
        </Link>
      </button>
    </div>
  );
};

export default Books;
