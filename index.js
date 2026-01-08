const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const http = require('http');
const Sentiment = require("sentiment");
const socketIO = require("socket.io");
const newLang = require("./helper/newLanguage");

const config = require("./helper/config");
const formRoute = require("./routes/api/serve.form");

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const PORT = process.env.PORT || 8000;

//connecting mongodb
mongoose
  .connect(config.mongoURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
  })
  .then(() => {
    console.log(`MongoDB connected`);
  })
  .catch(err => {
    console.error(`MongoDB connection failed: `, err);
  });
   // View engine setup
app.set("view engine", "ejs");

  //serving static files
app.use(express.static(path.join(__dirname, "/public")));

//using bodyparser
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

// Application routes
app.use(formRoute);

//establishing connection for socket.io

io.on("connection", socket => {
  console.log(`connection established....`);

  socket.on("runanalysis", text => {
    const sentiment = new Sentiment();
    // sentiment.registerLanguage('in', newLang);
   const result = sentiment.analyze(text, { extras: newLang.labels });
    console.log(result);
    const { score, comparative, tokens, words, positive, negative } = result;
    console.log("socket", result);
    socket.emit("result", result);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected...");
  });
});

server.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});