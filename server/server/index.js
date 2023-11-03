const express = require("express");
const app = express();
// const fs = require("fs"); // file read,write, etc
// const http = require("http");
const mongoose = require("mongoose");
require("dotenv").config(); // loads environment variables from a .env file
const PORT = process.env.PORT;
const URL = process.env.MONGO_URI;
const bodyParser = require("body-parser");
const ProductRoute = require("./routes/ProductRouter");
const UserRoute = require("./routes/UserRouter");
const CartRoute = require("./routes/CartRouter");
const cors = require("cors");
app.use(express.static("uploads"));
app.set("views", __dirname + "/views");
app.engine("html", require("ejs").renderFile);
app.set("view engine", "ejs");

//-----server start
const server = app.listen(PORT, () => {
  console.log("server started...");
});

//-----mongo atlas connection
mongoose.connect(URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.once("open", () => console.log("DATABASE CONNECTION SUCCESSFULLY DONE..."));
db.on("error", (err) => console.log("err: ", err));

app.use(cors({ origin: "*" }));

//----- body-parser parses your request and converts it into a format from
//----- which you can easily extract relevant information that you may need.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//-----ROUTES
app.use(ProductRoute);
app.use(UserRoute);
app.use(CartRoute);
/**
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 * socket
 *
 *
 *
 *
 *
 *
 */
// Socket connection
// app.get("/", (req, res) => {
//   res.send("Send request");
// });
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:4345",
  },
});
io.on("connection", (socket) => {
  console.log("socket connected");
  socket.on("userID", (id, msg) => {
    console.log("USER-->value: ", id, "=>", msg);
    socket.emit("user", { userId: id, message: msg });
  });
});

// console.log( __dirname );
// console.log( __filename );

// const server = http.createServer((req, res) => {
//     res.writeHead(200);
//     res.end("Hi Get API")
// });

// server.listen(3300, () => {
//   console.log("server running..");
// });

// File read,write,
// const path = require("path");
// const dirPath = path.join(__dirname, "data");
// const filePath = `${dirPath}/New01.txt`;

// fs.writeFileSync(filePath, "inside js file or nothing");
// fs.readFile(filePath, "utf8", (err, item) => {
//   console.log("item: ", item);
// });
// fs.appendFile(filePath, "newly added", (err) => console.log("err: ", err));
// fs.rename(filePath, `${dirPath}/New03.txt`, (err) => console.log("err: ", err));
