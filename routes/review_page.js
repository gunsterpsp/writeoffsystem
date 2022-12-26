// IMPORTS
const express = require("express")
const reviewRouter = express.Router()
const db = require("../database/connection")


reviewRouter.get("/review", (req, res) => {
    res.render("review")
})

// FETCH API USERS
// reviewRouter.get('/api/review/read', (req, res, next) => {
//     const sql = `SELECT * FROM tbl_request_folder`
//     db.query(sql , (err, data) => {
//         try {
//             const array = [];
//             data.forEach((row) => {
//                      array.push({
//                         'view_info' : 'data',
//                         'req_no' : '',
//                         'approver_status' : '',
//                         'status': '',
//                         'cancel_request': '',
//                         'date_requested': ''
//                         });      
//             });
//             return res.json(array)
//         } catch (err) {
//             return res.json(err)
//         }
//     })
// });



// FETCH API USERS
reviewRouter.get('/api/review/read', (req, res, next) => {

        const sql = `SELECT *,
        (
            SELECT SUM(percentage) FROM tbl_request_folder p1 WHERE p1.request_id = t1.request_id
        ) as 'percentage',
        (
            SELECT SUM(final_percentage) FROM tbl_request_folder f1 WHERE f1.request_id = t1.request_id
        ) as 'final_percentage' FROM tbl_request_folder t1 WHERE branch_requested = '${req.session.branch_code}' AND request_status = 'Reviewed' GROUP BY request_id`
            db.query(sql , (err, data) => {
    
                    try {
                        const array = [];
                        data.forEach((row) => {
    

                            var approver_status = `<button \
                            class="btn btn-gradient-primary btnView" data-id='${row.request_id}' data-bs-toggle="modal" data-bs-target="#approverBackdrop"
                            >View</button>`
    
    
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

module.exports = reviewRouter