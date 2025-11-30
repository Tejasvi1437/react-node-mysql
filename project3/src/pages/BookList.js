import { useOutletContext } from "react-router-dom";

export function BookList() {
  const { search } = useOutletContext();

  const books = [
    { id: 1, name: "Harry Potter" },
    { id: 2, name: "Sherlock Holmes" },
    { id: 3, name: "Atomic Habits" },
  ];

  const filteredBooks = books.filter((b) =>
    b.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <h2>Book List</h2>

      {filteredBooks.length === 0 && <p>No books found.</p>}

      <ul>
        {filteredBooks.map((book) => (
          <li key={book.id}>
            <a href={`/books/${book.id}`}>{book.name}</a>
          </li>
        ))}
      </ul>
    </>
  );
}
