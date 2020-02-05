const { Pool } = require("pg");
const { validateEmail } = require("./utils");
const { sendVerification } = require("./sendgrid");
const { sendSuccessEmail } = require("./sendgrid");
const { sendWebhook } = require("./webhooksender");
const uuid = require("uuid/v4");

require("dotenv").config();

const pool = new Pool({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: 5432,
});

pool.on("error", (e) => {
    console.error("Postgres error", e);
});

const getVerifiedUserCount = async () => {
    const count = await pool.query("SELECT COUNT(*) FROM newsletter WHERE verified=TRUE");
    return count.rows[0].count;
};

exports.verifyUser = async (verifUUID) => {
    try {
        const doc = await pool.query("SELECT * FROM newsletter WHERE verif_token=$1", [verifUUID]);
        if (doc.rows.length === 0) return 400;
        await pool.query("UPDATE newsletter SET verified=TRUE, verif_token='' WHERE verif_token=$1", [doc.rows[0].verif_token]);
        await sendSuccessEmail(doc.rows[0].email);
        const currentVerifCount = await getVerifiedUserCount();
        await sendWebhook(doc.rows[0].email, currentVerifCount);
        console.log(`${doc.rows[0].email} successfully verified! Current count: ${currentVerifCount}`);
        return 200;
    }
    catch (e) {
        console.error("There was a problem while sending the successfully verified email to the user", verifUUID);
        throw e;
    }
};

exports.addUser = async (email) => {
    if (email && validateEmail(email)) {
        const doc = await pool.query("SELECT * FROM newsletter WHERE email=$1", [email]);
        if (doc.rows.length !== 0) return 409; // User already signed up
        const dbDate = new Date();
        const randomUUID = uuid();
        try {
            await pool.query("INSERT INTO newsletter VALUES ($1, $2, $3, $4)", [email, dbDate, false, randomUUID]);
            await sendVerification(email, randomUUID);
            return 201; // Created entry
        }
        catch (e) {
            console.error("There was a problem while running addUser", email, e);
            throw e;
        }
    }
    else {
        console.warn("\x1b[31m Invalid \x1b[0m email received: ", email);
        return 400; // Bad request
    }
};
