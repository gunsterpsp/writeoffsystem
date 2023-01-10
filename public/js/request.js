document.getElementById('submitId')
.addEventListener('click', async () => {

  const request_id = document.getElementById('request_id').value
  const date_requested = document.getElementById('date_requested').value
  const client_name = document.getElementById('client_name').value
  const dsb_no = document.getElementById('dsb_no').value
  const age = document.getElementById('age').value
  const pension_type = document.getElementById('pension_type').value
  const loan_term = document.getElementById('loan_term').value
  const outstanding_balance = document.getElementById('outstanding_balance').value
  const last_payment_date = document.getElementById('last_payment_date').value
  const sss_no = document.getElementById('sss_no').value
  const account_type = document.getElementById('account_type').value
  const nco_borrower = document.getElementById('nco_borrower').value
  const bank_name = document.getElementById('bank_name').value

  const dec_borrower_1 = $("#dec_borrower_1").is(":checked")
  const dec_borrower_2 = $("#dec_borrower_2").is(":checked")

  const other_than_dec = document.getElementById('other_than_dec').value
  const other_than_dec_1 = $("#other_than_dec_1").is(":checked")
  const other_than_dec_2 = $("#other_than_dec_2").is(":checked")
  const other_than_dec_3 = $("#other_than_dec_3").is(":checked")
  const other_than_dec_4 = $("#other_than_dec_4").is(":checked")
  const other_than_dec_5 = $("#other_than_dec_5").is(":checked")

  const cb_1 = $("#cb_1").is(":checked")
  const cb_2 = $("#cb_2").is(":checked")
  const cb_3 = $("#cb_3").is(":checked")
  const cb_4 = $("#cb_4").is(":checked")

  const so_1 = $("#so_1").is(":checked")
  const so_2 = $("#so_2").is(":checked")
  const so_3 = $("#so_3").is(":checked")
  const so_4 = $("#so_4").is(":checked")

  const branch_remarks = document.getElementById('branch_remarks').value

  const data = {
    request_id: request_id,
    date_requested: date_requested,
    client_name: client_name,
    dsb_no: dsb_no,
    age: age,
    pension_type: pension_type,
    loan_term: loan_term,
    outstanding_balance: outstanding_balance,
    last_payment_date: last_payment_date,
    sss_no: sss_no,
    account_type: account_type,
    nco_borrower: nco_borrower,
    bank_name: bank_name,
    dec_borrower_1: dec_borrower_1,
    dec_borrower_2: dec_borrower_2,
    other_than_dec: other_than_dec,
    other_than_dec_1: other_than_dec_1,
    other_than_dec_2: other_than_dec_2,
    other_than_dec_3: other_than_dec_3,
    other_than_dec_4: other_than_dec_4,
    other_than_dec_5: other_than_dec_5,
    cb_1: cb_1,
    cb_2: cb_2,
    cb_3: cb_3,
    cb_4: cb_4,
    so_1: so_1,
    so_2: so_2,
    so_3: so_3,
    so_4: so_4,
    branch_remarks: branch_remarks
  }

    await axios.post('/api/request/add', data)
    .then(res => {
      $('#example').DataTable().ajax.reload()
      $('#requestBackdrop').modal("hide")
      console.log(data)
      toastr.options = {
        "closeButton": true,
        "debug": false,
        "newestOnTop": false,
        "progressBar": true,
        "positionClass": "toast-top-center",
        "preventDuplicates": false,
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": "5000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
      }
      toastr.success('Your request id is '+request_id)
      document.getElementById('client_name').value = ''
      document.getElementById('dsb_no').value = ''
      document.getElementById('age').value = ''
      document.getElementById('pension_type').value = ''
      document.getElementById('loan_term').value = ''
      document.getElementById('outstanding_balance').value = ''
      document.getElementById('last_payment_date').value = ''
      document.getElementById('sss_no').value = ''
      document.getElementById('account_type').value = ''
      document.getElementById('nco_borrower').value = ''
      document.getElementById('bank_name').value = ''
      $('#dec_borrower_1').prop('checked', false)
      $('#dec_borrower_2').prop('checked', false)
      document.getElementById('other_than_dec').value = ''
      $('#other_than_dec_1').prop('checked', false)
      $('#other_than_dec_2').prop('checked', false)
      $('#other_than_dec_3').prop('checked', false)
      $('#other_than_dec_4').prop('checked', false)
      $('#other_than_dec_5').prop('checked', false)
      $('#co_borrow_1').prop('checked', false)
      $('#co_borrow_2').prop('checked', false)
      $('#co_borrow_3').prop('checked', false)
      $('#co_borrow_4').prop('checked', false)
      $('#secondary_option_1').prop('checked', false)
      $('#secondary_option_2').prop('checked', false)
      $('#secondary_option_3').prop('checked', false)
      $('#secondary_option_4').prop('checked', false)
      document.getElementById('branch_remarks').value = ''

    })
    .catch(err => console.error(err))
  

  

})






