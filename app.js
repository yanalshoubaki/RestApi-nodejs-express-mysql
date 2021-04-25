const express = require("express");
const cors = require("cors");
var http = require("http");
const app = express();
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

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

require("./routes/auth.routes")(app);
require("./routes/user.routes")(app);
require("./routes/category.routes")(app);
require("./routes/post.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
