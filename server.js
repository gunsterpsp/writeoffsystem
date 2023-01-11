// IMPORTS
const express = require("express")
const controller = require("./routes/controller")
const path = require("path")
const bodyParser = require("body-parser")
const cookieParser = require('cookie-parser')
const session = require("express-session")
const db = require("./database/connection")
const flash = require("connect-flash")
require('dotenv').config()
const sessionStore = require("./database/session_store")


// EXPRESS START
const app = express()

app.use(flash())

// LOAD STATIC FILES
app.set("view engine", 'ejs')
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'dependencies')))


// MIDDLEWATE SETUP
app.use(express.json())
app.use(express.urlencoded({extended: true}))
// app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))


app.use(cookieParser());
 
app.use(session({
  name: process.env.SESS_NAME,
  store: sessionStore,
  secret: 'secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 3,
    expires: 1000 * 60 * 60 * 24 * 3
  },
//   store: new MySQLStore(options) // Change the express session store
}));


// app.use(flash())
app.use((req, res, next) => {
    res.locals.localId = req.session.id;
    res.locals.user_id = req.session.user_id
    res.locals.full_name = req.session.full_name;
    res.locals.username = req.session.username;
    res.locals.user_code = req.session.user_code;
    res.locals.group_name = req.session.group_name
    res.locals.branch_code = req.session.branch_code
    res.locals.area_code = req.session.area_code
    res.locals.district_code = req.session.district_code
    res.locals.branch_location = req.session.branch_location
    res.locals.session_name = req.session.session_name
    
    next();
})



app.get((req, res, next) => {

  const sqlGroups = `SELECT * FROM tbl_sergroup WHERE status = '1' `
  db.query(sqlGroups, (err, groups) => {
    res.write('/users', { group: 'meow' })
  })

  next();

})






// CONTROLLER ROUTES


// LOGIN
app.get("/", controller) // home
app.post("/login", controller) // login page
app.get("/forgot_password", controller) // forgot password user
app.get("/dashboard", controller) // dashboard user
app.get("/logout", controller) // logout

// USERS
app.get("/users", controller) // user page
app.get("/users/ho", controller) // user page
app.get("/users/dm", controller) // user page
app.get("/users/as", controller) // user page
app.get("/users/bh", controller) // user page
app.get("/users/dm/:district_code", controller) // user page
app.get("/users/as/:area_code", controller) // user page
app.get("/users/bh/:branch_code", controller) // user page
app.get("/api/users/read", controller) // fetch users
app.get("/users/groups/:user_code", controller) // fetch users
app.get("/users/groups", controller) // fetch users
app.post("/api/users/active/:id", controller) // status users
app.post("/api/users/inactive/:id", controller) // status users
app.post("/api/users/add", controller) // add users
app.post("/api/users/dm", controller) // add users
app.post("/api/users/as", controller) // add users
app.post("/api/users/bh", controller) // add users
app.put("/api/users/update/:id", controller) // update users
app.delete("/api/users/delete/:id", controller) // update users




// USERGROUP
app.get("/usergroups", controller) // user page
app.get("/api/usergroups/read", controller) // fetch groups
app.post("/api/usergroups/add", controller) // add usergroup
app.put("/api/usergroups/update/:user_code", controller) // update usergroup
app.post("/api/usergroups/active/:user_code", controller) // status users
app.post("/api/usergroups/inactive/:user_code", controller) // status users
app.delete("/api/usergroups/delete/:user_code", controller) // update users



// BRANCHES
app.get("/branches", controller) // user page
app.get("/api/branches/read", controller) // fetch groups
app.post("/api/branches/add", controller) // add usergroup
app.put("/api/branches/update/:branch_code", controller) // update usergroup
app.post("/api/branches/active/:branch_code", controller) // status users
app.post("/api/branches/inactive/:branch_code", controller) // status users
app.delete("/api/branches/delete/:branch_code", controller) // update users




// AREAS
app.get("/areas", controller) // user page
app.get("/api/areas/read", controller) // fetch groups
app.post("/api/areas/add", controller) // add usergroup
app.put("/api/areas/update/:area_code", controller) // update usergroup
app.post("/api/areas/active/:area_code", controller) // status users
app.post("/api/areas/inactive/:area_code", controller) // status users
app.delete("/api/areas/delete/:area_code", controller) // update users




// DISTRICTS
app.get("/districts", controller) // user page
app.get("/api/districts/read", controller) // fetch groups
app.post("/api/districts/add", controller) // add usergroup
app.put("/api/districts/update/:district_code", controller) // update usergroup
app.post("/api/districts/active/:district_code", controller) // status users
app.post("/api/districts/inactive/:district_code", controller) // status users
app.delete("/api/districts/delete/:district_code", controller) // update users



// PROFILE
app.get("/profile", controller)
app.post("/update", controller)




// DASHBOARD
app.get("/dashboard/users/count", controller) // users counts
app.get("/dashboard/branches/count", controller) // users counts
app.get("/dashboard/areas/count", controller) // area counts
app.get("/dashboard/districts/count", controller) // district counts
app.get("/dashboard/my_request/:branch_code", controller)
app.get("/dashboard/review/:branch_code", controller)
app.get("/dashboard/completed/:branch_code", controller)
app.get("/dashboard/area_supervisor/:area_code", controller)
app.get("/dashboard/district_manager/:district_code", controller)
app.get("/dashboard/head_office/:approver_code", controller)
app.get("/dashboard/my_approved/:approver_code", controller)
app.get("/dashboard/my_reject/:approver_code", controller)
app.get("/api/recent_request/read", controller)
app.get("/api/recent_request/transaction/:request_id", controller)
app.get("/api/all/approver/:request_id", controller)



// REQUEST
app.get("/request", controller) // user page
app.get("/api/request/read", controller) // user page
app.get("/api/request/transaction/:request_id", controller) // user page
app.post("/api/request/add", controller) // user page
app.put("/api/request/cancel/:request_id", controller) // user page


// REVIEW
app.get("/review", controller) // user page
app.get("/api/review/read", controller) // user page


// COMPLETED
app.get("/completed", controller) // user page
app.get("/api/completed/read", controller) // user page



// FOR REVIEW PAGE
app.get("/review_request", controller) // review request
app.get("/review_request/read", controller) // user page
app.get("/review_request/approve/:id", controller) // user page
app.put("/api/review_request/update/:id", controller) // user page
app.put("/api/review_request/update2/:id", controller) // user page
app.put("/api/review_request/reject/:id", controller) // user page



// LOCALHOST 80 LISTEN
app.listen(80, () => {
    console.log("Connected to port", 80)
})