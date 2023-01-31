var session = require('express-session');
var express = require('express');
var router = express.Router();
var connection = require("../public/database/connection");


router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

//ADMIN ROUTES++

//Add Admin Details
router.post("/add-admin", (req, res) => {
    let {uname, password, confirmpassword, newmail, fullname, phonenumber, type} = req.body;
    let emailcheckselectquery = `SELECT username,email from admin where email="${newmail}" OR username="${uname}"`;
    connection.query(emailcheckselectquery, (error, rows) => {
        console.log(rows);
        if (error) {
            return res.send("Some Technical Problems at backend");
        } else if (rows.length > 0) {
            return res.send("exists");
        } else {
            let insertQuery = `INSERT into admin(username,password,email,fullname,phoneno,type) VALUES("${uname}","${password}","${newmail}","${fullname}","${phonenumber}","${type}")`;
            connection.query(insertQuery, (error) => {
                if (error) {
                    return res.send("error");
                }
                return res.send("success");
            });
        }
    });
});

//Login Details Validation

router.post("/check-details", (req, res) => {
    let {name_email, login_pass} = req.body;
    let checklogindetails = `SELECT * from admin where (email="${name_email}" OR username="${name_email}") AND password="${login_pass}"`;
    connection.query(checklogindetails, (error, rows) => {
        if (error) {
            return res.send("error");
        } else if (rows.length === 0) {
            return res.send("failure");
        } else if (rows.length > 0) {
            if (rows[0].status === 'active') {
                let adminData = {'username': rows[0].username, 'type': rows[0].type};
                session.adminSession = adminData;
                return res.send("success login");
            } else {
                return res.send("inactive");
            }
        }
    });
});

//Viewing Admin Details
router.get("/getadmindetails", (req, res) => {
    let selectquery = `select * from admin`;
    connection.query(selectquery, (error, rows) => {
        if (error) {
            return res.send("error");
        } else if (rows.length === 0) {
            return res.send("nodata");
        } else if (rows.length > 0) {
            return res.send(rows);
        }
    });
});


//Updating Admin Details
router.get("/get-data-by-username:username", (req, res) => {
    let {username} = req.params;
    let selectquery = `select username,type,status from admin where username="${username}"`;
    connection.query(selectquery, (error, rows) => {
        if (error) {
            return res.send("error");
        } else if (rows.length > 0) {
            return res.send(rows);
        }
    });
});

router.post("/update-admin-details", (req, res) => {
    let {uname, type, updatestatus} = req.body;
    let updateQuery = `update admin set type="${type}",status="${updatestatus}" where username="${uname}"`;
    connection.query(updateQuery, (error) => {
        if (error) {
            return res.send("error");
        } else {
            return res.send("success");
        }
    })
})

router.post("/logout-admin", (req, res) => {
    session.adminSession = undefined;
})

router.post("/change-admin-password", (req, res) => {
    let {oldpassword, newpassword, confirmnewpassword} = req.body;
    let uname = session.adminSession.username;
    let checkoldpassquery = `select password from admin where username="${uname}"`;
    connection.query(checkoldpassquery, (error, rows) => {
        if (error) {
            console.log(error);
        } else if (oldpassword !== rows[0].password) {
            return res.send("wrongpassword");
        } else if (oldpassword === rows[0].password) {
            let changepassquery = `UPDATE admin set password="${newpassword}" where username="${uname}";`
            connection.query(changepassquery, (error) => {
                if (error) {
                    return res.send("failure");
                } else {
                    return res.send("success");
                }
            });
        }
    });
});
router.get('/check-admin-logged-in', (req, res) => {
    console.log(session.adminSession);
    if (session.adminSession === undefined) {
        res.send("failed");
    } else {
        return res.send(session.adminSession);
    }
});


// owner signup form
router.post("/join-owner", (req, res) => {
    let {owner_name, contact_no, password, contact_email} = req.body;
    let emailcheckselectquery = `SELECT contact_email from owner where contact_email="${contact_email}"`;
    connection.query(emailcheckselectquery, (error, rows) => {
        console.log(rows.length);
        if (error) {
            return res.send("error");
        } else if (rows.length > 0) {
            return res.send("exists");
        } else if (rows.length === 0) {
            let insertQuery = `INSERT into owner(contact_email,organiser_name,password,contact_no) Values("${contact_email}","${owner_name}","${password}","${contact_no}")`;
            connection.query(insertQuery, (error) => {
                if (error) {
                    return res.send(error);
                } else {
                    return res.send("success");
                }
            });
        }
    });
});


