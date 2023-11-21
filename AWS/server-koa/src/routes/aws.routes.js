const _router = require("koa-router");
const awsCtrl = require("../controllers/aws.ctrl");

const router = new _router();

router.post("/bucket", awsCtrl.createBucket); // create bucket
router.get("/bucket", awsCtrl.getBucketList); // get bucket list
router.get("/bucket/:name", awsCtrl.getObjectFromBucket); // get Object from bucket
router.get("/object", awsCtrl.getObject); // get Object from bucket
router.get("/image", awsCtrl.getImage); // send image from server to client

module.exports = router;
