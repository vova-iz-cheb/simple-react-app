const express = require("express");
const bodyParser = require("body-parser");

const cookieParser = require("cookie-parser");
const session = require("express-session");

const mongoose = require("mongoose");
const MongoStore = require("connect-mongo")(session);

const app = express();

// config
const config = require("config");
const appPort = process.env.PORT || config.get("app.port");
const appHost = config.get("app.host");
const mongooseUri = config.get("mongoose.uri");
const mongooseOpt = config.get("mongoose.options");
const secret = config.get("secret");

// cookie and session
app.use(cookieParser(secret));
app.use(
  session({
    secret,
    store: new MongoStore({
      url: mongooseUri
    }),
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
    }
  })
);

//Routers
const commonRouter = require("./routers/commonRouter.js");
const userRouter = require("./routers/userRouter.js");
const newsRouter = require("./routers/newsRouter.js");

app.use(bodyParser.json());

// Стили, картинки, скрипты в папке public
// app.use('/', express.static(__dirname + '/public'));

app.use("/api/users", userRouter);
app.use("/api/news", newsRouter);
app.use("/api", commonRouter);

app.use((req, res) => {
  res.status(400).send("Not found");
});

// подключение к БД mongoose
mongoose.connect(mongooseUri, mongooseOpt, err => {
  if (err) return console.log(err);
  console.log("Mongoose подключен.");
  // запуск сервера
  app.listen(appPort, () =>
    console.log(`Server is running on port ${appPort}`)
  );
});