var month = new Date().toLocaleString('en-US', { month: 'long' })
var day = new Date().toLocaleString('en-US', { day: '2-digit' })
var year =  new Date().getFullYear()

document.getElementById("dateToday").value = month + ' ' + day + ', ' + year
document.getElementById("date_requested").value = month + ' ' + day + ', ' + year


var number = Math.floor(100000 + Math.random() * 900000)
document.getElementById("request_id").value = 'REQ'+number


$(document).ready(function () {
  var table = $('#example').DataTable({
      ajax: '/api/request/read',
      columns: [
          { data: 'request_id' },
          { data: 'approver_status' },
          { data: 'status' },
          { data: 'cancel_request' },
          { data: 'date_requested' },

      ],
      order: [[1, 'desc']],
  })
})







$(document).on("click", ".btnView", async function(e){
  e.preventDefault()
  $("#viewBackdrop").modal("show")
  const request_id = $(this).data("id")

  $("#requestNo").html(request_id)

  const div = $('#append_details')
  div.empty()
  div.append('<div id="append_details"></div>')
  const json = "/api/recent_request/transaction/"+request_id

  await $.get(json, (data) => {

    $.each(data, (key, i) => {

      if(i.dec_borrower_1 == 1){
        var dec_1 = '<input type="checkbox" checked disabled> SSS Verification'
      }else {
        var dec_1 = '<input type="checkbox" disabled> SSS Verification'
      }

      if(i.dec_borrower_2 == 1){
        var dec_2 = '<input type="checkbox" checked disabled> Death Certificate'
      }else {
        var dec_2 = '<input type="checkbox" disabled> Death Certificate'
      }

      if(i.other_than_dec_1 == 1){
        var other_dec_1 = '<input type="checkbox" checked disabled> SSS Verification'

      }else {
        var other_dec_1 = '<input type="checkbox" disabled> SSS Verification'
      }

      if(i.other_than_dec_2 == 1){
        var other_dec_2 = '<input type="checkbox" checked disabled> Collection Letter'
      }else {
        var other_dec_2 = '<input type="checkbox" disabled> Collection Letter'
      }

      if(i.other_than_dec_3 == 1){
        var other_dec_3 = '<input type="checkbox" checked disabled> Demand Letter'
      }else {
        var other_dec_3 = '<input type="checkbox" disabled> Demand Letter'
      }

      if(i.other_than_dec_4 == 1){
        var other_dec_4 = '<input type="checkbox" checked disabled> Barangay Complaint'
      }else {
        var other_dec_4 = '<input type="checkbox" disabled> Barangay Complaint'
      }

      if(i.other_than_dec_5 == 1){
        var other_dec_5 = '<input type="checkbox" checked disabled> Small Claims (20k above loan balance)'
      }else {
        var other_dec_5 = '<input type="checkbox" disabled> Small Claims (20k above loan balance)'
      }

      if(i.co_borrower_1 == 1){
        var co_borrow_1 = '<input type="checkbox" checked disabled> Collection Letter'
      }else {
        var co_borrow_1 = '<input type="checkbox" disabled> Collection Letter'
      }

      if(i.co_borrower_2 == 1){
        var co_borrow_2 = '<input type="checkbox" checked disabled> Demand Letter'
      }else {
        var co_borrow_2 = '<input type="checkbox" disabled> Demand Letter'
      }

      if(i.co_borrower_3 == 1){
        var co_borrow_3 = '<input type="checkbox" checked disabled> Barangay Complaint'
      }else {
        var co_borrow_3 = '<input type="checkbox" disabled> Barangay Complaint'
      }

      if(i.co_borrower_4 == 1){
        var co_borrow_4 = '<input type="checkbox" checked disabled> Small Claims (20k above loan balance)'
      }else {
        var co_borrow_4 = '<input type="checkbox" disabled> Small Claims (20k above loan balance)'
      }

      if(i.secondary_option_1 == 1){
        var second_op_1 = '<input type="checkbox" checked disabled> Death Certicate (Demise to Co-Borrower)'
      }else {
        var second_op_1 = '<input type="checkbox" disabled> Death Certicate (Demise to Co-Borrower)'
      }

      if(i.secondary_option_2 == 1){
        var second_op_2 = '<input type="checkbox" checked disabled> Certificate of Indigency or any proof of financial incapacity of borrower or co-borrower (if any)'
      }else {
        var second_op_2 = '<input type="checkbox" disabled> Certificate of Indigency or any proof of financial incapacity of borrower or co-borrower (if any)'
      }

      if(i.secondary_option_3 == 1){
        var second_op_3 = '<input type="checkbox" checked disabled> Certificate of Non-Residency or any proof of unlocation of borrower or co-borrower (if any)'
      }else {
        var second_op_3 = '<input type="checkbox" disabled> Certificate of Non-Residency or any proof of unlocation of borrower or co-borrower (if any)'
      }

      if(i.secondary_option_4 == 1){
        var second_op_4 = '<input type="checkbox" checked disabled> Any proof that barangay does not accept loan complaints'
      }else {
        var second_op_4 = '<input type="checkbox" disabled> Any proof that barangay does not accept loan complaints'
      }


      div.append($('<div class="row g-1 bg-gradient-warning" style="padding: 2em 2em 0 2em;"><input type="hidden" name="req_id" id="request_id" value=""/>\
      <div style="border: 1px solid black; padding: 1em;" class="col-md-8">\
        <h4>Requesting Branch</h4>\
       <label>'+i.full_name+' - '+i.branch_location+'</label>\
      </div>\
      <div style="border: 1px solid black; padding: 1em;" class="col-md-4">\
        <h4>Date Requested</h4>\
       <label>'+i.date_requested+'</label>\
      </div>\
      <div style="border: 1px solid black" class="text-center text-light bg-secondary">CLIENT INFORMATION</div>\
      <div class="col-md-6" style="border: 1px solid black; padding: 1em;">\
        <h4>Client Name</h4>\
       <label>'+i.client_name+'</label>\
      </div>\
      <div class="col-md-6" style="border: 1px solid black; padding: 1em;">\
        <h4>DSB No.</h4>\
       <label>'+i.dsb_no+'</label>\
      </div>\
      <div class="col-md-2" style="border: 1px solid black; padding: 1em;">\
        <h4>Age</h4>\
        <label>'+i.age+'</label>\
      </div>\
      <div class="col-md-2" style="border: 1px solid black; padding: 1em;">\
        <h4>Pension Type</h4>\
      <label>'+i.pension_type+'</label>\
      </div>\
      <div class="col-md-2" style="border: 1px solid black; padding: 1em;">\
        <h4>Loan Term</h4>\
        <label>'+i.loan_term+'</label>\
      </div>\
      <div class="col-md-3" style="border: 1px solid black; padding: 1em;">\
        <h4>Outstanding Balance</h4>\
        <label>'+i.outstanding_balance+'</label>\
      </div>\
      <div class="col-md-3" style="border: 1px solid black; padding: 1em;">\
        <h4>Last Payment Date</h4>\
        <label>'+i.last_payment_date+'</label>\
      </div>\
      <div class="col-md-3" style="border: 1px solid black; padding: 1em;">\
        <h4>SSS No..</h4>\
        <label>'+i.sss_no+'</label>\
      </div>\
      <div class="col-md-3" style="border: 1px solid black; padding: 1em;">\
        <h4>Account Type</h4>\
        <label>'+i.account_type+'</label>\
      </div>\
      <div class="col-md-3" style="border: 1px solid black; padding: 1em;">\
        <h4>Name of Co-Borrower</h4>\
        <label>'+i.nco_borrower+'</label>\
      </div>\
      <div class="col-md-3" style="border: 1px solid black; padding: 1em;">\
      <h4>Bank Name</h4>\
      <label>'+i.bank_name+'</label>\
      </div>\
      <div style="border: 1px solid black" class="text-center text-light bg-secondary">ACTIONS TAKEN</div>\
      <div style="border: 1px solid black" class="text-center"><i><b>PRIMARY REQUIREMENTS</b></i></div>\
      <div class="col-md-6 text-center" style="border: 1px solid black; padding: 1em;">\
      <h4>DECEASED BORROWER</h4>\
      </div>\
      <div class="col-md-6 text-center" style="border: 1px solid black; padding: 1em;">\
      <h4>OTHER THAN DECEASED : <u>'+i.other_than_dec+'</u></h4>\
      </div>\
      <div class="col-md-6" style="border: 1px solid black; padding: 1em;">\
      <h4>Borrower</h4>\
      <div style="display: grid grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr))">\
      <div>'+dec_1+'</div>\
      <div>'+dec_2+'</div>\
      </div>\
      </div>\
      <div class="col-md-6" style="border: 1px solid black; padding: 1em;">\
      <h4>Borrower</h4>\
      <div style="display: grid grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr))">\
      <div>'+other_dec_1+'</div>\
      <div>'+other_dec_2+'</div>\
      <div>'+other_dec_3+'</div>\
      <div>'+other_dec_4+'</div>\
      <div>'+other_dec_5+'</div>\
      </div>\
      </div>\
      <div class="col-md-12" style="border: 1px solid black; padding: 1em;">\
      <h4>Co-Borrower</h4>\
      <div style="display: grid grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr))">\
      <div>'+co_borrow_1+'</div>\
      <div>'+co_borrow_2+'</div>\
      <div>'+co_borrow_3+'</div>\
      <div>'+co_borrow_4+'</div>\
      </div>\
      </div>\
      <div style="border: 1px solid black" class="text-center"><i><b>SECONDARY REQUIREMENTS(CASE BASIS)</b></i></div>\
      <div class="col-md-12" style="border: 1px solid black; padding: 1em;">\
      <div>'+second_op_1+'</div>\
      <div>'+second_op_2+'</div>\
      <div>'+second_op_3+'</div>\
      <div>'+second_op_4+'</div>\
      </div>\
      <div class="col-md-12" style="border: 1px solid black; padding: 1em;">\
      <div>Remarks : '+i.branch_remarks+'</div>\
      </div>'))
    })
  })


  const div_approver = $('#approver_details')
  div_approver.empty()
  div_approver.append('<div id="approver_details"></div>')
  const json_approver = "/api/all/approver/"+request_id

  await $.get(json_approver, (data) => {
    $.each(data, (key, i) => {

      if(i.position == 1){
        var approver = '<div style="border: 1px solid black; padding: 1em;"><center><div class="bg-secondary text-light" style="border: 1px solid black">\
        AREA SUPERVISOR</div></center><br>\
        <div style="display: grid grid-template-columns: repeat(auto-fit, minmax(24rem, 1fr))">\
        <div>Review by : '+i.review_by+'</div><div>Date : '+i.approval_date+'</div>\
        </div>\
        </div>'
      }else if(i.position == 2){
        var approver = '<div style="border: 1px solid black; padding: 1em;"><center><div class="bg-secondary text-light" style="border: 1px solid black">\
        DISTRICT MANAGER</div></center><br>\
        <div style="display: grid grid-template-columns: repeat(auto-fit, minmax(24rem, 1fr))">\
        <div>Review by : '+i.review_by+'</div><div>Date : '+i.approval_date+'</div>\
        </div>\
        </div>'
      }else if(i.position == 3){
        var approver = '<div style="border: 1px solid black; padding: 1em;"><center><div class="bg-secondary text-light" style="border: 1px solid black">\
        CHIEF ACCOUNTANT</div></center><br>\
        <div style="display: grid grid-template-columns: repeat(auto-fit, minmax(24rem, 1fr))">\
        <div>Noted by : '+i.review_by+'</div><div>Date : '+i.approval_date+'</div>\
        </div>\
        </div>'
      }else if(i.position == 4){
        var approver = '<div style="border: 1px solid black; padding: 1em;"><center><div class="bg-secondary text-light" style="border: 1px solid black">\
        AUDIT ASSISTANT</div></center><br>\
        <div style="display: grid grid-template-columns: repeat(auto-fit, minmax(24rem, 1fr))">\
        <div>Result of Evaluation : '+i.review_by+'</div><div>Date : '+i.approval_date+'</div><div>Remarks : '+i.review_by+'</div>\
        </div>\
        </div>'
      }else if(i.position == 5){
        var approver = '<div style="border: 1px solid black; padding: 1em;"><center><div class="bg-secondary text-light" style="border: 1px solid black">\
        AUDIT HEAD</div></center><br>\
        <div style="display: grid grid-template-columns: repeat(auto-fit, minmax(24rem, 1fr))">\
        <div>Evaluated by : '+i.review_by+'</div><div>Date : '+i.approval_date+'</div>\
        </div>\
        </div>'
      }
      else if(i.position == 6){
        var approver = '<div style="border: 1px solid black; padding: 1em;"><center><div class="bg-secondary text-light" style="border: 1px solid black">\
        OPERATIONS MANAGER</div></center><br>\
        <div style="display: grid grid-template-columns: repeat(auto-fit, minmax(24rem, 1fr))">\
        <div style="display: grid grid-template-columns: repeat(auto-fit, minmax(24rem, 1fr))">\
        <div>Result of Evaluation : '+i.review_by+'</div><div>Date : '+i.approval_date+'</div><div>Reason for Write-Off : '+i.review_by+'</div>\
        </div>\
        </div>'
      }
      else if(i.position == 7){
        var approver = '<div style="border: 1px solid black; padding: 1em;"><center><div class="bg-secondary text-light" style="border: 1px solid black">\
        FINANCE MANAGER</div></center><br>\
        <div style="display: grid grid-template-columns: repeat(auto-fit, minmax(24rem, 1fr))">\
        <div>Approved by : '+i.review_by+'</div><div>Date : '+i.approval_date+'</div>\
        </div>\
        </div>'
      }
      div_approver.append($(''+approver+''))
    })
  })


  
})


$(document).on("click", ".btnCancel", function(){

  const request_id = $(this).data("request")


  Swal.fire({
    title: 'Do you want to cancel this? '+request_id,
    text: "Note : You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes'
  }).then((result) => {

    if (result.isConfirmed) {

      $.ajax({
        url: "/api/request/cancel/"+request_id,
        type: "PUT",
        success: function(data){
          toastr.options = {
            "closeButton": true,
            "debug": false,
            "newestOnTop": false,
            "progressBar": true,
            "positionClass": "toast-top-center",
            "preventDuplicates": false,
            "onclick": null,
            "showDuration": "300",
            "hideDuration": "1000",
            "timeOut": "5000",
            "extendedTimeOut": "1000",
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut"
          }
          toastr.success('Your '+request_id+' has been cancelled!')
          $('#example').DataTable().ajax.reload()
        }
      })

    }

  })
})