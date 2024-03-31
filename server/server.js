const express = require("express");
const cors = require('cors');
const db = require("./database/db");
const expensesRouter = require("./routes/expenses");
const usersRouter = require("./routes/users");
const addressesRouter = require("./routes/addresses")

const app = express();
const PORT = 3000;

app.use(cors());

app.use(express.json());

app.use("/users", usersRouter);

app.use("/addresses", addressesRouter);

app.use("/expenses", expensesRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
