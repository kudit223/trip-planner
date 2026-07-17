const router = require('express').Router();
const {createUser, loginUser, isLoggedIn} = require('../controllers/authControllers');
const auth = require('../middlewares/auth')


router.post('/register',createUser);
router.post('/login',loginUser)

router.get('/me',auth,isLoggedIn)


module.exports = router;