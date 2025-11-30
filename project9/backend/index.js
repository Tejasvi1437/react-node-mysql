import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());


let db;

function handleDisconnect() {
  db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "test",
  });

  db.connect((err) => {
    if (err) {
      console.error("Error connecting to DB:", err);
      setTimeout(handleDisconnect, 2000);
    } else {
      console.log("Connected to MySQL database");
    }
  });

  db.on("error", (err) => {
    console.error("DB error", err);
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      handleDisconnect(); 
    } else {
      throw err;
    }
  });
}

handleDisconnect();

app.get("/", (req, res) => {
  res.json("hello");
});

app.get("/books", (req, res) => {
  const q = "SELECT * FROM books";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.post("/books", (req, res) => {
  const q = "INSERT INTO books(`title`, `desc`, `price`, `cover`) VALUES (?)";
  const values = [req.body.title, req.body.desc, req.body.price, req.body.cover];

  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.delete("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q = "DELETE FROM books WHERE id = ?";

  db.query(q, [bookId], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.put("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q = "UPDATE books SET `title`= ?, `desc`= ?, `price`= ?, `cover`= ? WHERE id = ?";
  const values = [req.body.title, req.body.desc, req.body.price, req.body.cover];

  db.query(q, [...values, bookId], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

// Start server
app.listen(8800, () => {
  console.log("Backend running on port 8800");
});
