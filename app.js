var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const expressSessions = require("express-session");
const flash = require("connect-flash");
const http = require("http");
const socketio = require("socket.io");
var bodyParser = require("body-parser");




var app = express();
const Server = http.createServer(app);
const io = socketio(Server);

require("dotenv").config();

const adminRouter = require("./routes/adminRouter");
const bloodRouter = require("./routes/bloodRouter");
const donarRouter = require("./routes/donarRouter");
const indexRouter = require("./routes/indexRouter");
const usersRouter = require("./routes/userRouter");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


const db = require("./config/mongoose-connection");

io.on("connection", function (socket) {
  socket.on("send-location", (data) => {
    io.emit("recive-location", { id: socket.id, ...data });
  });
  console.log("User connected: " + socket.id);

   socket.on("disconnect", () => {
     io.emit("user-left", socket.id);
   });
});

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  expressSessions({
    resave: false,
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET,
  })
);
app.use(flash());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/admin", adminRouter);
app.use("/reciver", bloodRouter);
app.use("/donar", donarRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

// Start the server
const PORT = process.env.PORT || 3000;
Server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
