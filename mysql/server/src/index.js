const Koa = require("koa");
const Router = require("koa-router");
const bodyParser = require("koa-bodyparser");
const https = require("https");
const fs = require("fs");

const apiRouter = require("../routes/api.routes");

const PORT = 8000;
const app = new Koa();

app.use(async (ctx, next) => {
  console.log(`${ctx.method} ${ctx.url} ${new Date().toLocaleDateString()}`);
  await next();
});

const router = new Router();
app.use(router.routes()).use(router.allowedMethods());

router.use("/api", apiRouter.routes());

const key_options = {
  key: fs.readFileSync("./key.pem"),
  cert: fs.readFileSync("./cert.pem"),
};
https.createServer(key_options, app.callback()).listen(PORT, () => {
  console.log(`Listen on ${PORT}`);
});
