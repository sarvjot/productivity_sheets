import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";

const { Schema } = mongoose;
const { isEmail } = validator;

const isString = (str) => {
    return str.length <= 10;
};

const UserSchema = new Schema({
    userName: {
        type: String,
        required: [true, "Username should not be empty"],
        validate: [isString, "Username should not be more than 10 characters"],
    },
    email: {
        type: String,
        required: [true, "Email should not be empty"],
        validate: [isEmail, "Invalid Email"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Password should not be empty"],
    },
});

UserSchema.index({ email: 1 });

UserSchema.pre("save", async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

UserSchema.statics.login = async function (email, password) {
    const user = await this.findOne({ email });
    if (user) {
        const auth = await bcrypt.compare(password, user.password);
        if (auth) {
            return user;
        }
        throw Error("Incorrect password");
    }
    throw Error("Email does not exist");
};

UserSchema.statics.findUser = async function (id) {
    const user = await this.findOne({ _id: id });
    return user;
};

const User = mongoose.model("user", UserSchema);

export default User;
