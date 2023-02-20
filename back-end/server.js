require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
mongoose.set('strictQuery', false);
const bookRoutes = require("./routes/books");
const userRoutes = require("./routes/users");
const cors = require("cors");


//express app
const app = express();

//middleware
app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//routes
app.use("/api/books", bookRoutes);
app.use("/api/users", userRoutes);

//connect to db
mongoose
  .connect(process.env.MONGODB_URI)
  .then(
    app.listen(process.env.PORT, () => {
      console.log(`listening on port ${process.env.PORT}`);
    })
  )
  .catch((err) => console.log(err));