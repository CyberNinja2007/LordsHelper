require("dotenv").config();
const express = require("express");
const cors = require("cors");
const sequelize = require("./db.js");
const models = require("./models/models.js");
const router = require("./routes/index.js");
const errorHandler = require("./middleware/errorHandlingMiddleware.js");

const corsOptions = {
  origin: process.env.WEB_APP,
  credentials: true, // Allow cookies to be sent with requests
  methods: ['GET', 'POST'], // Allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
};

const app = express();

app.use(cors(corsOptions));
app.use(express.json());
app.use("/api", router);
app.use(errorHandler);

const start = async () => {
  try {
    sequelize.authenticate();
    sequelize.sync();
    app.listen(process.env.PORT, () => {
      console.log(`Приложение запущено на порту ${process.env.PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
};

start();
