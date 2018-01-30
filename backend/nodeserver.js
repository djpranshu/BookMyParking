var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var booking = require("./models/booking");
var user = require("./models/user");
var router = express.Router();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    "extended": false
}));

router.get("/", function(req, res) {
    res.json({
        "error": false,
        "message": "Hello World"
    });
});

//route() will allow you to use same path for different HTTP operation.
//So if you have same URL but with different HTTP OP such as POST,GET etc
//Then use route() to remove redundant code.

router.route("/users")
    .get(function(req, res) {
        var response = {};
        user.find({}, function(err, data) {
            // Mongo command to fetch all data from collection.
            if (err) {
                response = {
                    "error": true,
                    "message": "Error fetching data"
                };
            } else {
                response = {
                    "error": false,
                    "message": data
                };
            }
            res.json(response);
        });
    })
    .post(function(req, res) {
        var db = new user();
        var response = {};

        var userPassword = require('crypto')
            .createHash('sha1')
            .update(req.body.password)
            .digest('base64');

        user.find({
            "userEmail": req.body.email,
            "userPassword": userPassword
        }, function(err, data) {
            // Mongo command to fetch all data from collection.
            console.log("data:::::",data);
            if (err) {
                response = {
                    "error": true,
                    "message": "Error fetching data"
                };
            } else {
                //var decrypted = key.decrypt(encrypted, 'utf8');
                if (data.length != 0) {
                    response = {
                        "error": false,
                        "message": data,
                        "success": true
                    };
                } else {
                    response = {
                        "error": false,
                        "message": data,
                        "success": false
                    };
                }
            }
            res.json(response);
        });

    });

router.route("/addusers")
    .get(function(req, res) {

    })
    .post(function(req, res) {
        var db = new user();
        var response = {};
        // fetch email and password from REST request.
        // Add strict validation when you use this in Production.
        db.userEmail = req.body.email;
        db.userName = req.body.username;
        db.firstName = req.body.firstname;
        db.lastName = req.body.lastname;
        // Hash the password using SHA1 algorithm.
        db.userPassword = require('crypto')
            .createHash('sha1')
            .update(req.body.password)
            .digest('base64');

        user.find({
            "userEmail": req.body.email
        }, function(err, data) {
            // Mongo command to fetch all data from collection.
            if (err) {
                response = {
                    "error": true,
                    "message": "Error fetching data"
                };
            } else {
                //var decrypted = key.decrypt(encrypted, 'utf8');
                if (data.length != 0) {
                    response = {
                        "error": true,
                        "message": "User Already Exists!"
                    };
                    res.json(response);
                } else {
                    db.save(function(err) {
                        // save() will run insert() command of MongoDB.
                        // it will add new data in collection.
                        if (err) {
                            response = {
                                "error": true,
                                "message": "Error adding data"
                            };
                        } else {
                            response = {
                                "error": false,
                                "message": "Successfully Registered!"
                            };
                        }
                        res.json(response);
                    });
                }
            }
        });
    });

    router.route("/getParkings")
        .post(function(req, res) {
          var bookingId = req.body.bookingid;
          booking.find({"bookingID": bookingId}, function(err, data) {
              // Mongo command to fetch all data from collection.
              if (err) {
                  response = {
                      "error": true,
                      "message": "Error fetching data"
                  };
              } else if(data.length != 0) {
                  response = {
                      "error": false,
                      "message": data,
                      "success":true
                  };
              }else{
                response = {
                    "error": false,
                    "message": data,
                    "success":false
                };
              }
              res.json(response);
          });
        })

    router.route("/bookParking")
        .post(function(req, res,data) {
            var db = new user();
            var response = {};

                db.userEmail = req.body.email;
                db.bookingDate = req.body.bookingdate;
                db.bookingAddress = req.body.bookingaddress;
                db.bookingStatus = req.body.bookingstatus;
                db.bookingID = req.body.bookingid;
                db.bookedOnDate = req.body.bookedondate;

                db.save(function(err) {
                    // save() will run insert() command of MongoDB.
                    // it will add new data in collection.
                    if (err) {
                        response = {
                            "error": true,
                            "message": "Error adding data"
                        };
                    } else {
                        response = {
                            "error": false,
                            "message": "Successfully added!"
                        };
                    }
                    res.json(response);
                });



        });

app.use('/', router);

app.listen(3000);
console.log("Listening to PORT 3000");
