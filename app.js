var createError = require("http-errors");
var express = require("express");
var bodyParser = require('body-parser');
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
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(
  bodyParser.urlencoded({
    limit: '50mb',
    extended: true,
    parameterLimit: 50000,
  }),
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
app.get('/Favicon/icon.png', async function (req, res) {

  const menu = await menuSchema.findOne({});

  const base64Image = menu?.favicon?.img; // Add full base64 string here
  const imgBuffer = Buffer.from(base64Image.split(",")[1], 'base64'); // Split and decode

  res.writeHead(200, {
    'Content-Type': 'image/png',
    'Content-Length': imgBuffer.length,
  });
  res.end(imgBuffer);
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
