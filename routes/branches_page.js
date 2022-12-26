// IMPORTS
const express = require("express")
const branchesRouter = express.Router()
const db = require("../database/connection")


branchesRouter.get("/branches", (req, res) => {
    res.render("branches")
})

// FETCH API USERS
branchesRouter.get('/api/branches/read', (req, res, next) => {
    const sql = `SELECT * FROM tbl_branch_list`
    db.query(sql , (err, data) => {
        try {
            const array = [];
            data.forEach((row) => {
                const action = `<button class="btn btn-warning btnView"\
                data-id='${row.branch_code}' data-location='${row.branch_location}'\
                data-name='${row.branch_head}' data-bs-toggle="modal" data-bs-target="#EditBackdrop">\
                 <i class="mdi mdi-table-edit"></i></button>`
                    if(row.status == 1){
                        var status_id = `<button type="button" data-location="${row.branch_location}" data-id="${row.branch_code}" class="btn btn-success activeId"\
                         data-id=${row.branch_code}>Active</button>`
                    }else {
                        var status_id = `<button type="button" data-location="${row.branch_location}" data-id="${row.branch_code}" class="btn btn-danger inactiveId"\
                         data-id=${row.branch_code}>Inactive</button>`
                    }
                    var deleteBtn = `<button type="button" data-id="${row.branch_code}"\
                    data-location="${row.branch_location}" class="btn btn-danger deleteBtn"\
                     data-id=${row.id}><i class="mdi mdi-delete-forever"></i></button>`
    
                     array.push({
                        'branch_code' : row.branch_code,
                        'branch_location' : row.branch_location,
                        'branch_head' : row.branch_head,
                        'action': action,
                        'status': status_id,
                        'delete': deleteBtn
                        });      
            });
            return res.json(array)
        } catch (err) {
            return res.json(err)
        }
    })
});

branchesRouter.post("/api/branches/add", (req, res) => {

    const sql = "INSERT INTO tbl_branch_list (`branch_location`, `branch_head`) VALUES (?)"
    const values = [
        req.body.branch_location,
        req.body.branch_head,
    ]
    db.query(sql, [values], (err, data) => {
        try {
            res.json(data)
        } catch (err) {
            res.json(err)
        }
    })
})



branchesRouter.put("/api/branches/update/:branch_code", (req, res) => {
    const branch_code = req.params.branch_code
    const sql = "UPDATE tbl_branch_list SET `branch_location` = ?, `branch_head` = ?\
     WHERE branch_code = ?"
    const values = [
        req.body.branch_location,
        req.body.branch_head
    ]
    db.query(sql, [...values, branch_code], (err, data) => {
        try {
            res.json(data)
        } catch (err) {
            res.json(err)
        }
    })
})



branchesRouter.post('/api/branches/active/:branch_code', (req, res) => {
    var branch_code = req.params.branch_code
        const sql = `UPDATE tbl_branch_list SET status = '0' WHERE branch_code = ${branch_code}`
        db.query(sql, (err, data) => {
            try {
                res.json(data)
            } catch (err) {
                res.json(err)
            }
        })
})

branchesRouter.post('/api/branches/inactive/:branch_code', (req, res) => {
    var branch_code = req.params.branch_code
        const sql = `UPDATE tbl_branch_list SET status = '1' WHERE branch_code = ${branch_code}`
        db.query(sql, (err, data) => {
            try {
                res.json(data)
            } catch (err) {
                res.json(err)
            }
        })
})


branchesRouter.delete("/api/branches/delete/:branch_code", (req, res) => {
    const branch_code = req.params.branch_code
    const sql = `DELETE FROM tbl_branch_list WHERE branch_code = '${branch_code}'`
    db.query(sql, (err, results) => {
        try {
            res.json(results)
        } catch (err) {
            console.error(err)
        }
    })
})



module.exports = branchesRouter