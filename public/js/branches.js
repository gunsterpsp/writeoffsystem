// FETCH ALL USERGROUPS
$('#example').dataTable({
processing: true,
"destroy": true,
"order": [[0, "desc"]],
ajax: {
    url: "/api/branches/read",
    type: "GET",
    dataType: "json",
    dataSrc: "",
},
"columns": [
    { "data": "branch_code"  },
    { "data": "branch_location"  },
    { "data": "branch_head"  },
    { "data": "action"  },
    { "data": "status"  },
    { "data": "delete"  },
    ]
});


// STATUS USER ACCOUNTS
$(document).on("click", ".activeId", async function(){
  const branch_code = $(this).data("id")
  const branch_location = $(this).data("location")
  await axios.post('/api/branches/active/'+branch_code)
  .then(res => {
    $('#example').DataTable().ajax.reload();
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
    toastr.info(''+branch_location+' has been set to inactive')
  })
  .catch(err => console.error(err));
})





// STATUS USER ACCOUNTS
$(document).on("click", ".inactiveId", async function(){
  const branch_code = $(this).data("id")
  const branch_location = $(this).data("location")
  await axios.post('/api/branches/inactive/'+branch_code)
  .then(res => {
    $('#example').DataTable().ajax.reload();
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
    toastr.success(''+branch_location+' has been set to active')
  })
  .catch(err => console.error(err));
})



// ADD NEW USER ACCOUNTS
const addGroup = document.getElementById('addBranch')
.addEventListener('click', async () => {
  const branch_location = document.getElementById('branch_location').value
  const branch_head = document.getElementById('branch_head').value

  data = {
    branch_location: branch_location,
    branch_head: branch_head
  }

  if(branch_location == '' || branch_head == ''){
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
    toastr.info('Please complete all required fields!')
  }else {

    await axios.post('/api/branches/add', data)
    .then(res => {
      $('#example').DataTable().ajax.reload();
      $('#addBackdrop').modal("hide");
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
      toastr.success(''+branch_location+' has been added!')
      document.getElementById('branch_location').value = ''
      document.getElementById('branch_head').value = ''
    })
    .catch(err => console.error(err));
  }
})


// VIEW USER INFORMATION
$(document).on("click", ".btnView", function(){

  const branch_code = $(this).data("id")
  const branch_location = $(this).data("location")
  const branch_head = $(this).data("name")

  $("#u_branchcode").val(branch_code)
  $("#u_branch_location").val(branch_location)
  $("#u_branch_head").val(branch_head)

})


$(document).on("click", "#editBranch", async function(){

  const branch_code = $('#u_branchcode').val()
  const branch_location = $('#u_branch_location').val()
  const branch_head = $('#u_branch_head').val()

  data = {
    branch_location: branch_location,
    branch_head: branch_head
  }

  if(branch_location == '' || branch_head == ''){
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
    toastr.warning('Please provide group name text field!')
  }else {

    await axios.put('/api/branches/update/'+branch_code, data)
    .then(res => {
      $('#example').DataTable().ajax.reload();
      $('#EditBackdrop').modal("hide");
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
      toastr.success('Branch Location has been updated to '+branch_location+'')
      toastr.success('Branch Head has been updated to '+branch_head+'')
     
    })
    .catch(err => console.error(err));

  }


})



$(document).on("click", ".deleteBtn", async function(){

  const branch_code = $(this).data("id")
  const branch_location = $(this).data("location")

  Swal.fire({
    title: 'Do you want to delete this branch? '+branch_location+'',
    showCancelButton: true,
    confirmButtonText: 'Yes',
  }).then((result) => {
    if(result.isConfirmed) {

      axios.delete('/api/branches/delete/'+branch_code)
      .then(res => {
        $('#example').DataTable().ajax.reload();
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
        toastr.error(''+branch_location+' has been deleted!')
      })
      .catch(err => console.error(err));

    } 
  })

})








// $(document).ready(function(){
//   $("#add_group").select2({
//       dropdownParent: $('#addBackdrop'),
//   });
// })

// $(document).ready(function(){
//   $("#u_user_code").select2({
//       dropdownParent: $('#EditBackdrop'),
//   });
// })