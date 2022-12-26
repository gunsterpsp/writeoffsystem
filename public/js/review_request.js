

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
        ajax: '/review_request/read',
        columns: [
            {
                className: 'dt-control',
                orderable: false,
                data: null,
                defaultContent: '',
            },
            { data: 'request_id' },
            { data: 'full_name' },
            { data: 'branch_location' },
            { data: 'approve' },
            { data: 'reject' },
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
  
  

  function toggle(source) {
    checkboxes = document.getElementsByClassName('check_value');
     for(var i in checkboxes)
       checkboxes[i].checked = source.checked;
  
       if ($(source).is(':checked')) {
  
          $('.update_new').removeAttr('disabled'); //enable input
          $('.update_new1').removeAttr('disabled'); //enable input
  
          } else {
          $('.update_new').attr('disabled', true); //disable input
          $('.update_new1').attr('disabled', true); //disable input
          
          }
  
   }
  
  
  
  


$(document).on("click", ".check_value",function(){
    CountSelectedCB = [];

    $("input[name='updateFolder[]']:checked").change(function(){

    selectedCB = [];
    notSelectedCB = [];

    CountSelectedCB.length = 0;
    $("input[name='updateFolder[]']:checked").each(function(){
        if($(this).is(":checked")){
        CountSelectedCB.push($(this).data("id"));
        }
    })
    $("input[name='selectedCB[]']").val(CountSelectedCB);
    })
})




$(document).on("click", ".check_all",function(){

    const this_value = $(this).val()

    CountSelectedCB = [];

    $("input[name='check_all[]']:checked").change(function(){

    selectedCB = [];
    notSelectedCB = [];

    CountSelectedCB.length = 0;
    $("input[name='check_all[]']:checked").each(function(){
        if($(this).is(":checked")){
        CountSelectedCB.push($(this).data("id"));
        }
    })
    $("input[name='selectedCB[]']").val(CountSelectedCB);
    })
})






$(document).on("click", ".check_value", function(){

    $(".check_value").change(function(){

    const selectedCB = $("#selectedCB").val();

    if(selectedCB == ''){
        $(".update_new").prop("disabled", true);
        document.getElementById("check_all").checked = false;
    }else {
        $(".update_new").prop("disabled", false);
    }
    })
})

$(document).on("click", ".btnApprove", function(){

    const req_id = $(this).data("id")
    const request_no = $(this).data("request")
    const position_id = $(this).data("position")

    $("#req_id").val(req_id)
    $("#request_no").val(request_no)
    $("#position_id").val(position_id)
    
    
})




$(document).on("click", ".approvedBtn", async function(){

    const id = $("#req_id").val()
    const dateToday = $("#dateToday").val()
    const request_no = $("#request_no").val()
    const position_id = $("#position_id").val()
    const remarks = $("#remarksValue").val()

    const data = {
        dateToday: dateToday,
        request_no: request_no,
        position_id: position_id,
        remarks: remarks
    }

    const data2 = {
        request_no: request_no,
        position_id: position_id
    }


    if(remarks == ''){
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
          toastr.info('Please fill out the remarks field!')
    }else {

        await axios.put('/api/review_request/update/'+id, data)
        .then(res => {
            $("#approvedModal").modal("hide")
            $('#example').DataTable().ajax.reload()
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
              toastr.info(''+request_no+' has been approved!')
        })
        .catch(err => console.error(err));

        await axios.put('/api/review_request/update2/'+id, data2)
        .then(res => {})
        .catch(err => console.error(err));
        
    }

})



var month = new Date().toLocaleString('en-US', { month: 'long' });
var day = new Date().toLocaleString('en-US', { day: '2-digit' });
var year =  new Date().getFullYear();

document.getElementById("dateToday").value = month + ' ' + day + ', ' + year;


$(document).on("click", ".btnReject", async function(){

    const id = $(this).data("id")
    const request_id = $(this).data("request")

    document.getElementById('reject_id').value = id;
    document.getElementById('rejectTitle').innerHTML = request_id;

})




document.getElementById('rejectBtn')
.addEventListener('click', async () => {

    const id = document.getElementById("reject_id").value
    const remarks = document.getElementById("remarksReject").value

    data = {
        remarks: remarks
    }

    if(remarks == ''){

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
          toastr.info('Please fill out the reason to reject field!')

    }else {

await axios.put('/api/review_request/reject/'+id, data)
.then(res => {
  $('#example').DataTable().ajax.reload();
  $('#rejectBackDrop').modal("hide");
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
  toastr.success('updated!')
  document.getElementById('remarksReject').value = ''
})
.catch(err => console.error(err));

}
})







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