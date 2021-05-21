const ROUTER = require("express").Router();
const MOVIE = require("../models/product");

// get all products => works
ROUTER.get("/movies", async (req, res) => {
    const MOVIES = await MOVIE.find();
    res.send(MOVIES);
})

// Get one Product => error handling needed
ROUTER.get("/movies/find/:id", async (req, res, next) => {
    const NAME = req.params.id;
    const MOVIES = await MOVIE.findById(
        (err, prod) => {
            if (err) {
                console.error("error occured: ", err);
                res.send(err.stack);
            } else {
                try {
                    console.log("Movie found: ", prod.title, prod.actors, prod.description, prod.dateReleased);
                    res.send(`Movie: ${prod.title}, ${prod.actors}, ${prod.description}, ${prod.dateReleased}`);
                } catch (e) {
                    const myNotFoundError = new Error(`${NAME} not found in database`);
                    next(myNotFoundError);
                };
            };


        })
});

// create products => works
ROUTER.post("/products", async (req, res) => {
    const PROD = new MOVIE({
        "title": res.params.title;
        "actors": res.params.actors;
        "releaseDate": res.params.releaseDate;
        "description": res.params.description;
    });
    await PROD.save();
    res.send(PROD);
})

// update products => works - update more than banana
ROUTER.put("/movies/:id", async (req, res, next) => {
    const MOVIES = await MOVIE.findByIdAndUpdate(
        async (err, prod) => {
            if (err) {
                console.log("Movie does not exist", err);
                res.status(404).send(err.stack);
            } else {
                try {
                    prod.title = res.params.title;
                    prod.actors = res.params.actors;
                    prod.releaseDate = res.params.releaseDate;
                    prod.description = res.params.description;
                    await prod.save();
                    res.status(202).send(`${prod} has been updated`);
                }
                catch (error) {
                    const myNotFoundError = new Error(`${req.params.id} not found in database`);
                    next(myNotFoundError);
                }
            }

        });



})


// delete movie
ROUTER.delete("/movies/del/:id", async (req, res, next) => {
    const ID = req.query.id;

    await PRODUCT.findByIdAndDelete((err, prod)=> {
        // Handles error in request
        if (err) {
            res.send(err.stack);
        } else {
            // Handles whether returned movie exists or not
            try {
                res.send(`${prod.id} has been deleted from products database`);
                console.log(`Deleted movie: ${prod}`);
            } catch (error) {
                const notFoundErr = new Error(`${ID} not found in database, can't delete!`);
                next(notFoundErr);
            }
        }
    })

});

module.exports = ROUTER;
