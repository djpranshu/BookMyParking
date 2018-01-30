var mongoose    =   require("mongoose");
mongoose.connect('mongodb://localhost:27017/parkingdb');
// create instance of Schema
var mongoSchema =   mongoose.Schema;


var bookingSchema  = {
    "userEmail" : String,
    "bookingDate" : String,
    "bookingAddress" : String,
    "bookingStatus":String,
    "bookingID":String,
    "bookedOnDate":String
};

// create model if not exists.

module.exports = mongoose.model('user_booking_info',bookingSchema);
