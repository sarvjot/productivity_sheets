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
    const { date, id } = req.params;

    Todo.find({ author: id, creationTime: date })
        .then((data) => res.json(data))
        .catch(next);
};

const handlePost = (req, res) => {
    const { type, time, userId } = req.body;
    Todo.create({
        type,
        time,
        author: userId,
    })
        .then((data) => res.json(data))
        .catch((err) => {
            res.status(400).json(handleErrors(err));
        });
};

const handleDelete = (req, res, next) => {
    Todo.findOneAndDelete({ _id: req.params.id })
        .then((data) => res.json(data))
        .catch(next);
};

export { handleGet, handlePost, handleDelete };
