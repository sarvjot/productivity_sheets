import mongoose from "mongoose";
import validator from "validator";

const { Schema } = mongoose;
const { isInt } = validator;

const isString = (str) => {
    return str.length <= 30;
};

const TodoSchema = new Schema({
    type: {
        type: String,
        required: [true, "Task type should not be empty"],
        validate: [isString, "Task type should not be more than 30 characters"],
    },
    time: {
        type: String,
        required: [true, "Time can't be empty"],
        validate: [
            (str) => {
                return isInt(str, {
                    min: 1,
                    max: 1440,
                });
            },
            "Time has to be a positive integer in range less than 1440",
        ],
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    creationTime: {
        type: Date,
    },
});

TodoSchema.index({ author: 1, creationTime: 1, type: 1 }, { unique: true });

const Todo = mongoose.model("todo", TodoSchema);

export default Todo;
