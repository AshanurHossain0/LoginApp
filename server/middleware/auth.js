import jwt from "jsonwebtoken";
import ENV from "../config.js"

export default async function auth(req,res,next){
    try{
        const token=req.headers.authorization.split(" ")[1];
        jwt.verify(token,ENV.JWT_SECRET, function (err, decodedToken) {
            if (err) {
                if (err.name === 'JsonWebTokenError') {
                    return res.status(401).send({ status: false, message: "invalid token" });
                }

                if (err.name === 'TokenExpiredError') {
                    return res.status(401).send({ status: false, message: "you are logged out, login again" });
                } else {
                    return res.send({ msg: err.message });
                }
            } else {
                req.user = decodedToken;
                next();
            }
        });
    }
    catch(error){
        return response.status(500).send({error:error.message});
    }
}