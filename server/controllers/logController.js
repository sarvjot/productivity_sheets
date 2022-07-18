import Log from "../models/logSchema.js";

function handleErrors(err) {
    if (err.errors !== undefined) {
        return Object.values(err.errors)[0].message;
    }

    return err.message;
}

const handleGet = (req, res, next) => {
    Log.find({})
        .then((data) => res.json(data))
        .catch(next);
};

const handlePost = (req, res) => {
    Log.create(req.body)
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
