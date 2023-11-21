const Koa = require("koa");
const Router = require("koa-router");
const bodyParser = require("koa-bodyparser");
const cors = require("@koa/cors");
const { db, server_env } = require("./config/database");
const http = require("http");
const https = require("https");
const fs = require("fs");
const path = require("path");

const awsRouter = require("./routes/aws.routes");

const PORT = 8000;

const app = new Koa();

// bodyparser
app.use(bodyParser());

// cors
app.use(cors({ origin: ["https://localhost:3000"], credentials: true }));

// log
app.use(async (ctx, next) => {
  console.log(`${ctx.method} ${ctx.url} ${new Date().toLocaleString()}`);
  await next();
});

const router = new Router();
app.use(router.routes()).use(router.allowedMethods());

router.get("/", async (ctx, next) => {
  ctx.body = "work";
  next();
});
router.use("/aws", awsRouter.routes());

const key_options = {
  key: fs.readFileSync(path.join(__dirname, "../localhost-key.pem")),
  cert: fs.readFileSync(path.join(__dirname, "../localhost.pem")),
};

https.createServer(key_options, app.callback()).listen(PORT, () => {
  console.log(`Listen on ${PORT}`);
});
