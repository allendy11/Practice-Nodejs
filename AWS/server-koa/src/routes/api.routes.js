const Router = require("koa-router");
const apiCtrl = require("../controllers/api.ctrl");

const router = new Router();

router.get("/list", apiCtrl.list);

router.get("/download", apiCtrl.download);
router.get("/download2", apiCtrl.download2);

module.exports = router;
