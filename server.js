const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const routes = require("./routes/TaskRoute");

const app = express();
const PORT = process.env.PORT || 6000;

app.use(express.json());
app.use(cors());

mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log(err));

app.use(routes);
app.listen(PORT, () => console.log(`LISTENING on PORT:${PORT}`));
