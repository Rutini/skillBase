const dataBase = require('../../dataBase').getInstance();

module.exports = async () => {
    try {
        const User = dataBase.getModel('User');

        return await User.findAll({});

    } catch (e) {
        console.log(e.message);
    }
};
