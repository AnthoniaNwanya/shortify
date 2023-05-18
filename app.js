// var cookieSession = require('cookie-session')
const express = require("express");
const { MongoDB } = require("./MongoDB");
const UserRoute = require("./route/userRoute");
const UrlRoute = require("./route/postUrlRoute");
const IndexRoute = require("./route/linkRoute");
const ErrorHandler = require("./middleware/ErrorHandler");
const { BadRequestError } = require("./middleware/Error");
const limitRate = require("./middleware/rateLimiter");

const PORT = process.env.PORT;
MongoDB();

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(cookieSession({
//   name: 'session',
//   keys: [],

//   // Cookie Options
//   maxAge: 24 * 60 * 60 * 1000 // 24 hours
// }))
// app.use(session({secret: process.env.SESSION_SECRET, resave: true, saveUninitialized: true}))
app.use(limitRate);
app.use("/shortify/user", UserRoute);
app.use("/shortify", UrlRoute);
app.use("/", IndexRoute)

app.use(function (err, req, res, next) {
  ErrorHandler(err, req, res);
});

app.use("*", () => {
  throw new BadRequestError("Invalid Request: Route Not Found")

});

app.listen(PORT, () => {
  console.log("Server started listening on,", PORT);
});
