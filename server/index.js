const express = require("express");
const app = express();
const cors = require("cors");
const fs = require("fs");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config();
const multer = require("multer");
const { decrypt } = require("./middleware/decrypt");
const { securehash } = require("./middleware/securehash");

let dir = "./uploads";
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}
//Image Upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      new Date().toISOString().replace(/:/g, "-") + "-" + file.originalname
    );
  },
});

const upload = multer({
  storage: storage,
});
const imageupload = upload.fields([{ name: "file", maxCount: 1 }]);

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/", imageupload, securehash, (req, res) => {
  try {
    console.log(req.body);
    res.status(200).json({ status: "success" });
  } catch (error) {
    console.log(error.message);
  }
});

app.listen(4000, () => {
  console.log(`server running on 4000`);
});
