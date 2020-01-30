const mailer = require("@sendgrid/mail");

require("dotenv").config();

mailer.setApiKey(process.env.SENDGRID_API_KEY);

exports.sendSuccessEmail = async (email) => {
    await mailer.send({
        to: email,
        from: "toucan@freely.is",
        subject: "Newsletter Sign Up",
        text: "Toucan", // this does not render when html is populated
        html: "Hello User! <br />Thank you for your interest! We will send updates to you now. <br /><br />Cheers,<br />Toucan",
    });
};

exports.sendVerification = async (email, uuid) => {
    await mailer.send({
        to: email,
        from: "toucan@freely.is",
        subject: "Newsletter Sign Up",
        text: "Toucan", // this does not render when html is populated
        html: `Hello User! <br />Thank you for your interest in our newsletter. Please click <a href=http://localhost:8080/api/verifyinterest/${uuid}>this link</a> to verify that you\'re not a bot. <br /><br />Cheers,<br />Toucan`, // eslint-disable-line no-useless-escape
    });
};
