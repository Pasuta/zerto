const Router = require('koa-router');
const indexCtrl = require(`../controllers/index.js`);
const watcherCtrl = require(`../controllers/watcher.js`);
const router = new Router();

router.get('/', indexCtrl);
router.post('/watcher/start', watcherCtrl.event);
router.post('/watcher/stop', watcherCtrl.event);

module.exports = router;