//Get Pending owners
router.post("/getpendingowners", (req, res) => {
    let {activatestatus} = req.body;
    if (activatestatus === "pending") {
        let selectquery = `select * from owner where status="pending"`;
        connection.query(selectquery, (error, rows) => {
            if (error) {
                return res.send("error");
            } else if (rows.length === 0) {
                return res.send("nodata");
            } else if (rows.length > 0) {
                return res.send(rows);
            }
        });
    } else if (activatestatus === "activated") {
        let selectquery = `select * from owner where status="activated" OR status="blocked"`;
        connection.query(selectquery, (error, rows) => {
            if (error) {
                return res.send("error");
            } else if (rows.length === 0) {
                return res.send("nodata");
            } else if (rows.length > 0) {
                return res.send(rows);
            }
        });
    }
});

//Activate owner
router.post("/owner-actions", (req, res) => {
    let {email, accountstatus} = req.body;
    if (accountstatus === "pending") {
        let activateQuery = `update owner set status="activated" where contact_email="${email}"`;
        connection.query(activateQuery, (error) => {
            if (error) {
                return res.send("error");
            } else {
                return res.send("activated");
            }
        })
    } else if (accountstatus === "activated") {
        let activateQuery = `update owner set status="blocked" where contact_email="${email}"`;
        connection.query(activateQuery, (error) => {
            if (error) {
                return res.send("error");
            } else {
                return res.send("blocked");
            }
        })
    }
})

//Activate event
router.post("/activate-event", (req, res) => {
    let {event_id, accountstatus} = req.body;
    if (accountstatus === "pending") {
        let activateQuery = `update events set status="activated" where event_id="${event_id}"`;
        connection.query(activateQuery, (error) => {
            if (error) {
                return res.send("error");
            } else {
                return res.send("activated");
            }
        })
    } else if (accountstatus === "activated") {
        let activateQuery = `update events set status="blocked" where event_id="${event_id}"`;
        connection.query(activateQuery, (error) => {
            if (error) {
                return res.send("error");
            } else {
                return res.send("blocked");
            }
        })
    }
})

//event actions

router.post("/event-actions", (req, res) => {
    let {event_id, accountstatus} = req.body;
    if (accountstatus === "pending") {
        let activateQuery = `update events set status="activated" where event_id="${event_id}"`;
        connection.query(activateQuery, (error) => {
            if (error) {
                return res.send("error");
            } else {
                return res.send("activated");
            }
        })
    } else if (accountstatus === "activated") {
        let activateQuery = `update events set status="blocked" where event_id="${event_id}"`;
        connection.query(activateQuery, (error) => {
            if (error) {
                return res.send("error");
            } else {
                return res.send("blocked");
            }
        })
    }
})

//**********************************Organiser login ***********************************

router.post("/check-organiser-details", (req, res) => {
    let {name_email, login_pass} = req.body;
    let checklogindetails = `SELECT * from owner where contact_email="${name_email}" AND password="${login_pass}"`;
    connection.query(checklogindetails, (error, rows) => {
        if (error) {
            return res.send("error");
        } else if (rows.length === 0) {
            return res.send("failure");
        } else if (rows.length > 0) {
            if (rows[0].status === 'pending') {
                return res.send("pending");
            } else if (rows[0].status === 'activated') {
                session.organiserSession = name_email;
                return res.send("success login");
            }
        } else {
            return res.send("inactive");
        }
    });
});


router.post("/changeorganiserpassword", (req, res) => {
    let {oldpassword, newpassword, confirmnewpassword} = req.body;
    let email = session.organiserSession;
    let checkoldpassquery = `select password from owner where contact_email="${email}"`;
    connection.query(checkoldpassquery, (error, rows) => {
        if (error) {
            console.log(error);
        } else if (oldpassword !== rows[0].password) {
            return res.send("wrongpassword");
        } else if (oldpassword === rows[0].password) {
            let changepassquery = `UPDATE owner set password="${newpassword}" where contact_email ="${email}";`
            connection.query(changepassquery, (error) => {
                if (error) {
                    return res.send("failure");
                } else {
                    return res.send("success");
                }
            });
        }
    });
});

