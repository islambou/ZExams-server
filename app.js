const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const passport = require("passport");
const passportConf = require("./config/passport");
const session = require("express-session");
const dbConfig = require("./db/config");
var app = express();
//connect with database
dbConfig.setConnection();
// add & configure middleware
app.use(
  session({
    secret: "batata",
    resave: false,
    saveUninitialized: true
  })
);
passportConf.init();

// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());
//------Routers ----------------//
var indexRouter = require("./routes/index");
var loginRouter = require("./routes/login");
var testRouter = require("./routes/test");
var questionRouter = require("./routes/question");
var categoryRouter = require("./routes/category");
var userAnswersRouter = require("./routes/user_answers");
var unauthorizedRouter = require("./routes/unauthorized");
//-----------------------------//
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
//------Routes ----------------//
app.use("/", indexRouter);
app.use("/question", questionRouter);
app.use("/user_answers", userAnswersRouter);
app.use("/category", categoryRouter);
app.use("/login", loginRouter);
app.use("/test", testRouter);
app.use("/401", unauthorizedRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  console.log(req.body);
  console.log(err.message);
  // render the error page
  res.status(err.status || 500);
  res.send(err.message);
});

module.exports = app;
