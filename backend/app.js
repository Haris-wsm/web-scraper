const express = require("express");

const cors = require("cors");

const app = express();

const productRouter = require("./routers");

// const corsOpts = {
//   origin: [process.env.APP_BASE_URL],

//   methods: ["GET", "POST", "DELETE", "PUT"],

//   allowedHeaders: ["Content-Type", "Authorization"],
// };

// app.use(cors(corsOpts));

app.use(cors());
app.use(express.json({}));

app.use("/api/v1", productRouter);

module.exports = app;
