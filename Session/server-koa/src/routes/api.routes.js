const _router = require("koa-router");
const apiCtrl = require("../controllers/api.ctrl");

const router = new _router();

router.get("/test1", apiCtrl.getTest);

module.exports = router;
