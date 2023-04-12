const { session_option } = require("../config/session");
const koaSessionMysql = require("koa-session-mysql");

const authSession = async (ctx, next) => {
  try {
    const authorized = ctx.session.authorized;
    if (authorized) {
      const sessionId = ctx.cookies.get(session_option.key);
      ctx.request.sessionId = sessionId;
      ctx.request.authorized = true;
      await next();
    } else {
      ctx.request.sessionId = null;
      ctx.request.authorized = false;
      await next();
    }
  } catch (err) {
    ctx.throw(err.status || 500, err.message);
  }
};

module.exports = authSession;
