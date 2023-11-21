const Router = require("koa-router");

const router = new Router();

router.get("/user", async (ctx, next) => {
  ctx.body = "work";
});

module.exports = router;
