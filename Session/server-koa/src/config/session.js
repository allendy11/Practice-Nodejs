const koaSessionMysql = require("koa-session-mysql");

const session_option = {
  key: "koa.sess",
  store: koaSessionMysql,
  maxAge: 1000 * 3,
  secure: true,
  overwrite: true /** (boolean) can overwrite or not (default true) */,
  httpOnly: false /** (boolean) httpOnly or not (default true) */,
  signed: true /** (boolean) signed or not (default true) */,
  rolling: false /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */,
  renew: true /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/,
  sameSite: "none",
};
console.log(session_option);
const key1 =
  "NOEK5zjaAMPc3L6iK7PyUjCOziUH3rsrMKB9u8H07La1SkfwtuBoDnHaaPCkG5Brg";
const key2 =
  "NMNKeIebviQnCPo38ufHcSfw3FFv8EtnAe1xE02xkN1wkCV1B2z126U44yk2BQVK7";
const keyGrip = [key1, key2];

module.exports = {
  session_option,
  keyGrip,
};
