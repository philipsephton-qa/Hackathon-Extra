const EXPRESS = require("express");
const MONGOOSE = require("mongoose");
const APP = EXPRESS();

const ROUTES = require("./routes/products");

// set up mongoose
MONGOOSE.connect("mongodb://localhost/products", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    APP.use(EXPRESS.json());
    APP.use(ROUTES);
    APP.listen(1371, () => {
            console.log("Server has started");
        });
    })

