// IMPORTS
const express = require("express")
const requestRouter = express.Router()
const db = require("../database/connection")


requestRouter.get("/request", (req, res) => {
    res.render("request")
})


requestRouter.get("/api/request/transaction/:request_id", (req, res) => {
    const request_id = req.params.request_id
    const sql = `SELECT t1.review_by,t1.approval_date,t1.approver_remarks,t2.group_name FROM tbl_request_folder t1 \
    LEFT JOIN tbl_usergroup t2 ON t1.approver_code = t2.user_code WHERE t1.request_id = '${request_id}'`
    db.query(sql, (err, data) => {
        try {
            res.json(data)
        } catch (err) {
            console.log(err)
        }
    })
})



requestRouter.get('/api/request/read', (req, res, next) => {
    const sql = `SELECT *,
    (
        SELECT SUM(percentage) FROM tbl_request_folder p1 WHERE p1.request_id = t1.request_id
    ) as 'percentage',
    (
        SELECT SUM(final_percentage) FROM tbl_request_folder f1 WHERE f1.request_id = t1.request_id
    ) as 'final_percentage' FROM tbl_request_folder t1 WHERE NOT status = '0' AND request_status = 'Pending' GROUP BY request_id`
        db.query(sql , (err, data) => {

                try {
                    const array = [];
                    data.forEach((row) => {

                        var approver_status = `<button \
                        class="btn btn-gradient-primary btnView" data-id='${row.request_id}'><i class="mdi mdi-eye"></i></button>`
                        
                        var cancel = `<button class="btn btn-gradient-danger btnCancel" data-request="${row.request_id}"><i class="mdi mdi-delete-sweep"></i></button>`

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
                        
                        array.push({
                                'request_id' : row.request_id,
                                'approver_status' : approver_status,
                                'status' : progress,
                                'cancel_request' : cancel,
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
                    });
                    return res.json({"data": array})
                } catch (err) {
                    return res.json(err)
                }
    })
});





requestRouter.put("/api/request/cancel/:request_id", (req, res) => {

    const sql = `UPDATE tbl_request_folder SET status = '0', request_status = 'Cancelled' WHERE request_id = '${req.params.request_id}'`
    db.query(sql, (err, data) => {
        try {
            res.json(data)
        } catch (error) {
            res.json(err)
        }
    })

})


requestRouter.post("/api/request/add", (req, res) => {


        const sqlApprover = `SELECT * FROM tbl_receiver_list`
        db.query(sqlApprover, (err, data) => {

            data.forEach((row) => {

                const sql = "INSERT INTO tbl_request_folder (`request_id`, `user_id`, `full_name`, `approver_code`, \
                `position`, `district_code`, `area_code`, `branch_requested`, `date_requested`, `client_name`, \
                `dsb_no`, `age`, `pension_type`, `loan_term`, `outstanding_balance`, \
                `last_payment_date`, `sss_no`, `account_type`, `nco_borrower`, `bank_name`, \
                `dec_borrower_1`, `dec_borrower_2`, `other_than_dec`, `other_than_dec_1`, `other_than_dec_2`, \
                `other_than_dec_3`, `other_than_dec_4`, `other_than_dec_5`, `co_borrower_1`, `co_borrower_2`, \
                `co_borrower_3`, `co_borrower_4`, `secondary_option_1`, `secondary_option_2`, `secondary_option_3`, \
                `secondary_option_4`, `branch_remarks`) VALUES (?) ORDER BY position ASC"
                const values = [
                    req.body.request_id,
                    req.session.user_id,
                    req.session.full_name,
                    row.approver_code,
                    row.position,
                    req.session.district_code,
                    req.session.area_code,
                    req.session.branch_code,
                    req.body.date_requested,
                    req.body.client_name,
                    req.body.dsb_no,
                    req.body.age,
                    req.body.pension_type,
                    req.body.loan_term,
                    req.body.outstanding_balance,
                    req.body.last_payment_date,
                    req.body.sss_no,
                    req.body.account_type,
                    req.body.nco_borrower,
                    req.body.bank_name,
                    req.body.dec_borrower_1,
                    req.body.dec_borrower_2,
                    req.body.other_than_dec,
                    req.body.other_than_dec_1,
                    req.body.other_than_dec_2,
                    req.body.other_than_dec_3,
                    req.body.other_than_dec_4,
                    req.body.other_than_dec_5,
                    req.body.cb_1,
                    req.body.cb_2,
                    req.body.cb_3,
                    req.body.cb_4,
                    req.body.so_1,
                    req.body.so_2,
                    req.body.so_3,
                    req.body.so_4,
                    req.body.branch_remarks,
                ]
    
                    db.query(sql, [values], (err, data) => {
                            try {
                                res.json(data)
                                console.log(data)
                            } catch (err) {
                                console.log(err)
                            }
                    })

            })

        })
})


// requestRouter.post("/api/request/add", (req, res) => {

//         const sqlApprover = `SELECT * FROM tbl_receiver_list`
//         db.query(sqlApprover, (err, data) => {

//             data.forEach((row) => {
//                 const sql = "INSERT INTO tbl_request_folder (`request_id`, `user_id`, `full_name`, \
//                 `approver_code`, `position`, `district_code`, `area_code`, `branch_requested`, \
//                 `date_requested`, `client_name`, `dsb_no`, `age`, `pension_type`, `loan_term`, \
//                 `outstanding_balance`, `last_payment_date`, `sss_no`, `account_type`, `nco_borrower`, \
//                 `bank_name` VALUES (?) ORDER BY position ASC"
//                 const values = [
                    // req.body.request_id,
                    // req.session.user_id,
                    // req.session.full_name,
                    // row.approver_code,
                    // row.position,
                    // req.session.district_code,
                    // req.session.area_code,
                    // req.session.branch_code,
                    // req.body.date_requested,
                    // req.body.client_name,
                    // req.body.dsb_no,
                    // req.body.age,
                    // req.body.pension_type,
                    // req.body.loan_term,
                    // req.body.outstanding_balance,
                    // req.body.last_payment_date,
                    // req.body.sss_no,
                    // req.body.account_type,
                    // req.body.nco_borrower,
                    // req.body.bank_name,
//                     // req.body.dec_borrower_1,
//                     // req.body.dec_borrower_2,
//                     // req.body.other_than_dec,
//                     // req.body.other_than_dec_1,
//                     // req.body.other_than_dec_2,
//                     // req.body.other_than_dec_3,
//                     // req.body.other_than_dec_4,
//                     // req.body.other_than_dec_5,
//                     // req.body.co_borrower_1,
//                     // req.body.co_borrower_2,
//                     // req.body.co_borrower_3,
//                     // req.body.co_borrower_4,
//                     // req.body.second_option_1,
//                     // req.body.second_option_2,
//                     // req.body.second_option_3,
//                     // req.body.second_option_4,
//                     // req.body.branch_remarks
//                 ]
//                     db.query(sql, [values], (err, data) => {
//                         try {
//                             res.json("added")
//                         } catch (err) {
//                             console.log(err)
//                         }
//                     })
//             })
//         })
// })

module.exports = requestRouter