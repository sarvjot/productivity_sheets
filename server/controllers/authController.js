import jwt from "jsonwebtoken";
import User from "../models/User.js";

function handleErrors(err) {
    if (err.code !== undefined) {
        return "A account with this email already exists";
    }

    if (err.errors !== undefined) {
        return Object.values(err.errors)[0].message;
    }

    return err.message;
}

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: maxAge,
    });
};

export const handleSignup = async (req, res) => {
    const { userName, email, password } = req.body;

    try {
        const user = await User.create({ userName, email, password });
        const token = createToken(user._id);
        res.cookie("jwt", token, {
            httpOnly: true,
            maxAge: maxAge * 1000,
            sameSite: "none",
            secure: true,
        });
        res.status(201).json({ user: userName });
    } catch (err) {
        res.status(400).json(handleErrors(err));
    }
};

export const handleLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.login(email, password);
        const token = createToken(user._id);
        res.cookie("jwt", token, {
            httpOnly: true,
            maxAge: maxAge * 1000,
            sameSite: "none",
            secure: true,
        });
        res.status(201).json({ user: user.userName });
    } catch (err) {
        res.status(400).json(handleErrors(err));
    }
};

export const handleLogout = (req, res) => {
    try {
        res.clearCookie("jwt");
        res.status(200).send("Cookie Deleted");
    } catch (err) {
        res.status(400).send(err);
    }
};

export const handleCheck = async (req, res) => {
    try {
        const token = req.cookies.jwt;

        if (token) {
            jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
                if (err) {
                    res.status(400);
                } else {
                    const user = await User.findUser(decodedToken.id);
                    if (user === null) {
                        res.clearCookie("jwt");
                        res.status(400).send("Expired Cookie Deleted!");
                    } else {
                        res.status(200).json({
                            userName: user.userName,
                        });
                    }
                }
            });
        } else {
            res.status(200).json(null);
        }
    } catch (err) {
        res.status(400).send(err);
    }
};
