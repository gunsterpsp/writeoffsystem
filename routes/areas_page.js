// IMPORTS
const express = require("express")
const areasRouter = express.Router()
const db = require("../database/connection")


areasRouter.get("/areas", (req, res) => {
    res.render("areas")
})

// FETCH API USERS
areasRouter.get('/api/areas/read', (req, res, next) => {
    const sql = `SELECT * FROM tbl_area_list`
    db.query(sql , (err, data) => {
        try {
            const array = [];
            data.forEach((row) => {
                const action = `<button class="btn btn-warning btnView"\
                data-id='${row.area_code}' data-location='${row.area_location}'\
                data-name='${row.area_supervisor}' data-bs-toggle="modal" data-bs-target="#EditBackdrop">\
                 <i class="mdi mdi-table-edit"></i></button>`
                    if(row.status == 1){
                        var status_id = `<button type="button" data-id="${row.area_code}" class="btn btn-success activeId"\
                         data-id=${row.area_code}>Active</button>`
                    }else {
                        var status_id = `<button type="button" data-id="${row.area_code}" class="btn btn-danger inactiveId"\
                         data-id=${row.area_code}>Inactive</button>`
                    }
                    var deleteBtn = `<button type="button" data-id="${row.area_code}"\
                    class="btn btn-danger deleteBtn"\
                     data-id=${row.id}><i class="mdi mdi-delete-forever"></i></button>`
    
                     array.push({
                        'area_code' : row.area_code,
                        'area_location' : row.area_location,
                        'area_supervisor' : row.area_supervisor,
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

areasRouter.post("/api/areas/add", (req, res) => {

    const sql = "INSERT INTO tbl_area_list (`area_location`, `area_supervisor`) VALUES (?)"
    const values = [
        req.body.area_location,
        req.body.area_supervisor,
    ]
    db.query(sql, [values], (err, data) => {
        try {
            res.json(data)
        } catch (err) {
            res.json(err)
        }
    })
})



areasRouter.put("/api/areas/update/:area_code", (req, res) => {
    const area_code = req.params.area_code
    const sql = "UPDATE tbl_area_list SET `area_location` = ?, `area_supervisor` = ?\
     WHERE area_code = ?"
    const values = [
        req.body.area_location,
        req.body.area_supervisor
    ]
    db.query(sql, [...values, area_code], (err, data) => {
        try {
            res.json(data)
        } catch (err) {
            res.json(err)
        }
    })
})



areasRouter.post('/api/areas/active/:area_code', (req, res) => {
    var area_code = req.params.area_code
        const sql = `UPDATE tbl_area_list SET status = '0' WHERE area_code = ${area_code}`
        db.query(sql, (err, data) => {
            try {
                res.json(data)
            } catch (err) {
                res.json(err)
            }
        })
})

areasRouter.post('/api/areas/inactive/:area_code', (req, res) => {
    var area_code = req.params.area_code
        const sql = `UPDATE tbl_area_list SET status = '1' WHERE area_code = ${area_code}`
        db.query(sql, (err, data) => {
            try {
                res.json(data)
            } catch (err) {
                res.json(err)
            }
        })
})


areasRouter.delete("/api/areas/delete/:area_code", (req, res) => {
    const area_code = req.params.area_code
    const sql = `DELETE FROM tbl_area_list WHERE area_code = '${area_code}'`
    db.query(sql, (err, results) => {
        try {
            res.json(results)
        } catch (err) {
            console.error(err)
        }
    })
})



module.exports = areasRouter