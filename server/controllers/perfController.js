import { Perf } from "../models/index.js";

const handleGet = async (req, res) => {
    try {
        const { month } = req.params;

        const exists = await Perf.exists({ author: res.locals.userId, creationTime: month });

        if (exists == null) {
            Perf.create({
                author: res.locals.userId,
                creationTime: month,
            }).then((data) => res.json(data));
        } else {
            Perf.find({ author: res.locals.userId, creationTime: month }).then((data) =>
                res.json(data)
            );
        }
    } catch (err) {
        res.status(400).send(err);
    }
};

const handlePost = async (req, res) => {
    try {
        const { perf, day, month } = req.body;

        const exists = await Perf.exists({ author: res.locals.userId, creationTime: month });

        let doc;
        if (exists == null) {
            doc = await Perf.create({
                author: res.locals.userId,
                creationTime: month,
            });
        } else {
            doc = await Perf.findOne({ author: res.locals.userId, creationTime: month });
        }

        doc.perf[day] = perf;
        await doc.save();

        res.status(200).send("perf posted");
    } catch (err) {
        res.status(400).send(err);
    }
};

export { handleGet, handlePost };
