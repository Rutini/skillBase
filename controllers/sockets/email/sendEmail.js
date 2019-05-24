const sendEmail = require('../../../controllers/email/sendEmail');

module.exports = (socket) => {

    socket.on('sendEmail', async (body) => {
        await sendEmail(body);
    })
};
