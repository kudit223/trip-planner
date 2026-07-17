
exports.userJoined = (message)=>{
    io.emit('user_join','user has joined!!')
}