const Koa = require("koa");
const Router = require("koa-router");
const bodyParser = require("koa-bodyparser");
const cors = require("@koa/cors");
const dotenv = require("dotenv");
const path = require("path");
const koaSession = require("koa-session");
const mysql = require("mysql-magic");
const koaSessionMysql = require("koa-session-mysql");
const http = require("http");
const https = require("https");
const fs = require("fs");

// config
const { session_option, keyGrip } = require("./config/session");
const { db, mysqlOption } = require("./config/database");

// router
const userRouter = require("./routes/user.routes");
const apiRouter = require("./routes/api.routes");

const PORT = 8000;

mysql.initPool("koa-session", mysqlOption);

koaSessionMysql.init("koa-session", "session");

const app = new Koa();
app.keys = ["1234567890"];

// bodyparser
app.use(bodyParser());

// cors
app.use(
  cors({
    origin: "*",
    method: ["OPTION", "POST", "GET"],
    credentials: true,
  })
);

// session
app.use(koaSession(session_option, app));

// log
app.use(async (ctx, next) => {
  console.log(`${ctx.method} ${ctx.url} ${new Date().toLocaleString()}`);
  await next();
});

app.use(async (ctx, next) => {
  if (ctx.session.views) {
    console.log("exist");
    ctx.session.views += 1;
  } else {
    console.log("not exist");

    ctx.session.views = 1;
  }
  // console.log("koa-session", Object.entries(ctx.session));
  ctx.body = ctx.session.views;

  await next();
});

const router = new Router();
app.use(router.routes()).use(router.allowedMethods());

router.use("/user", userRouter.routes());
router.use("/api", apiRouter.routes());

var options = {
  key: fs.readFileSync("./key.pem"),
  cert: fs.readFileSync("./cert.pem"),
};

https.createServer(options, app.callback()).listen(PORT, () => {
  console.log(`listen on ${PORT}`);
});
// app.listen(PORT, () => {
//   console.log(`listening on port PORT ${PORT}`);
// });
