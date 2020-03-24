// const mongoose = require("mongoose");
// const dbPath = "mongodb+srv://psychosocial909:89855991@cluster0-asokz.gcp.mongodb.net/test?retryWrites=true&w=majority";
// mongoose.connect(dbPath, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// });
// const db = mongoose.connection;
// db.on("error", () => {
//     console.log("> error occurred from the database");
// });
// db.once("open", () => {
//     console.log("> successfully opened the database");
// });
var mongoose = require('mongoose')
// var autoIncrement = require('mongoose-auto-increment');
// var connection = mongoose.createConnection("mongodb://bootaka123:89855991@ds239009.mlab.com:39009/todos");
mongoose.connect(
    'mongodb+srv://psychosocial909:89855991@cluster0-asokz.gcp.mongodb.net/test?retryWrites=true&w=majority',{
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
)

const db = mongoose.connection;
db.on("error", () => {
    console.log("> error occurred from the database");
});
db.once("open", () => {
    console.log("> successfully opened the database");
});

const schema = {
    name: { type: mongoose.SchemaTypes.String, required: true },
    email: { type: mongoose.SchemaTypes.String, required: true },
    password: { 
        type: mongoose.SchemaTypes.String, 
        required: true, 
        select: false
    }
};

const collectionName="user";
const userSchema=mongoose.Schema(schema);
const User=mongoose.model(collectionName,userSchema);

// Create user
// User.create({
//     name: "Chen",
//     email: "bootaka123@gmail.com",
//     password: "12345678"
// });
// Find user by email
// User.findOne({
//     email: "bootaka123@gmail.com"
// });
// Find user by email with the password field included
// User.findOne({
//     email: "bootaka123@gmail.com"
// }).select("+password");

User.find({},(err,data)=>{
    console.log(data)
})