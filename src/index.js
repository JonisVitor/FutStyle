const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();

app.use(express.json());
app.use(cors());

// API
app.use("/liga", require("./routes/liga"));
app.use("/time", require("./routes/time"));
app.use("/camisa", require("./routes/camisa"));

// front-end estático (index.html, style.css, script.js)
app.use(express.static(path.join(__dirname, "static")));

app.listen(3000, () => {
  console.log("Servidor executando em http://localhost:3000");
});
