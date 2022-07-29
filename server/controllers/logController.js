import { Log } from "../models/index.js";

function handleErrors(err) {
    if (err.errors !== undefined) {
        return Object.values(err.errors)[0].message;
    }

    return err.message;
}

const handleGet = (req, res, next) => {
    const { date, id } = req.params;

    Log.find({ author: id, creationTime: date })
        .then((data) => res.json(data))
        .catch(next);
};

const handlePost = (req, res) => {
    const { type, name, startTime, endTime, userId } = req.body;

    Log.create({
        type,
        name,
        startTime,
        endTime,
        author: userId,
    })
        .then((data) => res.json(data))
        .catch((err) => {
            res.status(400).json(handleErrors(err));
        });
};

const handleDelete = (req, res, next) => {
    Log.findOneAndDelete({ _id: req.params.id })
        .then((data) => res.json(data))
        .catch(next);
};

export { handleGet, handlePost, handleDelete };
