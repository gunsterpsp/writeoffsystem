// FETCH ALL USERGROUPS
$('#example').dataTable({
processing: true,
"destroy": true,
"order": [[0, "desc"]],
ajax: {
    url: "/api/usergroups/read",
    type: "GET",
    dataType: "json",
    dataSrc: "",
},
"columns": [
    { "data": "user_code"  },
    { "data": "group_name"  },
    { "data": "action"  },
    { "data": "status"  },
    { "data": "delete"  },
    ]
});


// STATUS USER ACCOUNTS
$(document).on("click", ".activeId", async function(){
  const user_code = $(this).data("id")
  const group_name = $(this).data("group")
  await axios.post('/api/usergroups/active/'+user_code)
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
    toastr.info(''+group_name+' has been set to inactive')
  })
  .catch(err => console.error(err));
})





// STATUS USER ACCOUNTS
$(document).on("click", ".inactiveId", async function(){
  const user_code = $(this).data("id")
  const group_name = $(this).data("group")
  await axios.post('/api/usergroups/inactive/'+user_code)
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
    toastr.success(''+group_name+' has been set to active')
  })
  .catch(err => console.error(err));
})



// ADD NEW USER ACCOUNTS
const addGroup = document.getElementById('addGroup')
.addEventListener('click', async () => {
  const usergroup = document.getElementById('usergroup').value

  if(usergroup == ''){
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
    data = {
      usergroup: usergroup,
    }
    await axios.post('/api/usergroups/add', data)
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
      toastr.success(''+usergroup+' has been added!')
      document.getElementById('usergroup').value = ''

    })
    .catch(err => console.error(err));
  }


})


// VIEW USER INFORMATION
$(document).on("click", ".btnView", function(){

  const user_code = $(this).data("id")
  const group_name = $(this).data("group")

  $("#u_usercode").val(user_code)
  $("#u_group_name").val(group_name)

})


$(document).on("click", "#editGroup", async function(){

  const user_code = $('#u_usercode').val()
  const group_name = $('#u_group_name').val()

  data = {
    group_name: group_name,
  }

  if(group_name == ''){
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

    await axios.put('/api/usergroups/update/'+user_code, data)
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
      toastr.success('Usergroup has been updated to '+group_name+'')
     
    })
    .catch(err => console.error(err));

  }


})



$(document).on("click", ".deleteBtn", async function(){

  const user_code = $(this).data("id")
  const group_name = $(this).data("group")

  Swal.fire({
    title: 'Do you want to delete this usergroup? '+group_name+'',
    showCancelButton: true,
    confirmButtonText: 'Yes',
  }).then((result) => {
    if(result.isConfirmed) {

      axios.delete('/api/usergroups/delete/'+user_code)
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
        toastr.error(''+group_name+' has been deleted!')
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