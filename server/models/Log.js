import mongoose from "mongoose";
import validator from "validator";

const { Schema } = mongoose;
const { isInt } = validator;

const isString = (str) => {
    return str.length <= 30;
};

const isHour = (str) => {
    return isInt(str, {
        min: 0,
        max: 59,
    });
};

const isMinute = (str) => {
    return isInt(str, {
        min: 0,
        max: 59,
    });
};

function timeInMinutes(t1, t2) {
    return (t2.hour - t1.hour) * 60 + (t2.minute - t1.minute);
}

const LogSchema = new Schema({
    type: {
        type: String,
        required: [true, "Task type should not be empty"],
        validate: [isString, "Task type should not be more than 30 characters"],
    },
    name: {
        type: String,
        required: [true, "Task name should not be empty"],
        validate: [isString, "Task name should not be more than 30 characters"],
    },
    startTime: {
        hour: {
            type: String,
            validate: [isHour, "Start hour has to be a non-negative integer less than 24"],
        },
        minute: {
            type: String,
            validate: [isMinute, "Start minute has to be a non-negative integer less than 60"],
        },
    },
    endTime: {
        hour: {
            type: String,
            validate: [isHour, "End hour has to be a non-negative integer less than 24"],
        },
        minute: {
            type: String,
            validate: [isMinute, "End minute has to be a non-negative integer less than 60"],
        },
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    creationTime: {
        type: Date,
    },
});

LogSchema.index({ author: 1, creationTime: 1 });

LogSchema.pre("validate", function (next) {
    const t1 = this.startTime;
    const t2 = this.endTime;

    const valid = isHour(t1.hour) && isMinute(t1.minute) && isHour(t2.hour) && isMinute(t2.minute);

    if (valid && timeInMinutes(t1, t2) < 0) {
        next(new Error("Start time should not be after end time"));
    } else {
        next();
    }
});

const Log = mongoose.model("log", LogSchema);

export default Log;
