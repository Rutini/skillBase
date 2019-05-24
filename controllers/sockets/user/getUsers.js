const getAllUsers = require('../../../controllers/user/getAllUsers');

module.exports = (socket) => {

    socket.on('getUsers', async () => {
        socket.emit('users', await getAllUsers());
    })
};
