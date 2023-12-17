const express = require("express");
const path = require("path");
const app = express();

app.use(express.static(path.join(__dirname, "/public")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/src/views"));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(require("./src/routes/mainRoutes"));

const PORT = 3000;
app.listen(PORT, () => console.log(`http://localhost:${PORT}`));