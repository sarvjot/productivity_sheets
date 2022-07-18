import mongoose from "mongoose";

const { Schema } = mongoose;

const UserSchema = new Schema({
    userName: String,
    email: String,
    password: String,
});

const User = mongoose.model("user", UserSchema);

export default User;
