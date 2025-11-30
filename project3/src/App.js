import { NavLink, Link, Route, Routes, useRoutes } from "react-router-dom";
import { Home } from "./pages/Home";
import { NotFound } from "./pages/NotFound";
import { BookRoutes } from "./BookRoutes";

function App() {
  const element = useRoutes([
    { path: "/", element: <Home /> },
    { path: "*", element: <NotFound /> },
  ]);

  return (
    <>
      <nav>
        <ul>
          <li>
            <NavLink
              to="/"
              style={({ isActive }) => ({
                color: isActive ? "red" : "blue",
              })}
            >
              Home
            </NavLink>
          </li>

          <li>
            <Link to="/books">Books</Link>
          </li>
        </ul>
      </nav>

      {element}

      <Routes>
        <Route path="/books/*" element={<BookRoutes />} />
      </Routes>
    </>
  );
}

export default App;
