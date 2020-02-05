const polka = require("polka");
const send = require("@polka/send-type");
const { urlencoded, json } = require("body-parser");
const helmet = require("helmet");
const { addUser } = require("./src/postgres");
const { verifyUser } = require("./src/postgres");

polka()
    .use(urlencoded({ extended: true })) // So we can parse the email from the POST request
    .use(json())
    .use(helmet()) // Prevent common attacks from HTTP headers
    .get("/api/verifyinterest/:verifToken", async (req, res) => {
        if (!req.params.verifToken) return send(res, 400, "Missing a verification token.");
        else {
            try {
                const code = await verifyUser(req.params.verifToken);
                if (code === 200) {
                    res.writeHead(301, { Location: encodeURI(`${process.env.WEBSITE_BASE}/?verified`) })
                    res.end()
                }
                else {
                    send(res, 404, "That token does not exist.");
                }
            }
            catch (e) {
                console.error("Verification error", e);
                res.writeHead(301, { Location: encodeURI(`${process.env.WEBSITE_BASE}/?error`) })
                res.end()
            }
        }
    })
    .post("/api/submitinterest", async (req, res) => {
        if (!req.body.email) return send(res, 400, "Invalid email!");
        try {
            const code = await addUser(req.body.email);
            if (code === 201) {
                send(res, 201, "Successfully signed up!");
            }
            else if (code === 409) {
                send(res, 409, "You have already signed up!");
            }
            else {
                send(res, 400, "Invalid email!");
            }
        }
        catch (e) {
            console.error("Error when adding user to newsletter");
            send(res, 500, "We encountered an error while adding you to the mailing list!");
        }
    })
    .get("*", async (req, res) => { // Wildcard catch any weird requests
        send(res, 404, "Nothing to see here.");
    })
    .listen(process.env.API_LISTEN_PORT || 8080, () => {
        console.log(`Listening on port ${process.env.API_LISTEN_PORT}`);
    });
