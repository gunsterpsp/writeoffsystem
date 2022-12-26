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
      ajax: '/api/completed/read',
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
