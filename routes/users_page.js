// IMPORTS
const express = require("express")
const usersRouter = express.Router()
const db = require("../database/connection")

// PAGES
usersRouter.get("/users", (req, res) => {

    if(req.session.user_code == 1){
        res.render('users');
    }else {
        res.redirect("/dashboard")
    }
})


usersRouter.get("/users/ho", (req, res) => {
    const sql = `SELECT * FROM tbl_usergroup WHERE status = 1 AND NOT user_code IN ('1', '2', '3', '4', '5')`
    db.query(sql, (err, data) => {
        if (err) throw err;

        if(req.session.user_code == 1){
            res.json(data)
        }else {
            res.redirect("/dashboard")
        }
      });
})


usersRouter.get("/users/dm", (req, res) => {
    const sql = `SELECT * FROM tbl_district_list WHERE status = '1' `
    db.query(sql, (err, data) => {
        if (err) throw err;

        if(req.session.user_code == 1){
            res.json(data)
        }else {
            res.redirect("/dashboard")
        }
      });
})

usersRouter.get("/users/as", (req, res) => {
    const sql = `SELECT * FROM tbl_area_list WHERE status = '1' `
    db.query(sql, (err, data) => {
        if (err) throw err;

        if(req.session.user_code == 1){
            res.json(data)
        }else {
            res.redirect("/dashboard")
        }
      });   
})

usersRouter.get("/users/bh", (req, res) => {
    const sql = `SELECT * FROM tbl_branch_list WHERE status = '1' `
    db.query(sql, (err, data) => {
        if (err) throw err;

        if(req.session.user_code == 1){
            res.json(data)
        }else {
            res.redirect("/dashboard")
        }
      });
})


usersRouter.get("/users/dm/:district_code", (req, res) => {
    const district_code = req.params.district_code
    const sql = `SELECT * FROM tbl_district_list WHERE district_code = ${district_code} `
    db.query(sql, (err, data) => {
        if (err) throw err;

        if(req.session.user_code == 1){
            res.json(data)
        }else {
            res.redirect("/dashboard")
        }
      });
})



usersRouter.get("/users/as/:area_code", (req, res) => {
    const area_code = req.params.area_code
    const sql = `SELECT * FROM tbl_area_list WHERE area_code = ${area_code} `
    db.query(sql, (err, data) => {
        if (err) throw err;

        if(req.session.user_code == 1){
            res.json(data)
        }else {
            res.redirect("/dashboard")
        }
      });
})



usersRouter.get("/users/bh/:branch_code", (req, res) => {
    const branch_code = req.params.branch_code
    const sql = `SELECT * FROM tbl_branch_list WHERE branch_code = ${branch_code} `
    db.query(sql, (err, data) => {
        if (err) throw err;

        if(req.session.user_code == 1){
            res.json(data)
        }else {
            res.redirect("/dashboard")
        }
      });
})


usersRouter.get("/users/groups/:user_code", (req, res) => {
    const user_code = req.params.user_code
    const sql = `SELECT * FROM tbl_usergroup WHERE user_code = '${user_code}'`
    db.query(sql, (err, data) => {
        if (err) throw err;
        if(req.session.user_code == 1){
            res.json(data)
        }else {
            res.redirect("/dashboard")
        }
      });
})



usersRouter.get("/users/groups", (req, res) => {
    const sql = `SELECT * FROM tbl_usergroup WHERE NOT user_code = '1' AND status = '1' `
    db.query(sql, (err, data) => {
        if (err) throw err;
        if(req.session.user_code == 1){
            res.render("users", { group: data })
        }else {
            res.redirect("/dashboard")
        }
      });
})




