const express = require("express");
const bodyParser = require("body-parser");
// const cookieParser = require("cookie-parser");
const cors = require("cors");
const session = require("express-session");
const FileStore = require("session-file-store")(session);
const MySQLStore = require("express-mysql-session")(session);
const { mysqlOption, db } = require("./config/database");
const app = express();

const userRouter = require("./routes/user.routes");

const sessionStore = new MySQLStore(mysqlOption);
const port = 4000;
const cookieOption = {
  maxAge: 1000 * 60 * 60 * 24,
  httpOnly: false,
  secure: false,
};

// app.use(bodyParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());
app.use(
  cors({
    origin: "*",
    methods: ["OPTIONS", "GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url} ${new Date().toLocaleString()}`);
  next();
});

app.use(
  session({
    secret: "session-secret",
    name: "session ID",
    store: sessionStore,
    resave: false,
    saveUninitialized: true,
    cookie: cookieOption,
  })
);

app.get("/", async (req, res, next) => {
  console.log(req.session);
  if (req.session.views) {
    console.log("exist");
    req.session.views += 1;
  } else {
    console.log("not exist");

    req.session.views = 1;
  }
  res.send({ message: "hello" });
  next();
});

app.use("/user", userRouter);

app.listen(port, () => {
  console.log(`listen on ${port}`);
});
