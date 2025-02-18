var createError = require("http-errors");
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var adminRouter = require("./routes/admin/admin");
var webRouter = require("./routes/web/web");

var app = express();
require("dotenv").config();
const cloudinary = require("cloudinary").v2;
const cors = require("cors");
const menuSchema = require("./models/menu.schema");
const imageStoreSchema = require("./models/imagestore.schema");
app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Favicon route with Base64
app.get("/Favicon/icon.png", async function (req, res) {
  const menu = await menuSchema.findOne({});

  const base64Image = menu?.favicon?.img; // Add full base64 string here
  const imgBuffer = Buffer.from(base64Image.split(",")[1], "base64"); // Split and decode

  res.writeHead(200, {
    "Content-Type": "image/png",
    "Content-Length": imgBuffer.length,
  });
  res.end(imgBuffer);
});

// STORE IMAGE FROM CLOUDINARY
app.post("/imageStore/upload", async function (req, res) {
  try {
    const { altname, img } = req.body;
    if (!img) {
      return res.status(400).json({ message: "img is required" });
    }
    const webBaseUrl = `${req.protocol}://${req.get("host")}/`;
    const path = `${webBaseUrl}imageStore/img-${Date.now()}.png`;
    const altnameFinal = altname || "image";

    await imageStoreSchema.create({
      path,
      altname: altnameFinal,
      img,
    });

    res.status(200).json({ message: "Image stored successfully", path });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error storing image" });
  }
});

// GET IMAGE FROM CLOUDINARY
app.get("/imageStore/:path", async function (req, res) {
  try {
    const path = `imageStore/${req.params.path}`;
    console.log(path);
    const imageStore = await imageStoreSchema.findOne({
      path: { $regex: path, $options: "i" },
    });
    console.log(imageStore);
    if (!imageStore || !imageStore.img) {
      return res.status(404).json({ message: "Image not found" });
    }

    const base64Image = imageStore.img;
    const imgBuffer = Buffer.from(base64Image.split(",")[1], "base64");
    console.log("enter");

    res.writeHead(200, {
      "Content-Type": "image/png",
      "Content-Length": imgBuffer.length,
    });
    res.end(imgBuffer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving image" });
  }
});

// upload image to cloudinary
app.post("/uploadimage/:path", async function (req, res) {
  try {
    const { img, altname } = req.body;
    const path = `imageStore/${req.params.path}`;
    if (!img) {
      return res.status(400).json({ message: "img is required" });
    }
    if (!altname) {
      const result = await imageStoreSchema.findOneAndUpdate(
        { path: path },
        { img }
      );
      res.status(200).json({ message: "Image uploaded successfully", result });
    } else {
      const result = await imageStoreSchema.findOneAndUpdate(
        { path: path },
        { img, altname }
      );
      res.status(200).json({ message: "Image uploaded successfully", result });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error uploading image" });
  }
});
// Routers
app.use("/", indexRouter);
app.use("/admin", adminRouter);
app.use("/users", usersRouter);
app.use("/web", webRouter);

// Catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function (err, req, res, next) {
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
