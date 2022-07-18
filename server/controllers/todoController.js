import Todo from "../models/todoSchema.js";

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
    Todo.find({})
        .then((data) => res.json(data))
        .catch(next);
};

const handlePost = (req, res) => {
    Todo.create(req.body)
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
