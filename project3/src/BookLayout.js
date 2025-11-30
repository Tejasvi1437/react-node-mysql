import { Link, Outlet, useSearchParams } from "react-router-dom";

export function BookLayout() {
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get("q") || "";

  function handleSearch(e) {
    const value = e.target.value;
    setSearchParams(value ? { q: value } : {});
  }

  return (
    <>
      <h1>Books Section</h1>

      {/* SEARCH BAR */}
      <input
        type="text"
        placeholder="Search books..."
        value={search}
        onChange={handleSearch}
        style={{ padding: "5px", marginBottom: "10px" }}
      />
      <br /><br />

      <Link to="/books/1">Book 1</Link>
      <br />
      <Link to="/books/2">Book 2</Link>
      <br />
      <Link to="/books/new">New Book</Link>

      <hr />

      <Outlet context={{ search }} />
    </>
  );
}
