const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
var http = require("http");
const path = require("path");

const app = express();

var corsOptions = {
  origin: "http://localhost:8080",
};

http
  .createServer(function (request, response) {
    response.writeHead(200, {
      "Content-Type": "text/plain",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
    });
    response.end("Hello World\n");
  })
  .listen(3000);
app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

require("./routes/auth.routes")(app);
require("./routes/user.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
