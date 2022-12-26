// IMPORTS
const express = require("express")
const dashboardRouter = express.Router()
const db = require("../database/connection")





dashboardRouter.get("/dashboard/users/count", (req, res) => {

    const sql = `SELECT * FROM users WHERE status = '1' `
    db.query(sql, (err, rows, fields) => {
      if (err) throw err;
        res.json(rows.length)
    });
})



dashboardRouter.get("/dashboard/my_request/:branch_code", (req, res) => {

  const sql = `SELECT * FROM tbl_request_folder WHERE branch_requested = '${req.session.branch_code}' AND request_status = 'Pending' GROUP BY request_id `
  db.query(sql, (err, rows, fields) => {
    if (err) throw err;
      res.json(rows.length)
  });
})



dashboardRouter.get("/dashboard/review/:branch_code", (req, res) => {

  const sql = `SELECT * FROM tbl_request_folder WHERE branch_requested = '${req.session.branch_code}' AND request_status = 'Reviewed' GROUP BY request_id `
  db.query(sql, (err, rows, fields) => {
    if (err) throw err;
      res.json(rows.length)
  });
})


dashboardRouter.get("/dashboard/completed/:branch_code", (req, res) => {

  const sql = `SELECT * FROM tbl_request_folder WHERE branch_requested = '${req.session.branch_code}' AND request_status = 'Completed' GROUP BY request_id `
  db.query(sql, (err, rows, fields) => {
    if (err) throw err;
      res.json(rows.length)
  });
})

dashboardRouter.get("/dashboard/area_supervisor/:area_code", (req, res) => {

  const sql = `SELECT * FROM tbl_request_folder WHERE area_code = '${req.session.area_code}' AND status = '1' GROUP BY request_id `
  db.query(sql, (err, rows, fields) => {
    if (err) throw err;
      res.json(rows.length)
  });
})

dashboardRouter.get("/dashboard/district_manager/:district_code", (req, res) => {

  const sql = `SELECT * FROM tbl_request_folder WHERE district_code = '${req.session.district_code}' AND status = '1' GROUP BY request_id `
  db.query(sql, (err, rows, fields) => {
    if (err) throw err;
      res.json(rows.length)
  });
})

dashboardRouter.get("/dashboard/head_office/:approver_code", (req, res) => {

  const sql = `SELECT * FROM tbl_request_folder WHERE approver_code = '${req.session.user_code}' AND status = '1' GROUP BY request_id `
  db.query(sql, (err, rows, fields) => {
    if (err) throw err;
      res.json(rows.length)
  });
})


dashboardRouter.get("/dashboard/my_approved/:approver_code", (req, res) => {

  const sql = `SELECT * FROM tbl_request_folder WHERE approver_code = '${req.session.user_code}' AND status = '2' GROUP BY request_id `
  db.query(sql, (err, rows, fields) => {
    if (err) throw err;
      res.json(rows.length)
  });
})


dashboardRouter.get("/dashboard/my_reject/:approver_code", (req, res) => {

  const sql = `SELECT * FROM tbl_request_folder WHERE approver_code = '${req.session.user_code}' AND status = '4' GROUP BY request_id `
  db.query(sql, (err, rows, fields) => {
    if (err) throw err;
      res.json(rows.length)
  });
})



dashboardRouter.get("/dashboard/branches/count", (req, res) => {

    const sql = `SELECT * FROM tbl_branch_list WHERE status = '1' `
    db.query(sql, (err, rows, fields) => {
      if (err) throw err;
        res.json(rows.length)
    });
})


dashboardRouter.get("/dashboard/areas/count", (req, res) => {

    const sql = `SELECT * FROM tbl_area_list WHERE status = '1' `
    db.query(sql, (err, rows, fields) => {
      if (err) throw err;
        res.json(rows.length)
    });
})

dashboardRouter.get("/dashboard/districts/count", (req, res) => {

    const sql = `SELECT * FROM tbl_district_list WHERE status = '1' `
    db.query(sql, (err, rows, fields) => {
      if (err) throw err;
        res.json(rows.length)
    });
})

dashboardRouter.get("/api/recent_request/transaction/:request_id", (req, res) => {
  const request_id = req.params.request_id
  const sql = `SELECT t1.review_by,t1.approval_date,t1.approver_remarks,t2.group_name,t1.position FROM tbl_request_folder t1 \
  LEFT JOIN tbl_usergroup t2 ON t1.approver_code = t2.user_code WHERE t1.request_id = '${request_id}'`
  db.query(sql, (err, data) => {
      try {
          res.json(data)
      } catch (err) {
          console.log(err)
      }
  })
})



dashboardRouter.get("/api/recent_request/read", (req, res) => {

  const sql = `SELECT *,
  (
      SELECT SUM(percentage) FROM tbl_request_folder p1 WHERE p1.request_id = t1.request_id
  ) as 'percentage',
  (
      SELECT SUM(final_percentage) FROM tbl_request_folder f1 WHERE f1.request_id = t1.request_id
  ) as 'final_percentage' FROM tbl_request_folder t1 WHERE NOT status = '0' AND NOT status = '3' GROUP BY request_id ORDER BY id DESC`
      db.query(sql , (err, data) => {

              try {
                  const array = [];
                  data.forEach((row) => {

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

})






module.exports = dashboardRouter;