// FETCH API USERS
usersRouter.get('/api/users/read', (req, res, next) => {
    const sql = `SELECT t1.id, t1.full_name, t1.username,
    t1.password, t1.email, t1.status, t1.user_code,
     t1.branch_code, t1.area_code, t1.district_code,
      t2.group_name, t3.district_location, t4.area_location, t5.branch_location FROM users
       t1 LEFT JOIN tbl_usergroup t2 ON t1.user_code
        = t2.user_code LEFT JOIN tbl_district_list t3
         ON t1.district_code = t3.district_code LEFT JOIN tbl_area_list
          t4 ON t1.area_code = t4.area_code LEFT JOIN tbl_branch_list t5
          	ON t1.branch_code = t5.branch_code WHERE
          	t2.status = '1' ORDER BY t1.id DESC`
        db.query(sql , (err, data) => {

            if(req.session.user_code == 1){
                try {
                    const array = [];
                    data.forEach((row) => {
                            if(row.status == 1){
                                var status_id = `<button type="submit" class="btn btn-success activeId"\
                                 data-id=${row.id}>Active</button>`
                            }else {
                                var status_id = `<button type="button" class="btn btn-danger inactiveId"\
                                 data-id=${row.id}>Inactive</button>`
                            }
                            var deleteBtn = `<button type="button" class="btn btn-danger deleteBtn"\
                             data-id=${row.id}>\
                            <i class="mdi mdi-delete-forever"></i></button>`
                
                            if(row.branch_location == '' || row.branch_location == 0 || row.branch_location == null){
                                bh_display = 'Not Available'
                            }else {
                                bh_display = row.branch_location
                            }
        
                            if(row.area_location == '' || row.area_location == 0 || row.area_location == null){
                                as_display = 'Not Available'
                            }else {
                                as_display = row.area_location
                            }
        
                            if(row.district_location == '' || row.district_location == 0 || row.district_location == null   ){
                                dm_display = 'Not Available'
                            }else {
                                dm_display = row.district_location
                            }

                            if(row.branch_code && row.area_code && row.district_code){
                                var btnView = 'Branch'
                            }else if(row.area_code && row.district_code){
                                var btnView = 'Area'
                            }else if(row.district_code){
                                var btnView = 'District'
                            }else if(row.user_code == 1){
                                var btnView = 'Admin'
                            }
                            else {
                                var btnView = `<button type="button" data-id="${row.user_code}" class="btn btn-warning btn_HO btnHO"\
                                 data-bs-toggle="modal" data-bs-target="#hoBackdrop">\
                                <i class="mdi mdi-table-edit"></i></button>`
                            }


                        // const action = `<button class="btn btn-warning btnView btnDM btnAS btnGroup btnBH btn_DM btn_AS btn_BH"\
                        //  data-fullname='${row.full_name}' data-user='${row.username}'\
                        //   data-pass='${row.password}'\
                        //  data-email='${row.email}' data-id='${row.id}'\
                        //   data-group='${row.user_code}' data-dm='${row.district_code}' data-as='${row.area_code}'\
                        //   data-bh='${row.branch_code}' data-bs-toggle="modal"\
                        //    data-bs-target="#EditBackdrop">\
                        //  <i class="mdi mdi-table-edit"></i></button>`


                            array.push({
                                'id' : row.id,
                                'full_name' : row.full_name,
                                'username' : row.username,
                                'password' : row.password,
                                'email' : row.email,
                                'user_code': row.group_name,
                                'branch_code': bh_display,
                                'area_code': as_display,
                                'district_code': dm_display,
                                'action': btnView,
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



usersRouter.post('/api/users/active/:id', (req, res) => {
    var user_id = req.params.id
        const sql = `UPDATE users SET status = '0' WHERE id = ${user_id}`
        db.query(sql, (err, data) => {
            try {
                res.json(data)
            } catch (err) {
                res.json(err)
            }
        })
})

// STATUS INACTIVE
usersRouter.post('/api/users/inactive/:id', (req, res) => {
    var user_id = req.params.id

        const sql = `UPDATE users SET status = '1' WHERE id = ${user_id}`
        db.query(sql, (err, data) => {
            try {
                res.json(data)
            } catch (err) {
                res.json(err)
            }
        })
})

usersRouter.post("/api/users/add", (req, res) => {
    const sql = "INSERT INTO users (`full_name`, `username`, `password`, `email`, `user_code`) VALUES (?)"
    const values = [
        req.body.full_name,
        req.body.username,
        req.body.password,
        req.body.email,
        req.body.user_code
    ]
    db.query(sql, [values], (err, data) => {
        try {
            res.json(data)
        } catch (err) {
            res.json(err)
        }
    })
})

usersRouter.put("/api/users/update/:id", (req, res) => {
    const id = req.params.id
    const sql = "UPDATE users SET `full_name` = ? , `username`\
     = ? , `password` = ?, `email` = ?, user_code = ? WHERE id = ?"
    const values = [
        req.body.full_name,
        req.body.username,
        req.body.password,
        req.body.email,
        req.body.user_code
    ]
    db.query(sql, [...values, id], (err, data) => {
        try {
            res.json(data)
        } catch (err) {
            res.json(err)
        }
    })
})


usersRouter.delete("/api/users/delete/:id", (req, res) => {
    const id = req.params.id
    const sql = `DELETE FROM users WHERE id = '${id}'`
    db.query(sql, (err, results) => {
        try {
            res.json(results)
        } catch (err) {
            console.error(err)
        }
    })
})



// INSERT DM
usersRouter.post("/api/users/dm", (req, res) => {
    const sql = "INSERT INTO users (`full_name`, `username`, `password`,\
     `email`, `user_code`, `branch_code`, `area_code`, `district_code`) VALUES (?)"
    const values = [
        req.body.full_name,
        req.body.username,
        req.body.password,
        req.body.email,
        "3", // user code
        "0", // branch code
        "0", // area code
        req.body.dm_code
    ]
    db.query(sql, [values], (err, data) => {
        try {
            res.json(data)
        } catch (err) {
            res.json(err)
        }
    })
})




// INSERT AS
usersRouter.post("/api/users/as", (req, res) => {
    const sql = "INSERT INTO users (`full_name`, `username`, `password`,\
     `email`, `user_code`, `branch_code`, `area_code`, `district_code`) VALUES (?)"
    const values = [
        req.body.full_name,
        req.body.username,
        req.body.password,
        req.body.email,
        "4", // user code
        "0", // branch code
        req.body.as_code,
        req.body.dm_code
    ]
    db.query(sql, [values], (err, data) => {
        try {
            res.json(data)
        } catch (err) {
            res.json(err)
        }
    })
})




// INSERT BH
usersRouter.post("/api/users/bh", (req, res) => {
    const sql = "INSERT INTO users (`full_name`, `username`, `password`,\
     `email`, `user_code`, `branch_code`, `area_code`, `district_code`) VALUES (?)"
    const values = [
        req.body.full_name,
        req.body.username,
        req.body.password,
        req.body.email,
        "5", // user code
        req.body.bh_code,
        req.body.as_code,
        req.body.dm_code
    ]
    db.query(sql, [values], (err, data) => {
        try {
            res.json(data)
        } catch (err) {
            res.json(err)
        }
    })
})



module.exports = usersRouter