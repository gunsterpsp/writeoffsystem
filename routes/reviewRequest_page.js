// IMPORTS
const express = require("express")
const reviewRequestRouter = express.Router()
const db = require("../database/connection")



reviewRequestRouter.get("/review_request", (req, res) => {
    res.render("review_request")
})


reviewRequestRouter.get("/review_request/approve/:id", (req, res) => {
    
    const request_id = req.params.link_id

    link_id = []

    const arr1 = link_id.push(request_id)

    const sql = `SELECT * FROM tbl_request_folder WHERE id = '${arr1}'`
    db.query(sql, (err, data) => {
        try {
            res.json(data)
        } catch (error) {
            console.log(err)
        }
    })
})

// FETCH API USERS
reviewRequestRouter.get('/review_request/read', (req, res, next) => {
    const sql = `SELECT *,
    (
        SELECT SUM(percentage) FROM tbl_request_folder p1 WHERE p1.request_id = t1.request_id
    ) as 'percentage',
    (
        SELECT SUM(final_percentage) FROM tbl_request_folder f1 WHERE f1.request_id = t1.request_id
    ) as 'final_percentage', 
    (
        SELECT COUNT(request_id) FROM tbl_write_sequence s1 WHERE s1.request_id = t1.request_id
    ) as 'count' FROM tbl_request_folder t1 WHERE status = '1' AND approver_code = '${req.session.user_code}' GROUP BY request_id`
        db.query(sql , (err, data) => {

                try {
                    const array = [];
                    data.forEach((row) => {

                        const currentCount = row.position
                        const currentSequence = row.count + 1

                        if(row.status != 2){

                            if(currentCount == currentSequence){
                                if(row.approver_code == req.session.user_code){
                                //     var action = `<input type="checkbox" name="updateFolder[]" \
                                //             class="check_value" data-id='${row.id}'>
                                //   </div>`
                                var action = `<button \
                                class="btn btn-gradient-success btnApprove" \
                                data-request='${row.request_id}' data-position='${row.position}' \
                                data-id='${row.id}' data-bs-target="#approvedModal"  data-bs-toggle="modal">Approve</button>`
                                
                                var reject = `<buttton class="btn btn-gradient-dark btnReject" data-id="${row.id}" data-bs-target="#rejectBackDrop" data-bs-toggle="modal">Reject</buttton>`

                                }

                            }else {
                                var reject = 'Current approver has rejected'
                                var action = 'Pending to other approver';
                            }

                        }else {
                            var action = '';
                            var reject = ''
                        }

                        var approver_status = `<button \
                        class="btn btn-gradient-primary btnView" data-id='${row.request_id}'><i class="mdi mdi-eye"></i></button>`
                        

                        const percentage = row.percentage;
                        const final_percentage = row.final_percentage;
                        var decimals = percentage / final_percentage * 100

                        var progress_bar = Math.trunc(decimals)

                        if(progress_bar == 14){
                            var progress = '<div class="bg-gradient-danger" style="border-radius: .3em;">\
                            <div class="bg-gradient-info text-center text-light" style="width:14%; border-radius: .3em; font-size: 14px;">'+progress_bar+'%</div></div>'    
                        }else if(progress_bar == 28){
                            var progress = '<div class="bg-gradient-danger" style="border-radius: .3em;">\
                            <div class="bg-gradient-info text-center text-light" style="width:28%; border-radius: .3em; font-size: 14px;">'+progress_bar+'%</div></div>'
                        }
                        else if(progress_bar == 42){
                            var progress = '<div class="bg-gradient-danger" style="border-radius: .3em;">\
                            <div class="bg-gradient-info text-center text-light" style="width:42%; border-radius: .3em; font-size: 14px;">'+progress_bar+'%</div></div>'
                        }
                        else if(progress_bar == 57){
                            var progress = '<div class="bg-gradient-danger" style="border-radius: .3em;">\
                            <div class="bg-gradient-info text-center text-light" style="width:56%; border-radius: .3em; font-size: 14px;">'+progress_bar+'%</div></div>'
                        }
                        else if(progress_bar == 71){
                            var progress = '<div class="bg-gradient-danger" style="border-radius: .3em;">\
                            <div class="bg-gradient-info text-center text-light" style="width:70%; border-radius: .3em; font-size: 14px;">'+progress_bar+'%</div></div>'
                        }
                        else if(progress_bar == 85){
                            var progress = '<div class="bg-gradient-danger" style="border-radius: .3em;">\
                            <div class="bg-gradient-info text-center text-light" style="width:84%; border-radius: .3em; font-size: 14px;">'+progress_bar+'%</div></div>'
                        }
                        else if(progress_bar == 100){
                            var progress = '<div class="bg-gradient-danger" style="border-radius: .3em;">\
                            <div class="bg-gradient-info text-center text-light" style="width:100%; border-radius: .3em; font-size: 14px;">'+progress_bar+'%</div></div>'
                        }
                        else {
                            var progress = '<div class="bg-gradient-danger" style="border-radius: .3em;">\
                            <div class="bg-gradient-info text-center text-light" style="width:0%; border-radius: .3em; font-size: 14px;">'+progress_bar+'%</div></div>'
                        }


                        if(req.session.user_code == 4 && row.area_code == req.session.area_code){

                            array.push({

                                'request_id' : row.request_id,
                                'full_name' : row.full_name,
                                'branch_location' : row.branch_requested,
                                'approve' : action,
                                'approver_status' : approver_status,
                                'reject': reject,
                                'status' : progress,
                                'cancel_request' : '',
                                'date_requested' : row.date_requested,
                                'client_name' : row.client_name,
                                'dsb_no' : row.dsb_no,
                                'age' : row.age,
                                'pension_type' : row.pension_type,
                                'loan_term' : row.loan_term,
                                'outstanding_balance' : row.outstanding_balance,
                                'last_payment_date' : row.last_payment_date,
                                'sss_no' : row.sss_no,
                                'account_type' : row.account_type,
                                'nco_borrower' : row.nco_borrower,
                                'bank_name' : row.bank_name,
                            });   

                        }else if(req.session.user_code == 3 && row.district_code == req.session.district_code){

                            array.push({

                                'request_id' : row.request_id,
                                'full_name' : row.full_name,
                                'branch_location' : row.branch_requested,
                                'approve' : action,
                                'approver_status' : approver_status,
                                'reject': reject,
                                'status' : progress,
                                'cancel_request' : '',
                                'date_requested' : row.date_requested,
                                'client_name' : row.client_name,
                                'dsb_no' : row.dsb_no,
                                'age' : row.age,
                                'pension_type' : row.pension_type,
                                'loan_term' : row.loan_term,
                                'outstanding_balance' : row.outstanding_balance,
                                'last_payment_date' : row.last_payment_date,
                                'sss_no' : row.sss_no,
                                'account_type' : row.account_type,
                                'nco_borrower' : row.nco_borrower,
                                'bank_name' : row.bank_name,
                            });   

                        }else {
                            if(req.session.user_code == 4 || req.session.user_code == 3){

                            }else {

                                array.push({

                                    'request_id' : row.request_id,
                                    'full_name' : row.full_name,
                                    'branch_location' : row.branch_requested,
                                    'approve' : action,
                                    'approver_status' : approver_status,
                                    'reject': reject,
                                    'status' : progress,
                                    'cancel_request' : '',
                                    'date_requested' : row.date_requested,
                                    'client_name' : row.client_name,
                                    'dsb_no' : row.dsb_no,
                                    'age' : row.age,
                                    'pension_type' : row.pension_type,
                                    'loan_term' : row.loan_term,
                                    'outstanding_balance' : row.outstanding_balance,
                                    'last_payment_date' : row.last_payment_date,
                                    'sss_no' : row.sss_no,
                                    'account_type' : row.account_type,
                                    'nco_borrower' : row.nco_borrower,
                                    'bank_name' : row.bank_name,
                                });   
                            }
                        }
                    });
                    return res.json({"data": array})
                } catch (err) {
                    return res.json(err)
                }
    })
});



