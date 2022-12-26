// IMPORTS
const express = require("express")
const districtsRouter = express.Router()
const db = require("../database/connection")


districtsRouter.get("/districts", (req, res) => {
    res.render("districts")
})

// FETCH API USERS
districtsRouter.get('/api/districts/read', (req, res, next) => {
    const sql = `SELECT * FROM tbl_district_list`
    db.query(sql , (err, data) => {
        try {
            const array = [];
            data.forEach((row) => {
                const action = `<button class="btn btn-warning btnView"\
                data-id='${row.district_code}' data-location='${row.district_location}'\
                data-name='${row.district_manager}' data-bs-toggle="modal" data-bs-target="#EditBackdrop">\
                 <i class="mdi mdi-table-edit"></i></button>`
                    if(row.status == 1){
                        var status_id = `<button type="button" data-location="${row.district_location}" data-id="${row.district_code}" class="btn btn-success activeId"\
                         data-id=${row.district_code}>Active</button>`
                    }else {
                        var status_id = `<button type="button" data-location="${row.district_location}" data-id="${row.district_code}" class="btn btn-danger inactiveId"\
                         data-id=${row.district_code}>Inactive</button>`
                    }
                    var deleteBtn = `<button type="button" data-id="${row.district_code}"\
                    data-location="${row.district_location}" class="btn btn-danger deleteBtn"\
                     data-id=${row.id}><i class="mdi mdi-delete-forever"></i></button>`
    
                     array.push({
                        'district_code' : row.district_code,
                        'district_location' : row.district_location,
                        'district_manager' : row.district_manager,
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

districtsRouter.post("/api/districts/add", (req, res) => {

    const sql = "INSERT INTO tbl_district_list (`district_location`, `district_manager`) VALUES (?)"
    const values = [
        req.body.district_location,
        req.body.district_manager,
    ]
    db.query(sql, [values], (err, data) => {
        try {
            res.json(data)
        } catch (err) {
            res.json(err)
        }
    })
})



districtsRouter.put("/api/districts/update/:district_code", (req, res) => {
    const district_code = req.params.district_code
    const sql = "UPDATE tbl_district_list SET `district_location` = ?, `district_manager` = ?\
     WHERE district_code = ?"
    const values = [
        req.body.district_location,
        req.body.district_manager
    ]
    db.query(sql, [...values, district_code], (err, data) => {
        try {
            res.json(data)
        } catch (err) {
            res.json(err)
        }
    })
})



districtsRouter.post('/api/districts/active/:district_code', (req, res) => {
    var district_code = req.params.district_code
        const sql = `UPDATE tbl_district_list SET status = '0' WHERE district_code = ${district_code}`
        db.query(sql, (err, data) => {
            try {
                res.json(data)
            } catch (err) {
                res.json(err)
            }
        })
})

districtsRouter.post('/api/districts/inactive/:district_code', (req, res) => {
    var district_code = req.params.district_code
        const sql = `UPDATE tbl_district_list SET status = '1' WHERE district_code = ${district_code}`
        db.query(sql, (err, data) => {
            try {
                res.json(data)
            } catch (err) {
                res.json(err)
            }
        })
})


districtsRouter.delete("/api/districts/delete/:district_code", (req, res) => {
    const district_code = req.params.district_code
    const sql = `DELETE FROM tbl_district_list WHERE district_code = '${district_code}'`
    db.query(sql, (err, results) => {
        try {
            res.json(results)
        } catch (err) {
            console.error(err)
        }
    })
})



module.exports = districtsRouter