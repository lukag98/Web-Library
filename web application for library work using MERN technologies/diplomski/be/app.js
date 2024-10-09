const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");

const BooksRouter = require("./routers/BooksRouter");
const ClientsRouter = require("./routers/ClientsRouter");
const LoginRouter = require("./routers/LoginRouter");

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api", BooksRouter);
app.use("/api", ClientsRouter);
app.use("/api", LoginRouter);

// Start the server
app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
