import { useParams, useOutletContext } from "react-router-dom";

export function Book() {
  const { id } = useParams();
  const { search } = useOutletContext(); // showing search bar from layout

  return (
    <>
      <h1>Book {id}</h1>
      <p>Search: {search}</p>
    </>
  );
}
