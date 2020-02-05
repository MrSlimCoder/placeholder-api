const mailer = require("@sendgrid/mail");

require("dotenv").config();

mailer.setApiKey(process.env.SENDGRID_API_KEY);

exports.sendSuccessEmail = async (email) => {
    await mailer.send({
        to: email,
        from: "no-reply@freely.is",
        subject: "Thank you for verifying",
        text: `Hello User, 

        Thank you for verifying your email! We'll keep you updated on news about our beta, and we're looking forward to seeing you on Freely soon.
        
        Thank you, 
        Freely Team`,
        html: `
            <style>
                p {
                    font-family: Arial, Helvetica, sans-serif;
                }
            </style>
            <p>
                Hello User!
            </p>
            <br>
            <p>
                Thank you for verifying your email! We'll keep you updated on news about our beta, and we're looking forward to seeing you on Freely soon.
            </p>
            <br>
            <p>
                Thank you,
                <br>
                Freely Team
            </p>
        `,
    });
};

exports.sendVerification = async (email, uuid) => {
    await mailer.send({
        to: email,
        from: "no-reply@freely.is",
        subject: "Freely Beta Newsletter",
        text: `Hello User!
        Thank you for your interest in our newsletter. Please click ${process.env.WEBSITE_BASE}/api/verifyinterest/${uuid} to verify your email so we can get you added to our email list for our beta.
        
        Thank you,
        Freely Team`,
        html: `
            <style>
                p {
                    font-family: Arial, Helvetica, sans-serif;
                }
            </style>
       
            <p>
                Hello User!
            </p>
            <br>
            <p>
                Thank you for your interest in our newsletter.
                <br> 
                Please click <a href="${process.env.WEBSITE_BASE}/api/verifyinterest/${uuid}">this</a> link to verify your email so we can get you added to our email list for our beta.
            </p>
            <br>
            <p>
                Thank you,
                <br>
                Freely Team
            </p>
            `
    });
};
