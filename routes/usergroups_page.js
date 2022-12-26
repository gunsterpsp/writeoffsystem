// IMPORTS
const express = require("express")
const usergroupsRouter = express.Router()
const db = require("../database/connection")


usergroupsRouter.get("/usergroups", (req, res) => {
    res.render("usergroups")
})

// FETCH API USERS
usergroupsRouter.get('/api/usergroups/read', (req, res, next) => {
    const sql = `SELECT * FROM tbl_usergroup WHERE NOT status = '100' `
    db.query(sql , (err, data) => {

        if(req.session.user_code == 1){
            try {
                const array = [];
                data.forEach((row) => {
                    const action = `<button class="btn btn-warning btnView"\
                    data-id='${row.user_code}' data-group='${row.group_name}'\
                     data-bs-toggle="modal" data-bs-target="#EditBackdrop">\
                     <i class="mdi mdi-table-edit"></i></button>`
                        if(row.status == 1){
                            var status_id = `<button type="button" data-group="${row.group_name}" data-id="${row.user_code}" class="btn btn-success activeId"\
                             data-id=${row.id}>Active</button>`
                        }else {
                            var status_id = `<button type="button" data-group="${row.group_name}" data-id="${row.user_code}" class="btn btn-danger inactiveId"\
                             data-id=${row.id}>Inactive</button>`
                        }
                        var deleteBtn = `<button type="button" data-id="${row.user_code}"\
                        data-group="${row.group_name}" class="btn btn-danger deleteBtn"\
                         data-id=${row.id}><i class="mdi mdi-delete-forever"></i></button>`
        
                         array.push({
                            'user_code' : row.user_code,
                            'group_name' : row.group_name,
                            'action': action,
                            'status': status_id,
                            'delete': deleteBtn
                            });      
                });
                return res.json(array)
            } catch (err) {
                return res.json(err)
            }
        }else {
            res.redirect("/dashboard")
        }

       
    })
});

usergroupsRouter.post("/api/usergroups/add", (req, res) => {

    const sql = "INSERT INTO tbl_usergroup (`group_name`) VALUES (?)"
    const values = [
        req.body.usergroup,
    ]
    db.query(sql, [values], (err, data) => {
        try {
            res.json(data)
        } catch (err) {
            res.json(err)
        }
    })

})

usergroupsRouter.put("/api/usergroups/update/:user_code", (req, res) => {
    const user_code = req.params.user_code
    const sql = "UPDATE tbl_usergroup SET `group_name` = ? WHERE user_code = ?"
    const values = [
        req.body.group_name
    ]
    db.query(sql, [...values, user_code], (err, data) => {
        try {
            res.json(data)
        } catch (err) {
            res.json(err)
        }
    })
})



usergroupsRouter.post('/api/usergroups/active/:user_code', (req, res) => {
    var user_code = req.params.user_code
        const sql = `UPDATE tbl_usergroup SET status = '0' WHERE user_code = ${user_code}`
        db.query(sql, (err, data) => {
            try {
                res.json(data)
            } catch (err) {
                res.json(err)
            }
        })
})

usergroupsRouter.post('/api/usergroups/inactive/:user_code', (req, res) => {
    var user_code = req.params.user_code
        const sql = `UPDATE tbl_usergroup SET status = '1' WHERE user_code = ${user_code}`
        db.query(sql, (err, data) => {
            try {
                res.json(data)
            } catch (err) {
                res.json(err)
            }
        })
})


usergroupsRouter.delete("/api/usergroups/delete/:user_code", (req, res) => {
    const user_code = req.params.user_code
    const sql = `DELETE FROM tbl_usergroup WHERE user_code = '${user_code}'`
    db.query(sql, (err, results) => {
        try {
            res.json(results)
        } catch (err) {
            console.error(err)
        }
    })
})



module.exports = usergroupsRouter