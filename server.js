const express = require("express");
require("dotenv").config();
const errorHandler = require("./middlewares/errorHandler");
const cookies = require("cookie-parser");
const cors = require("cors");

// PORT
const PORT = process.env.PORT || 3000;

// API version
const version = "1.0";

// Initialize app
const app = express();

app.use(
  cors({
    origin: `http://localhost:3000`,
  })
);

// Body parsing middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Error handling error
app.use(errorHandler);

// Cookie parser
app.use(cookies());

// Routes
app.use(`/api/${version}/articles`, require("./routes/article"));
app.use(`/api/${version}/categories`, require("./routes/category"));
app.use(`/api/${version}/account`, require("./routes/auth"));
app.use(`/api/${version}/users`, require("./routes/user"));
app.use(`/api/${version}/roles`, require("./routes/role"));
app.use(`/api/${version}/objects`, require("./routes/object"));
app.use(`/api/${version}/requests`, require("./routes/request"));
app.use(`/api/${version}/partners`, require("./routes/partner"));
app.use(`/api/${version}/sales`, require("./routes/sale"));
app.use(`/api/${version}/orders`, require("./routes/order"));
app.use(`/api/${version}/payments`, require("./routes/payment"));
app.use(`/api/${version}/promotions`, require("./routes/promotion"));

// Run app
app.listen(PORT, (err) => {
  if (err) throw new Error(err);
  console.log(`App running on port ${PORT}`);
});
