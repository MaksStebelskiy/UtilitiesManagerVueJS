// routes/expenses.js
const express = require("express");
const router = express.Router();
const db = require("../database/db");

router.get('/', (req, res) => {
    db.all("SELECT * FROM expenses", (err, rows) => {
      if (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
        return;
      }
      res.json(rows);
    });
  });

router.post("/", (req, res) => {
  // додати нові дані в базу даних
});

router.put("/:id", (req, res) => {
  // редагувати наявні дані в базі даних
});

router.delete("/:id", (req, res) => {
  // видалити дані з бази даних
});

module.exports = router;
