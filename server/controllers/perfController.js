import { Perf } from "../models/index.js";

const handleGet = async (req, res) => {
    try {
        let { date } = req.params;
        const { id } = req.params;

        date = new Date(date);
        const month = new Date(date.getFullYear(), date.getMonth());

        const exists = await Perf.exists({ author: id, creationTime: month });

        if (exists == null) {
            Perf.create({
                author: id,
                creationTime: month,
            });
        }

        Perf.find({ author: id, creationTime: month }).then((data) => res.json(data));
    } catch (err) {
        res.status(400).send(err);
    }
};

const handlePost = async (req, res) => {
    try {
        let { date } = req.body;
        const { perf, userId } = req.body;

        date = new Date(date);
        const month = new Date(date.getFullYear(), date.getMonth());
        const day = date.getDate() - 1;

        const exists = await Perf.exists({ author: userId, creationTime: month });

        let doc;
        if (exists == null) {
            doc = await Perf.create({
                author: userId,
                creationTime: month,
            });
        } else {
            doc = await Perf.findOne({ author: userId, creationTime: month });
        }

        doc.perf[day] = perf;
        await doc.save();

        res.status(200).send("perf posted");
    } catch (err) {
        res.status(400).send(err);
    }
};

export { handleGet, handlePost };