reviewRequestRouter.put("/api/review_request/update/:id", (req, res) => {
    const id = req.params.id
    const remarks = req.body.remarks
    const dateToday = req.body.dateToday
    const request_no = req.body.request_no
    const sql = `UPDATE tbl_request_folder SET review_by = '${req.session.full_name}', \
    status = '2', percentage = '100', approver_remarks = '${remarks}', \
    approver_id = '${req.session.user_id}', approval_date = '${dateToday}' WHERE id = '${id}'`
    db.query(sql, (err, data) => {
        try {
            res.json(data)
        } catch (error) {
            res.json(error)
        }
    })
})

reviewRequestRouter.put("/api/review_request/update2/:id", (req, res) => {
    const request_no = req.body.request_no
    const position_id = req.body.position_id
    const session_usercode = req.session.user_code
    const sql = `UPDATE tbl_request_folder SET request_status = 'Reviewed' WHERE request_id = '${request_no}'`
    db.query(sql, (err, data) => {

        const sql = "INSERT INTO tbl_write_sequence (request_id, position, approver_code) VALUES (?)"
        const values = [
            request_no,
            position_id,
            session_usercode
        ]
        db.query(sql, [values], (err, data) => {
            const sql = `SELECT MAX(Cast(position AS Int)) AS 'last_position' FROM tbl_request_folder WHERE request_id = '${request_no}'`
            db.query(sql, (err, data) => {
                data.forEach((row) => {
                    if(row.last_position == position_id){
                        const sql = `UPDATE tbl_request_folder SET request_status = 'Completed', status = '3' WHERE request_id = '${request_no}'`
                        db.query(sql, (err, data) => {
                            try {
                                res.json(data)
                            } catch (error) {
                                res.json(err)
                            }
                        })
                    }
                })
            })
        })
    })
})


reviewRequestRouter.put("/api/review_request/reject/:id", (req, res) => {

    const id = req.params.id
    const remarks = req.body.remarks
    const sql = `UPDATE tbl_request_folder SET reject_remarks = '${remarks}', reject_id = '${req.session.user_id}', status = '4' WHERE id = '${id}'`
    db.query(sql, (err, data) => {

        try {
            res.json(data)
        } catch (error) {
            res.json(error)
        }
    })

})




module.exports = reviewRequestRouter