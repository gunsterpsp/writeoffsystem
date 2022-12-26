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
    bank_name: bank_name
  }

  if(client_name == '' || dsb_no == ''){
    document.getElementById("client_name").style.border = "1px solid red";
    document.getElementById("dsb_no").style.border = "1px solid red";
  
  }else {
  

    await axios.post('/api/request/add', data)
    .then(res => {
      $('#example').DataTable().ajax.reload();
      $('#requestBackdrop').modal("hide");
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
    })
    .catch(err => console.error(err));
  

  }

})






var month = new Date().toLocaleString('en-US', { month: 'long' });
var day = new Date().toLocaleString('en-US', { day: '2-digit' });
var year =  new Date().getFullYear();

document.getElementById("dateToday").value = month + ' ' + day + ', ' + year;
document.getElementById("date_requested").value = month + ' ' + day + ', ' + year;


var number = Math.floor(100000 + Math.random() * 900000);
document.getElementById("request_id").value = 'REQ'+number;


/* Formatting function for row details - modify as you need */
function format(d) {
  // `d` is the original data object for the row
  return (
      '<table class="table table-striped" style="width: 100%;">' +
      '<thead>' +
      '<tr>' +
          '<th>'+ 'Client Name' + '</th>' +
          '<th>'+ 'DSB No.' + '</th>' +
          '<th>'+ 'Age' + '</th>' +
          '<th>'+ 'Pension Type' + '</th>' +
          '<th>'+ 'Loan Term' + '</th>' +
          '<th>'+ 'Outstanding Balance' + '</th>' +
          '<th>'+ 'Last Payment Date' + '</th>' +
          '<th>'+ 'SSS No.' + '</th>' +
          '<th>'+ 'Account Type' + '</th>' +
          '<th>'+ 'Name of Co-Borrower' + '</th>' +
          '<th>'+ 'Bank Name' + '</th>' +
      '</tr>' +
      '</thead>' +
      '<tbody>' +
      '<tr>' +
      '<td>' + d.client_name + '</td>' +
      '<td>' + d.dsb_no + '</td>' +
      '<td>' + d.age + '</td>' +
      '<td>' + d.pension_type + '</td>' +
      '<td>' + d.loan_term + '</td>' +
      '<td>' + d.outstanding_balance + '</td>' +
      '<td>' + d.last_payment_date + '</td>' +
      '<td>' + d.sss_no + '</td>' +
      '<td>' + d.account_type + '</td>' +
      '<td>' + d.nco_borrower + '</td>' +
      '<td>' + d.bank_name + '</td>' +
      '</tr>' +
      '</tbody>' +
      '</table>'
  );
}

$(document).ready(function () {
  var table = $('#example').DataTable({
      ajax: '/api/request/read',
      columns: [
          {
              className: 'dt-control',
              orderable: false,
              data: null,
              defaultContent: '',
          },
          { data: 'request_id' },
          { data: 'approver_status' },
          { data: 'status' },
          { data: 'cancel_request' },
          { data: 'date_requested' },

      ],
      order: [[1, 'desc']],
  });

  // Add event listener for opening and closing details
  $('#example tbody').on('click', 'td.dt-control', function () {
      var tr = $(this).closest('tr');
      var row = table.row(tr);

      if (row.child.isShown()) {
          // This row is already open - close it
          row.child.hide();
          tr.removeClass('shown');
      } else {
          // Open this row
          row.child(format(row.data())).show();
          tr.addClass('shown');
      }
  });
});







$(document).on("click", ".btnView", async function(e){
  e.preventDefault()
  $("#viewBackdrop").modal("show")
  const request_id = $(this).data("id")

  $("#requestNo").html(request_id)

  const div = $('#swiper_append');

  div.empty();

  div.append('<div id="swiper_append"></div>');

  const json = "/api/recent_request/transaction/"+request_id
  
  await $.get(json, (data) => {
    $.each(data, (key, i) => {

        if(i.review_by == null){
          var review = 'Review by : Not yet review'
        }else {
          var review = 'Review by : ' +i.review_by
        }

        if(i.approval_date == null){
          var approve = 'Approval Date : Not yet approve'
        }else {
          var approve = 'Approval Date : ' + i.approval_date
        }

        if(i.approver_remarks == null){
          var remarksDisplay = '<textarea disabled class="form-control" placeholder="Remarks : Not yet available"></textarea>'
        }else {
          var remarksDisplay = '<textarea disabled class="form-control">'+i.approver_remarks+'</textarea>'
        }


      div.append($('<div class="card swiper-slide">\
          <div class="image-content">\
          <span class="overlay text-light text-center bg-gradient-primary" style="padding-top: 1em;">\
              <label class="text-light">S.No: '+i.position+' - </label>\
              ' + i.group_name + '\
             </span>\
         </div>\
         <div class="card-content"><div class="mb-3"></div>\
            <div class="text-center mb-3">'+review+'</div>\
             <div class="text-center mb-3">'+approve+'</div>\
             <div class="text-center col-md-10 mx-auto mb-3">'+remarksDisplay+'</div>\
          </div>\
      </div>'));
    })
  });
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
          $('#example').DataTable().ajax.reload();
        }
      })

    }

  })
})