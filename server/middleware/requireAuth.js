import jwt from "jsonwebtoken";
import User from "../models/User.js";

const requireAuth = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;

        if (token) {
            jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
                if (err) {
                    res.status(400).send(err);
                } else {
                    const user = await User.findUser(decodedToken.id);
                    if (user === null) {
                        res.status(400).send("Expired auth token detected");
                    } else {
                        res.locals.userId = user._id;
                        next();
                    }
                }
            });
        } else {
            res.status(400).send("No auth token detected");
        }
    } catch (err) {
        res.status(400).send(err);
    }
};

export default requireAuth;
