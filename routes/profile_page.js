// IMPORTS
const express = require("express")
const profileRouter = express.Router()
const db = require("../database/connection")


profileRouter.get("/profile", (req, res) => {

    const sql = `SELECT * FROM users WHERE id = '${req.session.user_id}'`
    db.query(sql, (err, data) => {
        try {
            res.render("profile", 
            {data : data, message : req.flash('message'), 
            mismatch : req.flash('mismatch')})
        } catch (error) {
            res.json(error)
        }
    })

})


profileRouter.post("/update", (req, res) => {

    const user_id = req.session.user_id
    const email = req.body.email
    const password = req.body.password
    const c_password = req.body.c_password

    if(password != c_password){
        req.flash('mismatch', 'Two passwords mismatched!')
        res.redirect('/profile')
    }else {
        const sql = `UPDATE users SET email = '${email}', \
        password = '${password}' WHERE id = '${user_id}' `
        db.query(sql, (err, data) => {
            if(err) throw err;
            try {
                req.flash('message', 'Profile has been updated!')
                res.redirect('/profile')
    
            } catch (error) {
                res.json(error)
            }
        })
    }
})




module.exports = profileRouter