router.get('/check-organiser-logged-in', (req, res) => {
    if (session.organiserSession === undefined) {
        res.send("failed");
    } else {
        res.send("success");
    }
});


//Logout Organiser
router.post("/logout-organiser", (req, res) => {
    session.organiserSession = undefined;
});


// add event
router.post("/add-event", (req, res) => {
    let {name, location, owner_email, contact_no, price, category_name} = req.body
    let image = req.files.photo;
    let serverpath = `public/images/${image.name}`;
    let dbPath = `images/${image.name}`;
    image.mv(serverpath, (error) => {
        if (error) {
            console.log(error);
        }
    });
    let insertQuery = `INSERT into events(event_id,name,location,owner_email,contact_no,photo,price,category_name) VALUES(null,"${name}","${location}","${owner_email}","${contact_no}","${dbPath}","${price}","${category_name}")`;
    connection.query(insertQuery, (error) => {
        if (error) {
            return res.send(error);
        } else {
            return res.send("success");
        }
    });
});

//VIEW EVENTS
router.get("/geteventdetails", (req, res) => {
    let owner_email = session.organiserSession;
    let selectquery = `select * from events where owner_email="${owner_email}"`;
    connection.query(selectquery, (error, rows) => {
        if (error) {
            return res.send("error");
        } else if (rows.length === 0) {
            return res.send("nodata");
        } else if (rows.length > 0) {
            return res.send(rows);
        }
    });
});

// edit event


router.get("/get-data-by-event_id:event_id", (req, res) => {
    let {event_id} = req.params;
    let selectquery = `select * from events where event_id="${event_id}"`;
    connection.query(selectquery, (error, rows) => {
        if (error) {
            return res.send("error");
        } else if (rows.length > 0) {
            return res.send(rows);
        }
    });
});

router.post("/update-event-details", (req, res) => {
    let {category_name, contact_no, event_id, location, name, owner_email, price} = req.body;
    let image = req.files.photo;
    let serverpath = `public/images/${image.name}`;
    let dbPath = `images/${image.name}`;
    image.mv(serverpath, (error) => {
        if (error) {
            console.log(error);
        }
    });

    let updateQuery = `update events set category_name="${category_name}", contact_no="${contact_no}",location="${location}", name="${name}", owner_email="${owner_email}",photo="${dbPath}",price="${price}" where event_id="${event_id}"`;
    connection.query(updateQuery, (error) => {
        if (error) {
            return res.send("error");
        } else {
            return res.send("success");
        }
    })
})

// delete event
router.post("/delete-event", (req, res) => {
    let {event_id} = req.body;
    let deletequery = `Delete from events where event_id=${event_id}`;
    connection.query(deletequery, (error) => {
        if (error) {
            return res.send("error");
        } else {
            return res.send("success");
        }
    })
})


//Get Pending events
router.post("/getpendingevents", (req, res) => {
    let {activatestatus} = req.body;
    if (activatestatus === "pending") {
        let selectquery = `select * from events where status="pending"`;
        connection.query(selectquery, (error, rows) => {
            if (error) {
                return res.send("error");
            } else if (rows.length === 0) {
                return res.send("nodata");
            } else if (rows.length > 0) {
                return res.send(rows);
            }
        });
    } else if (activatestatus === "activated") {
        let selectquery = `select * from events where status="activated" OR status="blocked"`;
        connection.query(selectquery, (error, rows) => {
            if (error) {
                return res.send("error");
            } else if (rows.length === 0) {
                return res.send("nodata");
            } else if (rows.length > 0) {
                return res.send(rows);
            }
        });
    }
});

//Add user Details
router.post("/add-user", (req, res) => {
    let {user_email, password, user_mobile, user_name, user_address} = req.body;
    console.log(req.body);
    let emailcheckselectquery = `SELECT user_email from user where user_email="${user_email}" `;
    connection.query(emailcheckselectquery, (error, rows) => {
        console.log(rows);
        if (error) {
            return res.send("Some Technical Problems at backend");
        } else if (rows.length > 0) {
            return res.send("exists");
        } else {
            let insertQuery = `INSERT into user(user_id,user_email,password,user_mobile,user_name,otp,user_address) VALUES(null,"${user_email}","${password}","${user_mobile}","${user_name}","","${user_address}")`;
            connection.query(insertQuery, (error) => {
                if (error) {
                    return res.send("error");
                }
                return res.send("success");
            });
        }
    });
});


