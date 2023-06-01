require("dotenv").config();
const express = require("express");
const path = require("path")
const AuthRoute = require("./route/authRoute");
const UserRoute = require("./route/userRoute");
const UrlRoute = require("./route/urlRoute");
const RedirectRoute = require("./route/redirectRoute");
const ErrorHandler = require("./middleware/ErrorHandler");
const {authenticateUser} = require("./middleware/authentication");
const { ForbiddenError } = require("./middleware/Error");
const limitRate = require("./middleware/rateLimiter");
const session = require('express-session');
const cookieParser = require('cookie-parser');

const app = express();
if (process.env.NODE_ENV === "development") {
 app.use(limitRate);
}
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(express.static('public'));

app.set('views', path.join('views'))
app.set('view engine', 'ejs');

app.get('/api/signup', (req, res) => {
  res.render('signup')
})
app.get('/api/login', (req, res) => {
  res.render('login')
})
app.get('/api/shortify',  authenticateUser,
(req, res) => {
  res.render('home')
})

app.use("/api", AuthRoute);
app.use("/api/user", UserRoute);
app.use("/api/shortify", UrlRoute);
app.use("/", RedirectRoute)

app.use(function (err, req, res, next) {
  ErrorHandler(err, req, res);
});

app.use("*", () => {
  throw new ForbiddenError("Invalid Request: Route Not Found")

});



module.exports = app;
