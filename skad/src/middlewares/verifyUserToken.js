const Response = require('../utils/response');
const secret = process.env.SECRET;
const jwt = require('jsonwebtoken')
module.exports = async (req, res, next) => {
    try {
        console.log("Verifying token!!");
        const authHeader = req.headers["cookie"];
        if (!authHeader) { return Response.Error(res, "Session Expired!!"); }
        const cookie = authHeader.split("=")[1];
        console.log(cookie)
        let payload = jwt.verify(cookie, secret, function (err, payload) {
            if (err) {
                return { error: "expired" }
            }
            return payload
        });

        if (payload && payload.error && payload.error == 'expired') {
            return Response.Error(res, "Token Expired!!");
        }
        req.user = {
            token: cookie,
            ...JSON.parse(payload.data)
        };
        next();
    } catch (err) {
        return Response.Error(res, "Verification Failed!");
    }
};