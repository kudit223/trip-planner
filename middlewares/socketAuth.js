const cookie = require('cookie');
const jwt = require('jsonwebtoken')

const socketAuth =(socket,next)=>{

   try{
     const rawCookies = socket.handshake.headers.cookie;

    if (!rawCookies) {
      return next(new Error('No cookies sent'));
    }

    const token = rawCookies.split('=')[1];
    const decoded = jwt.verify(token,process.env.JWT_SCERET);
    socket.user = decoded;
    next();
   }
   catch (err) {
    next(new Error('Authentication failed'));
  }
}


module.exports = socketAuth;