const createUser = require('../../../controllers/user/createUser');

module.exports = (socket) => {

    socket.on('createUser', async (body) => {
        const result = await createUser(body);
        console.log(result);
    })
};
