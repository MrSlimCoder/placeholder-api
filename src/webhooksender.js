const sa = require("superagent");

require("dotenv").config();

exports.sendWebhook = async (email, verifCount) => {
    sa
        .post(process.env.DISCORD_WEBHOOK_URL)
        .send({
            username: "Newsletter Signup Tracker",
            avatar_url: "https://cdn.discordapp.com/attachments/671938382167015444/672190010992230410/Z.png", // eslint-disable-line camelcase
            embeds: [{
                description: `${email} has been verified. Current count: ${verifCount}`,
                color: 7506394,
            }],
        })
        .then((res, err) => {
            if (err) {
                console.error("Error while sending to webhook", err);
            }
            else {
                console.log("Webhook payload delivered successfully");
            }
        });
};
