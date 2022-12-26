// FETCH ALL USERGROUPS
$('#example').dataTable({
processing: true,
"destroy": true,
"order": [[0, "desc"]],
ajax: {
    url: "/api/districts/read",
    type: "GET",
    dataType: "json",
    dataSrc: "",
},
"columns": [
    { "data": "district_code"  },
    { "data": "district_location"  },
    { "data": "district_manager"  },
    { "data": "action"  },
    { "data": "status"  },
    { "data": "delete"  },
    ]
});


// STATUS USER ACCOUNTS
$(document).on("click", ".activeId", async function(){
  const district_code = $(this).data("id")
  const district_location = $(this).data("location")
  await axios.post('/api/districts/active/'+district_code)
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
    toastr.info(''+district_location+' has been set to inactive')
  })
  .catch(err => console.error(err));
})





// STATUS USER ACCOUNTS
$(document).on("click", ".inactiveId", async function(){
  const district_code = $(this).data("id")
  const district_location = $(this).data("location")
  await axios.post('/api/districts/inactive/'+district_code)
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
    toastr.success(''+district_location+' has been set to active')
  })
  .catch(err => console.error(err));
})



// ADD NEW USER ACCOUNTS
const addGroup = document.getElementById('addDistrict')
.addEventListener('click', async () => {
  const district_location = document.getElementById('district_location').value
  const district_manager = document.getElementById('district_manager').value

  data = {
    district_location: district_location,
    district_manager: district_manager
  }

  if(district_location == '' || district_manager == ''){
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

    await axios.post('/api/districts/add', data)
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
      toastr.success(''+district_location+' has been added!')
      document.getElementById('district_location').value = ''
      document.getElementById('district_manager').value = ''
    })
    .catch(err => console.error(err));
  }
})


// VIEW USER INFORMATION
$(document).on("click", ".btnView", function(){

  const district_code = $(this).data("id")
  const district_location = $(this).data("location")
  const district_manager = $(this).data("name")

  $("#u_districtcode").val(district_code)
  $("#u_district_location").val(district_location)
  $("#u_district_manager").val(district_manager)

})


$(document).on("click", "#editDistrict", async function(){

  const district_code = $('#u_districtcode').val()
  const district_location = $('#u_district_location').val()
  const district_manager = $('#u_district_manager').val()

  data = {
    district_location: district_location,
    district_manager: district_manager
  }

  if(district_location == '' || district_manager == ''){
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

    await axios.put('/api/districts/update/'+district_code, data)
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
      toastr.success('District Location has been updated to '+district_location+'')
      toastr.success('District Manager has been updated to '+district_manager+'')
    })
    .catch(err => console.error(err));
  }
})



$(document).on("click", ".deleteBtn", async function(){

  const district_code = $(this).data("id")
  const district_location = $(this).data("location")

  Swal.fire({
    title: 'Do you want to delete this branch? '+district_location+'',
    showCancelButton: true,
    confirmButtonText: 'Yes',
  }).then((result) => {
    if(result.isConfirmed) {

      axios.delete('/api/districts/delete/'+district_code)
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
        toastr.error(''+district_location+' has been deleted!')
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