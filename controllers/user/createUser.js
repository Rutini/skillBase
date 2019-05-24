const dataBase = require('../../dataBase').getInstance();

module.exports = async (body) => {
    try {
        console.log('cont');
        const User = dataBase.getModel('User');

        if (!body) throw new Error('User body is empty!');

        const {name, surname, email, phone} = body;

        await User.create({
            name,
            surname,
            email,
            phone
        });

        return `User with email: ${email} successfully created!`;
    } catch (e) {
        console.log(e.message);
    }
};
