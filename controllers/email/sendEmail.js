const nodemailer = require("nodemailer");

module.exports = async (body) => {
    try {
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            service: "gmail",
            secure: false, // true for 465, false for other ports
            auth: {
                user: process.env.USER_ADDRESS, // generated ethereal user
                pass: process.env.USER_PASSWORD // generated ethereal password
            }
        });

        if(!body) throw new Error('Body for email missed!');

        const {email, subject, text} = body;

        if(!email) throw new Error('Email address missed!');
        if(!subject) throw new Error('Email subject missed!');
        if(!text) throw new Error('Email text missed!');

        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: process.env.USER_ADDRESS, // sender address
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
