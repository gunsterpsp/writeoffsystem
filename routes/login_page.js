// IMPORTS
const express = require("express")
const loginRouter = express.Router()
const db = require("../database/connection")
const sessionStore = require("../database/session_store")
require('dotenv').config()

// PAGES
loginRouter.get("/", (req, res) => {
    res.render("index", { message : req.flash('message')})
    // res.render("index")
})


loginRouter.post("/login", (req, res) => {
    const username = req.body.username
    const password = req.body.password

    const sql = `SELECT t1.id, t1.username, t1.password, t1.full_name, t1.status, t1.user_code, \
    t1.branch_code, t1.area_code, t1.district_code, t2.group_name, t3.branch_location, t4.session_name FROM
     users t1 LEFT JOIN tbl_usergroup t2 ON t1.user_code = t2.user_code LEFT JOIN tbl_branch_list t3
      ON t1.branch_code = t3.branch_code LEFT JOIN tbl_user_session t4 ON t1.user_session = t4.user_session WHERE
      t1.username = '${username}' AND t1.password = '${password}' AND t1.status = '1'`

    db.query(sql, (err, data, done) => {

        if(err) throw err;


                if(data.length > 0){
                    const user_session = data[0];
                    req.session.user_id = user_session.id
                    req.session.full_name = user_session.full_name;
                    req.session.user_code = user_session.user_code
                    req.session.username = user_session.username
                    req.session.group_name = user_session.group_name
                    req.session.branch_code = user_session.branch_code
                    req.session.area_code = user_session.area_code
                    req.session.district_code = user_session.district_code
                    req.session.branch_location = user_session.branch_location
                    req.session.session_name = user_session.session_name
                    res.redirect("/dashboard")
                }else {

                    req.flash('message', 'asdasdasd or ss!')
                    res.redirect("/")
                }

            res.end()

            // if(data.length){
            //     const user_session = data[0];
            //     req.session.user_id = user_session.id
            //     req.session.full_name = user_session.full_name;
            //     req.session.user_code = user_session.user_code
            //     req.session.group_name = user_session.group_name
            //     res.redirect("/dashboard")
           
            // }

            // else{
            //     req.flash('message', 'asdasdasd or ss!')
            //     res.redirect("/")
            // }



    })
})

// LOGIN PAGE END
loginRouter.get("/logout", (req, res) => {
    req.session.destroy(err => {
        if(err){
            return res.redirect('/')
        }
        sessionStore.close()
        res.clearCookie(process.env.SESS_NAME)
        res.redirect('/')
    })
    // if(err){
    //     return res.redirect('/')
    // }
    // req.session.destroy();
    // req.session = null; 
    // res.redirect('/');
})

loginRouter.get("/forgot_password", (req, res) => {
    res.render("forgot_password")
})

loginRouter.get("/dashboard", (req, res) => {

    if(req.session.username){
        res.render("dashboard")
    }else {
        res.redirect("/")
    }
    res.end();
})


module.exports = loginRouter