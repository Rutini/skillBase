const nodemailer = require("nodemailer");
const {userAddress, userPassword} = require('./../../config/email');

module.exports = async (body) => {
    try {
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            service: "gmail",
            secure: false, // true for 465, false for other ports
            auth: {
                user: userAddress, // generated ethereal user
                pass: userPassword // generated ethereal password
            }
        });

        if(!body) throw new Error('Body for email missed!');

        const {email, subject, text} = body;

        if(!email) throw new Error('Email address missed!');
        if(!subject) throw new Error('Email subject missed!');
        if(!text) throw new Error('Email text missed!');

        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: userAddress, // sender address
            to: email, // list of receivers
            subject: subject, // Subject line
            text: text // plain text body
            // html: "<b>Hello world?</b>" // html body
        }, (err, info) => {
            if (err) throw new Error(err);
            console.log("Message sent: %s", info.response);
        });

    } catch (e) {
        console.log(e.message);
    }
};
