const express = require("express");
const router = express.Router();
const db = require("../database/db");

router.get("/", (req, res) => {
  db.all("SELECT * FROM users", (err, rows) => {
    if (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
      return;
    }
    res.json(rows);
  });
});

router.post("/", (req, res) => {
  const { username, login, password } = req.body;
  const sqlCheck = `SELECT * FROM users WHERE username = ? AND login = ? AND password = ?`;
  const valuesCheck = [username, login, password];

  db.get(sqlCheck, valuesCheck, (err, row) => {
    if (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
      return;
    }

    if (row) {
      res.status(409).send('User already exists'); // Користувач з такими значеннями вже існує
    } else {
      const sqlInsert = `INSERT INTO users (username, login, password) VALUES (?, ?, ?)`;
      const valuesInsert = [username, login, password];

      db.run(sqlInsert, valuesInsert, (err) => {
        if (err) {
          console.error(err.message);
          res.status(500).send('Server Error');
          return;
        }
        res.status(201).send('User created successfully');
      });
    }
  });
});


router.put("/:id", (req, res) => {
  // редагувати наявні дані в базі даних
});

router.delete("/:id", (req, res) => {
  // видалити дані з бази даних
});

module.exports = router;
