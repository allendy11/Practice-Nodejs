const Koa = require("koa");
const Router = require("koa-router");
const bodyParser = require("koa-bodyparser");
const cors = require("@koa/cors");
const dotenv = require("dotenv");
const path = require("path");
const { db, mysqlOption } = require("./config/database");
const koaSession = require("koa-session");
const mysql = require("mysql-magic");
const koaSessionMysql = require("koa-session-mysql");

const userRouter = require("./routes/user.routes");

const PORT = 4000;

mysql.initPool("koa-session", {
  host: "localhost",
  user: "root",
  password: "",
  database: "testdb",
});

koaSessionMysql.init("koa-session", "session");

const app = new Koa();
app.keys = ["1234567890"];

// bodyparser
app.use(bodyParser());

// router
const router = new Router();
app.use(router.routes()).use(router.allowedMethods());

// cors
app.use(
  cors({
    origin: "*",
    method: ["OPTION", "POST", "GET"],
    credentials: true,
  })
);

// session
app.use(
  koaSession(
    {
      // // secret: "asdfasd",
      // // name: "koa-session-id",
      key: "koa.sess",
      store: koaSessionMysql,
      maxAge: 1000 * 60 * 30,
      secure: false,
      overwrite: true /** (boolean) can overwrite or not (default true) */,
      httpOnly: false /** (boolean) httpOnly or not (default true) */,
      signed: true /** (boolean) signed or not (default true) */,
      rolling: false /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */,
      renew: true /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/,
      sameSite: "none",
    },
    app
  )
);

// log
app.use(async (ctx, next) => {
  console.log(`${ctx.method} ${ctx.url} ${new Date().toLocaleString()}`);
  await next();
});

app.use(async (ctx, next) => {
  if (ctx.session.views) {
    console.log("koa session exist");
    ctx.session.views += 1;
    ctx.body = ctx.session.views;
  } else {
    console.log("koa session not exist");

    ctx.session.views = 1;
    ctx.body = ctx.session.views;
  }
  console.log("koa-session", Object.entries(ctx.session));

  // console.log("koa-session", ctx.session);
  await next();
});

router.use("/user", userRouter.routes());

app.listen(PORT, () => {
  console.log(`listening on port PORT ${PORT}`);
});
