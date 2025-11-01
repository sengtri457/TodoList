require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 4000;
const MONGODB_URL = process.env.MONGODB_URL;
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());
const authRoutes = require("./routers/auth.routes.js");
const categoryRoutes = require("./routers/category.routes.js");
const dailyLogRoutes = require("./routers/dailyLog.routes.js");
const activityRoutes = require("./routers/activity.routes.js");
const userRoutes = require("./routers/user.routes.js");
// Routes
app.use("/api/auth", authRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/logs", dailyLogRoutes);
app.use("/api/activities", activityRoutes);
app.use("/api/users", userRoutes);
// connect to DB
mongoose
  .connect(MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log("Server is Running with URL: http://localhost:" + PORT);
    });
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB", err);
  });
