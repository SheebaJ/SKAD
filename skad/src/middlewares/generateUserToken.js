const Response = require('../utils/response')
const secret = process.env.SECRET;
const jwt = require('jsonwebtoken');

const expirytime = 20;

module.exports = async (req, res, next) => {
    try {
        console.log("generating token!!");
        let jwtToken = "";
        if (!req.body.user) {
            return Response.Error(res, "Token Generation Failed!!");
        }
        jwtToken = jwt.sign({
            data: JSON.stringify(req.body.user)
        }, secret, { expiresIn: '25m' });

        let options = {
            maxAge: 25 * 60 * 1000,
            httpOnly: true, 
            secure: true,
            sameSite: "None",
        };
        res.cookie("SessionID",jwtToken, options);
        // req.body.token = {token:jwtToken,expirytime:expirytime}
        next();
    } catch (err) {
        return Response.Error(res, "Token Generation Failed!!");
    }
}