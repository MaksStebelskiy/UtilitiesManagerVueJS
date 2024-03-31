// routes/expenses.js
const express = require("express");
const router = express.Router();
const db = require("../database/db");

router.get("/", (req, res) => {
  const { id, username, login } = req.query; // Отримуємо userId, username та login з запиту

  const query = `
  SELECT 
    city, 
    street, 
    house_number, 
    apartment_number,
    year, 
    month, 
    GROUP_CONCAT(DISTINCT utility_name) AS utility_names,
    GROUP_CONCAT(DISTINCT amount) AS amounts,
    SUM(amount) AS total_amount
FROM (
    SELECT 
        city, 
        street, 
        house_number, 
        apartment_number,
        year, 
        month,
        utility_name,
        amount
    FROM 
        expenses e
    JOIN 
        addresses a ON e.address_id = a.id
    JOIN 
        users u ON a.user_id = u.id
    WHERE 
        u.id = ? AND u.username = ? AND u.login = ?
) AS subquery
GROUP BY 
    city, street, house_number, apartment_number, year, month
ORDER BY 
    city, street, house_number, apartment_number, year, month;
  `;

  db.all(query, [id, username, login], (err, rows) => {
    if (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
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
