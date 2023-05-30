require("dotenv").config();
const express = require("express");
const path = require("path")
// const bodyParser = require("body-parser");
const AuthRoute = require("./route/authRoute");
const UserRoute = require("./route/userRoute");
const UrlRoute = require("./route/urlRoute");
const RedirectRoute = require("./route/redirectRoute");
const ErrorHandler = require("./middleware/ErrorHandler");
const { ForbiddenError } = require("./middleware/Error");
const limitRate = require("./middleware/rateLimiter");

const app = express();
if (process.env.NODE_ENV === "development") {
 app.use(limitRate);
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

app.set('views', path.join('views'))
app.set('view engine', 'ejs');

app.get('/auth/signup', (req, res) => {
  res.render('signup')
})
app.use("/auth", AuthRoute);
app.use("/api", UserRoute);
app.use("/api/shortify", UrlRoute);
app.use("/", RedirectRoute)

app.use(function (err, req, res, next) {
  ErrorHandler(err, req, res);
});

app.use("*", () => {
  throw new ForbiddenError("Invalid Request: Route Not Found")

});



module.exports = app;
