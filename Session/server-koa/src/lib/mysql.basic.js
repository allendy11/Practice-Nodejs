const { db } = require("../config/database");

function getDB(query, values) {
  return db.getConnection(async (conn) => conn.query(query, values));
}

module.exports = {
  get: getDB,
};
