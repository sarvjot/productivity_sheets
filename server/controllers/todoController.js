import { Todo } from "../models/index.js";

function handleErrors(err) {
    if (err.code !== undefined) {
        return "A todo with same task type already exists today";
    }

    if (err.errors !== undefined) {
        return Object.values(err.errors)[0].message;
    }

    return err.message;
}

const handleGet = (req, res, next) => {
    const { date } = req.params;

    Todo.find({ author: res.locals.userId, creationTime: date })
        .then((data) => res.json(data))
        .catch(next);
};

const handlePost = (req, res) => {
    const { type, time, creationTime } = req.body;

    Todo.create({
        type,
        time,
        author: res.locals.userId,
        creationTime,
    })
        .then((data) => res.json(data))
        .catch((err) => {
            res.status(400).json(handleErrors(err));
        });
};

const handleDelete = async (req, res, next) => {
    Todo.findOneAndDelete({ _id: req.params.id, author: res.locals.userId })
        .then((data) => res.json(data))
        .catch(next);
};

export { handleGet, handlePost, handleDelete };
