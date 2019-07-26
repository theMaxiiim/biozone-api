const errors = require('restify-errors');
const Keywords = require('../models/Keywords')

module.exports = server => {
    server.get('/keywords/all', async (req, res, next) => {
        //GET all keywords
        try {
            const keywords = await Keywords.find({});
            res.send(keywords);
            next();
        } catch (err) {
            return next(new errors.InvalidContentError(err));
        }
    });

    //GET specific keyword

    server.get('/keywords/:id', async (req, res, next) => {
        try {
            const keyword = await Keywords.findById(req.params.id);
            if (keyword === null) {
                res.send(`There is no keyword with the id of ${req.params.id}`)
                next();
            }
            res.send(keyword)
            next();
        } catch (err) {
            return next(new errors.ResourceNotFoundError(`There is no keyword with the id of ${req.params.id}`));
        }
    });

    //GET random keyword
    server.get('/keywords/random', async (req, res, next) => {
        try {
            // Get the count of all users
            Keywords.countDocuments().exec(function (err, count) {

                // Get a random entry
                const random = Math.floor(Math.random() * count)

                // Again query all users but only fetch one offset by our random #
                Keywords.findOne().skip(random).exec(
                    function (err, result) {
                        res.send(result)
                    })
            })
            next();
        } catch (err) {
            return next(new errors.InvalidContentError(err));        }
    });

    //POST keyword(s)
    server.post('/keywords', async (req, res, next) => {
        //Check for JSON
        if (!req.is('application/json')) {
            return next(new errors.InvalidContentError("Expects 'application/json'"));
        }

        const {
            messages,
            queueItemId,
            device
        } = req.body;
        const keywords = new Keywords({
            messages,
            queueItemId,
            device
        });

        try {
            const newKeyword = await keywords.save();
            res.send(201);
            next();
        } catch (err) {
            return next(new errors.InternalError(err.message));
        }
    });

    // PUT (UPDATE) KEYWORD
    server.put('/keywords/:id', async (req, res, next) => {
        // Check for JSON
        if (!req.is('application/json')) {
            return next(
                new errors.InvalidContentError("Expects 'application/json'")
            );
        }

        try {
            const keyword = await Keywords.findOneAndUpdate({
                _id: req.params.id
            }, req.body);
            res.send(200);
            next();
        } catch (err) {
            return next(
                new errors.ResourceNotFoundError(
                    `There is no keyword with the id of ${req.params.id}`
                )
            );
        }
    });

    server.del('/keywords/:id', async (req, res, next) => {
        try {
            const keyword = await Keywords.findOneAndRemove({
                _id: req.params.id
            });
            res.send(204);
            next();
        } catch (err) {
            return next(
                new errors.ResourceNotFoundError(
                    `There is no keyword with the id of ${req.params.id}`
                )
            );
        }
    });

};