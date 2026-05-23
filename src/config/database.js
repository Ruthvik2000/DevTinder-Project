//npm library to connect with mongodb is monogoose

const mongoose = require("mongoose");

const connectdb = async() => {

    /*Connecting to the mongodb cluster
    await mongoose.connect("mongodb+srv://settyruthvik2109_db_user:4SP8z0Q7cQ2WD8zH@cluster0.8eptb0f.mongodb.net/");
    */

    //add a database string name to the Connection String to open specific database other will it open the entire cluster
    //Connecting to the mongodb specidic database in the cluster
    const databasename="devTinder";
    await mongoose.connect("mongodb+srv://Ruthvik:CEFGkUgSN3q5aIiW@cluster0.8eptb0f.mongodb.net/"+databasename);

};

module.exports = connectdb;