router.post("/user-details", (req, res) => {
    let {user_email, password} = req.body;
    let checklogindetails = `SELECT * from user where (user_email="${user_email}" ) AND password="${password}"`;
    connection.query(checklogindetails, (error, rows) => {
        if (error) {
            return res.send("error");
        } else if (rows.length === 0) {
            return res.send("failure");
        } else if (rows.length > 0) {
            let userData = {user_email, user_name: rows[0].user_name};
            session.userSession = userData;
            return res.send("success login");
        } else {
            return res.send("failed")
        }
    });
});

router.get('/check-user-logged-in', (req, res) => {

    if (session.userSession === undefined) {
        res.send("failed");
    } else {
        return res.send(session.userSession);
    }
});
//view user details


router.get("/get-user-details", (req, res) => {
    let email = session.userSession.user_email;
    let selectquery = `select * from user where user_email="${email}"`;
    connection.query(selectquery, (error, rows) => {
        if (error) {
            return res.send("error");
        } else if (rows.length === 0) {
            return res.send("nodata");
        } else if (rows.length > 0) {
            return res.send(rows);
        }
    });
});

//update user details
router.get("/update-user-profile:user_id", (req, res) => {
    let {user_id} = req.params;
    let selectquery = `SELECT * from user where user_id="${user_id}"`;
    connection.query(selectquery, (error, rows) => {
        if (error) {
            return res.send("error");
        } else if (rows.length > 0) {
            return res.send(rows);
        }
    });
});

router.post("/update-user-details:user_id", (req, res) => {

    let {user_email, password, user_mobile, user_name, user_address} = req.body;
    let {user_id} = req.params;
    let updateQuery = `update user set  user_email="${user_email}",password="${password}",user_mobile="${user_mobile}",user_name="${user_name}",user_address="${user_address}" where user_id="${user_id}"`;
    console.log(updateQuery)
    connection.query(updateQuery, (error) => {
        if (error) {
            return res.send("error");
        } else {
            let insertquery = `update biling set user_email="${user_email}",user_name="${user_name}",user_city="${user_address}" where user_email="${session.userSession.user_email}"`;
            connection.query(insertquery, (error) => {
                if (error) {
                    return res.send("error");
                }
                return res.send("success");
            })
        }
    })
})


router.post("/change-user-password", (req, res) => {
    let {oldpassword, newpassword, confirmnewpassword} = req.body;
    let uname = session.userSession.user_email;
    let checkoldpassquery = `select password from user where user_email="${uname}"`;
    connection.query(checkoldpassquery, (error, rows) => {
        if (error) {
            console.log(error);
        } else if (oldpassword !== rows[0].password) {
            return res.send("wrongpassword");
        } else if (oldpassword === rows[0].password) {
            let changepassquery = `UPDATE user set password="${newpassword}" where user_email="${uname}";`
            connection.query(changepassquery, (error) => {
                if (error) {
                    return res.send("failure");
                } else {
                    return res.send("success");
                }
            });
        }
    });
});


router.post("/logout-user", (req, res) => {
    session.userSession = undefined;
});

router.get("/get-user-session", (req, res) => {
    return res.send(session.userSession);
})

//view events on home page


router.get("/view-eventson-homepage", (req, res) => {

    let selectquery = `select * from events where status="activated" limit 6`;
    connection.query(selectquery, (error, rows) => {
        if (error) {
            return res.send("error");
        } else {
            return res.send(rows);
        }
    });


});

router.get("/cart:event_id", (req, res) => {
    let {event_id} = req.params;

    let selectquery = `select * from events where event_id=${event_id}`;
    connection.query(selectquery, (error, rows) => {
        if (error) {
            return res.send("error");
        } else {
            return res.send(rows);
        }
    });


});

//Cart Billing validation

// router.post("/validation-billing",(req,res)=>{
//     let {propertyname}=req.body;
//     let selectQuery=`select event_date from biling where property_name="${propertyname}"`;
//     connection.query(selectQuery,(error,rows)=>{
//         if(error){
//             return res.send(error);
//         }
//         return res.send(rows);
//     })
// })


