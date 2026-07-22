

function socketConnection(io,socket){
    console.log('User connected!!');
    const userDetails = socket.user;

    // when user create's room
    socket.on('room_created',({roomId,name,admin})=>{
        socket.join(roomId);

        io.to(roomId).emit('user_joined',`${userDetails.name} has joined`)
    });
}

module.exports = socketConnection;

