// IMPORTS
const express = require("express")
const controller = express.Router()
const loginRouter = require("./login_page")
const usersRouter = require("./users_page")
const usergroupsRouter = require("./usergroups_page")
const branchesRouter = require("./branches_page")
const areasRouter = require("./areas_page")
const districtsRouter = require("./districts_page")
const dashboardRouter = require("./dashboard_page")
const requestRouter = require("./request_page")
const reviewRouter = require("./review_page")
const reviewRequestRouter = require("./reviewRequest_page")
const completedRouter = require("./completed_page")
const profileRouter = require("./profile_page")


// LOGIN PAGES
controller.get("/", loginRouter) // home
controller.post("/login", loginRouter) // home
controller.get("/dashboard", loginRouter) // home
controller.get("/forgot_password", loginRouter) // home
controller.get("/logout", loginRouter) // home



// USER ACCOUNT PAGES
controller.get("/users", usersRouter) // home
controller.get("/users/ho", usersRouter) // home
controller.get("/users/dm", usersRouter) // home
controller.get("/users/as", usersRouter) // home
controller.get("/users/bh", usersRouter) // home
controller.get("/users/dm/:district_code", usersRouter) // home
controller.get("/users/as/:area_code", usersRouter) // home
controller.get("/users/bh/:branch_code", usersRouter) // home
controller.get("/api/users/read", usersRouter) // fetch api users
controller.get("/users/groups/:user_code", usersRouter)
controller.get("/users/groups/", usersRouter)
controller.post("/api/users/active/:id", usersRouter) // status switch to inactive user
controller.post("/api/users/inactive/:id", usersRouter) // status switch to active user
controller.post("/api/users/add", usersRouter) // add information of user accounts
controller.post("/api/users/dm", usersRouter) // add information of user accounts
controller.post("/api/users/as", usersRouter) // add information of user accounts
controller.post("/api/users/bh", usersRouter) // add information of user accounts
controller.put("/api/users/update/:id", usersRouter) // update information of user accounts
controller.delete("/api/users/delete/:id", usersRouter) // update information of user accounts




// USERGROUPS PAGES
controller.get("/usergroups", usergroupsRouter) // home
controller.get("/api/usergroups/read", usergroupsRouter) // home
controller.post("/api/usergroups/add", usergroupsRouter)
controller.put("/api/usergroups/update/:user_code", usergroupsRouter)
controller.post("/api/usergroups/active/:user_code", usergroupsRouter) // status switch to inactive user
controller.post("/api/usergroups/inactive/:user_code", usergroupsRouter) // status switch to active user
controller.delete("/api/usergroups/delete/:user_code", usergroupsRouter) // update information of user accounts




// BRANCHES PAGES
controller.get("/branches", branchesRouter) // home
controller.get("/api/branches/read", branchesRouter) // home
controller.post("/api/branches/add", branchesRouter)
controller.put("/api/branches/update/:branch_code", branchesRouter)
controller.post("/api/branches/active/:branch_code", branchesRouter) // status switch to inactive user
controller.post("/api/branches/inactive/:branch_code", branchesRouter) // status switch to active user
controller.delete("/api/branches/delete/:branch_code", branchesRouter) // update information of user accounts



// AREA PAGES
controller.get("/areas", areasRouter) // home
controller.get("/api/areas/read", areasRouter) // home
controller.post("/api/areas/add", areasRouter)
controller.put("/api/areas/update/:area_code", areasRouter)
controller.post("/api/areas/active/:area_code", areasRouter) // status switch to inactive user
controller.post("/api/areas/inactive/:area_code", areasRouter) // status switch to active user
controller.delete("/api/areas/delete/:area_code", areasRouter) // update information of user accounts



// DISTRICT PAGES
controller.get("/districts", districtsRouter) // home
controller.get("/api/districts/read", districtsRouter) // home
controller.post("/api/districts/add", districtsRouter)
controller.put("/api/districts/update/:district_code", districtsRouter)
controller.post("/api/districts/active/:district_code", districtsRouter) // status switch to inactive user
controller.post("/api/districts/inactive/:district_code", districtsRouter) // status switch to active user
controller.delete("/api/districts/delete/:district_code", districtsRouter) // update information of user accounts



// DASHBOARD
controller.get("/dashboard/users/count", dashboardRouter)
controller.get("/dashboard/branches/count", dashboardRouter)
controller.get("/dashboard/areas/count", dashboardRouter)
controller.get("/dashboard/districts/count", dashboardRouter)
controller.get("/dashboard/my_request/:branch_code", dashboardRouter)
controller.get("/dashboard/review/:branch_code", dashboardRouter)
controller.get("/dashboard/completed/:branch_code", dashboardRouter)
controller.get("/dashboard/area_supervisor/:area_code", dashboardRouter)
controller.get("/dashboard/district_manager/:district_code", dashboardRouter)
controller.get("/dashboard/head_office/:approver_code", dashboardRouter)
controller.get("/dashboard/my_approved/:approver_code", dashboardRouter)
controller.get("/dashboard/my_reject/:approver_code", dashboardRouter)
controller.get("/api/recent_request/read", dashboardRouter)
controller.get("/api/recent_request/transaction/:request_id", dashboardRouter)
controller.get("/api/all/approver/:request_id", dashboardRouter)



// PROFILE PAGE
controller.get("/profile", profileRouter)
controller.post("/update", profileRouter)




// REQUEST PAGE
controller.get("/request", requestRouter) // user page
controller.get("/api/request/read", requestRouter) // user page
controller.get("/api/request/transaction/:request_id", requestRouter) // user page
controller.post("/api/request/add", requestRouter) // user page
controller.put("/api/request/cancel/:request_id", requestRouter) // user page


// REVIEW PAGE
controller.get("/review", reviewRouter) // user page
controller.get("/api/review/read", reviewRouter) // user page


// REVIEW PAGE
controller.get("/completed", completedRouter) // user page
controller.get("/api/completed/read", completedRouter) // user page



// FOR REVIEW PAGE
controller.get("/review_request", reviewRequestRouter) // user page
controller.get("/review_request/read", reviewRequestRouter) // user page
controller.get("/review_request/approve/:id", reviewRequestRouter) // user page
controller.put("/api/review_request/update/:id", reviewRequestRouter) // user page
controller.put("/api/review_request/update2/:id", reviewRequestRouter) // user page
controller.put("/api/review_request/reject/:id", reviewRequestRouter) // user page



module.exports = controller