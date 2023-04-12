const { db } = require("../config/database");
const conn = require("../lib/mysql.basic");

exports.getTest = async (ctx, next) => {
  ctx.body = {
    message: "hello",
  };
};
