// FETCH ALL USERGROUPS
$('#example').dataTable({
processing: true,
"destroy": true,
"order": [[0, "desc"]],
ajax: {
    url: "/api/areas/read",
    type: "GET",
    dataType: "json",
    dataSrc: "",
},
"columns": [
    { "data": "area_code"  },
    { "data": "area_location"  },
    { "data": "area_supervisor"  },
    { "data": "action"  },
    { "data": "status"  },
    { "data": "delete"  },
    ]
});


// STATUS USER ACCOUNTS
$(document).on("click", ".activeId", async function(){
  const area_code = $(this).data("id")
  const area_location = $(this).data("location")
  await axios.post('/api/areas/active/'+area_code)
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
    toastr.info('Area has been set to inactive')
  })
  .catch(err => console.error(err));
})





// STATUS USER ACCOUNTS
$(document).on("click", ".inactiveId", async function(){
  const area_code = $(this).data("id")
  await axios.post('/api/areas/inactive/'+area_code)
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
    toastr.success('Area has been set to active')
  })
  .catch(err => console.error(err));
})



// ADD NEW USER ACCOUNTS
const addGroup = document.getElementById('addArea')
.addEventListener('click', async () => {
  const area_location = document.getElementById('area_location').value
  const area_supervisor = document.getElementById('area_supervisor').value

  data = {
    area_location: area_location,
    area_supervisor: area_supervisor
  }

  if(area_location == '' || area_supervisor == ''){
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

    await axios.post('/api/areas/add', data)
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
      toastr.success('Area Location '+area_location+' has been added!')
      toastr.success('Area Supervisor '+area_supervisor+' has been added!')
      document.getElementById('area_location').value = ''
      document.getElementById('area_supervisor').value = ''
    })
    .catch(err => console.error(err));
  }
})


// VIEW USER INFORMATION
$(document).on("click", ".btnView", function(){

  const area_code = $(this).data("id")
  const area_location = $(this).data("location")
  const area_supervisor = $(this).data("name")

  $("#u_areacode").val(area_code)
  $("#u_area_location").val(area_location)
  $("#u_area_supervisor").val(area_supervisor)

})


$(document).on("click", "#editBranch", async function(){

  const area_code = $('#u_areacode').val()
  const area_location = $('#u_area_location').val()
  const area_supervisor = $('#u_area_supervisor').val()

  data = {
    area_location: area_location,
    area_supervisor: area_supervisor
  }

  if(area_location == '' || area_supervisor == ''){
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
    toastr.warning('Please complete all required fields!')
  }else {

    await axios.put('/api/areas/update/'+area_code, data)
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
      toastr.success('Area Location has been updated to '+area_location+'')
      toastr.success('Area Supervisor has been updated to '+area_supervisor+'')
     
    })
    .catch(err => console.error(err));

  }


})



$(document).on("click", ".deleteBtn", async function(){

  const area_code = $(this).data("id")

  Swal.fire({
    title: 'Do you want to delete this area? '+area_code+'',
    showCancelButton: true,
    confirmButtonText: 'Yes',
  }).then((result) => {
    if(result.isConfirmed) {

      axios.delete('/api/areas/delete/'+area_code)
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
        toastr.error('Area '+area_code+' has been deleted!')
      })
      .catch(err => console.error(err));

    } 
  })

})








$(document).ready(function(){
  $("#area_location").select2({
    placeholder: "Select an Area",
    dropdownParent: $('#addBackdrop'),
  });
})

// $(document).ready(function(){
//   $("#u_user_code").select2({
//       dropdownParent: $('#EditBackdrop'),
//   });
// })