var mongoose    =   require("mongoose");
mongoose.connect('mongodb://localhost:27017/parkingdb');
// create instance of Schema
var mongoSchema =   mongoose.Schema;
// create schema
var userSchema  = {
    "userEmail" : String,
    "userPassword" : String,
    "userName" : String,
    "firstName":String,
    "lastName":String
};


// create model if not exists.
module.exports = mongoose.model('user_login_info',userSchema);