// get-user-data-checkout


router.get("/get-user-checkout", (req, res) => {
    let selectquery = `select * from user where user_email="${session.userSession.user_email}"`;
    connection.query(selectquery, (error, rows) => {
        if (error) {
            return res.send("error");
        } else {
            return res.send(rows);
        }
    });


});

//billing-details
router.post("/billing-details", (req, res) => {
    let {
        user_city,
        user_state,
        user_email,
        user_name,
        total,
        name,
        owner_email,
        no_of_people,
        date,
        time,
        payment_method,
        category_name,
        status
    } = req.body;

    let insertQuery = `INSERT into biling (bill_id,user_name,user_email,user_city,user_state,grand_total,property_name,owner_email,event_date,event_time,category_name,no_of_people,payment_method,status) VALUES(null,"${user_name}","${user_email}","${user_city}","${user_state}","${total}","${name}","${owner_email}","${date}","${time}","${category_name}","${no_of_people}","${payment_method}","${status}")`;
    connection.query(insertQuery, (error) => {
        if (error) {
            return res.send(error);
        }
        return res.send("success");
    });
});


router.get("/get-bookings", (req, res) => {
    let selectquery = `select * from biling where user_email="${session.userSession.user_email}"`;
    console.log(selectquery)
    connection.query(selectquery, (error, rows) => {
        if (error) {
            return res.send("error");
        } else {
            return res.send(rows);
        }
    });
});


router.post("/cancel-booking", (req, res) => {
    let {bill_id} = req.body;
    let selectquery = `Delete from biling where bill_id ="${bill_id}"`;
    connection.query(selectquery, (error) => {
        if (error) {
            return res.send("error");
        } else {
            return res.send("success");
        }
    });
})

// contact details

router.post("/contact_details", (req, res) => {
    let {user_email, user_name, user_mobile, user_message} = req.body;
    let selectquery = `insert into contact_us(query_id,user_name,user_email,user_message,user_mobile) values(null,"${user_name}","${user_email}","${user_message}","${user_mobile}")`;
    connection.query(selectquery, (error) => {
        if (error) {
            return res.send("error");
        } else {
            return res.send("success");
        }
    });
});

// view contact us queries

router.get("/view-contact-us", (req, res) => {
    let selectquery = `select * from contact_us where status="pending"`;
    connection.query(selectquery, (error, rows) => {
        if (error) {
            return res.send("error");
        } else {
            return res.send(rows);
        }
    });
});

router.post("/change-query-status", (req, res) => {
    let {query_id} = req.body;
    let selectquery = `update contact_us set status="solved" where query_id="${query_id}"`;
    connection.query(selectquery, (error) => {
        if (error) {
            return res.send("error");
        } else {
            return res.send("success");
        }
    });
});

// view-all-users

router.get("/view-all-users", (req, res) => {

    let selectquery = `select * from user `;
    connection.query(selectquery, (error, rows) => {
        if (error) {
            return res.send("error");
        } else {
            return res.send(rows);
        }
    });
});

//view-all-bookings


router.get("/view-all-bookings", (req, res) => {

    let selectquery = `select * from biling where status="pending"`;
    connection.query(selectquery, (error, rows) => {
        if (error) {
            return res.send("error");
        } else {
            return res.send(rows);
        }
    });
});

//update booking status
router.post("/change-booking-status", (req, res) => {
    let {bill_id} = req.body;
    let selectquery = `update biling set status="done" where bill_id="${bill_id}"`;
    connection.query(selectquery, (error) => {
        if (error) {
            return res.send("error");
        } else {
            return res.send("success");
        }
    });
});


router.get("/view-all-bookings-owner", (req, res) => {

    let selectquery = `select * from biling where owner_email="${session.organiserSession}"`
    connection.query(selectquery, (error, rows) => {
        if (error) {
            return res.send("error");
        } else {
            return res.send(rows);
        }
    });
});


//view-eventson-bookingpage

router.get("/view-eventson-bookingpage", (req, res) => {

    let selectquery = `select * from events where status="activated"`;
    connection.query(selectquery, (error, rows) => {
        if (error) {
            return res.send("error");
        } else {
            return res.send(rows);
        }
    });
});


module.exports = router;