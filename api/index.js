const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
var cors = require("cors");
const multer = require("multer");
const path = require("path");
const { compareSync } = require("bcrypt");

dotenv.config();

mongoose.connect("mongodb://localhost/socialMedia", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection
  .once("open", () => console.log("connected"))
  .on("error", (err) => console.log("your error:", err));

// middleWare

app.use("/images", express.static(path.join(__dirname, "./public/images")));

//middleware
app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/images");
  },

  filename: (req, file, cb) => {
    console.log(req.body.name);

    cb(null, req.body.name);

    // cb(null, "dheeraj.jpeg");
  },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    return res.status(200).json("File uploded successfully");
  } catch (error) {
    console.log(error);
  }
});

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);

app.listen(4000, () => {
  console.log("Backend server is running!");
});
