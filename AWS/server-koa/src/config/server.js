const dotenv = require("dotenv");
const path = require("path");

// console.log(process.env.NODE_ENV);
// if (process.env.NODE_ENV === "production") {
//   dotenv.config({ path: path.join(__dirname, "../../.env.production") });
// } else if (process.env.NODE_ENV === "development") {
//   dotenv.config({ path: path.join(__dirname, "../../.env.development") });
// }
const port = process.env.PORT;

const corsOption = {
  origin: "*",
  method: ["OPTION", "POST", "GET", "PUT", "DELETE"],
  credentials: true,
};

const cookieOption = {};
const sessionOption = {
  key: "koa.sess",
  // store: // 필수
  maxAge: 1000 * 60 * 30, // 30m
  secure: true, // https
  httpOnly: false, // httpOnly or not (default true)
  overwrite: true, // can overwrite or not (default true)
  signed: true, // signed or not (default true)
  rolling: false, // Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false)
  renew: true, // renew session when session is nearly expired, so we can always keep user logged in. (default is false)
  sameSite: "none",
};

module.exports = {
  port,
  corsOption,
};
