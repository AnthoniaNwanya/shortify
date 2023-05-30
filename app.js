const app = require("./index");
const { MongoDB } = require("./MongoDB");
const PORT = process.env.PORT || 8000;

MongoDB();

app.listen(PORT, () => {
  console.log("Server started listening on,", PORT);
});

