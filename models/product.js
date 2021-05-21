const MONGOOSE = require("mongoose");
const SCHEMA = MONGOOSE.Schema;


const MOVIESSCHEMA = new SCHEMA({
    title: String,
    actors: [{
        mainActor: String,
        supportActor: String
    }],
    description: String,
    dateReleased: Date
})

module.exports = MONGOOSE.model("products",PRODUCTSCHEMA);