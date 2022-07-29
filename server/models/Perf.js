import mongoose from "mongoose";

const { Schema } = mongoose;

const PerfSchema = new Schema({
    perf: {
        type: [String],
        default: Array(32).fill("0"),
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    creationTime: {
        type: Date,
    },
});

PerfSchema.index({ author: 1, creationTime: 1 }, { unique: true });

const Perf = mongoose.model("perf", PerfSchema);

export default Perf;
