const router = require('express').Router();
const auth = require('../middlewares/auth');
const {createRoom} = require('../controllers/roomControllers')

router.post('/create',auth,createRoom);
// router.post('/join',auth,joinRoom);


module.exports = router;