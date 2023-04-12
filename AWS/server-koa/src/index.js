const Koa = require("koa");
const Router = require("koa-router");
const bodyParser = require("koa-bodyparser");
const cors = require("@koa/cors");
const https = require("https");
const fs = require("fs");

const apiRouter = require("./routes/api.routes");

const { port, corsOption } = require("./config/server");

const app = new Koa();

// setup
app.use(bodyParser());
app.use(cors(corsOption));

// session (when need)

// log
app.use(async (ctx, next) => {
  console.log(`${ctx.method} ${ctx.url} ${new Date().toLocaleString()}`);
  await next();
});

// basic route
app.use(async (ctx, next) => {
  ctx.body = "hello world";
  await next();
});

// routes
const router = new Router();
app.use(router.routes()).use(router.allowedMethods());

router.use("/api", apiRouter.routes());

var options = {
  key: fs.readFileSync("./key.pem"),
  cert: fs.readFileSync("./cert.pem"),
};

https.createServer(options, app.callback()).listen(port, () => {
  console.log(`Listen on ${port}`);
});
