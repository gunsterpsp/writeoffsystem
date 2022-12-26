// FETCH ALL USER ACCOUNTS
$('#example').dataTable({
processing: true,
"destroy": true,
"order": [[0, "desc"]],
ajax: {
    url: "/api/users/read",
    type: "GET",
    dataType: "json",
    dataSrc: "",
},
"columns": [
    { "data": "id"  },
    { "data": "full_name"  },
    { "data": "username"  },
    { "data": "password"  },
    { "data": "email"  },
    { "data": "user_code"  },
    { "data": "branch_code"  },
    { "data": "area_code"  },
    { "data": "district_code"  },
    { "data": "action"  },
    { "data": "status"  },
    { "data": "delete"  },
    ]
});


// STATUS USER ACCOUNTS
$(document).on("click", ".activeId", async function(){
  const id = $(this).data("id")
  await axios.post('/api/users/active/'+id)
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
    toastr.info('User has been set to inactive')
  })
  .catch(err => console.error(err));
})





// STATUS USER ACCOUNTS
$(document).on("click", ".inactiveId", async function(){
  const id = $(this).data("id")
  await axios.post('/api/users/inactive/'+id)
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
    toastr.success('User has been set to active')
  })
  .catch(err => console.error(err));
})



// ADD NEW USER ACCOUNTS
const addUser = document.getElementById('addUser')
.addEventListener('click', async () => {

  const full_name = document.getElementById('full_name').value
  const username = document.getElementById('username').value
  const password = document.getElementById('password').value
  const email = document.getElementById('email').value
  const user_code = document.getElementById('user_code').value

  if(username == '' || password == '' || email == '' || full_name == '' || user_code == ''){
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
      full_name: full_name,
      username: username,
      password: password,
      email: email,
      user_code, user_code
    }
    await axios.post('/api/users/add', data)
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
      toastr.success('New user account has been added!')
      document.getElementById('full_name').value = ''
      document.getElementById('username').value = ''
      document.getElementById('password').value = ''
      document.getElementById('email').value = ''
      document.getElementById('user_code').value = ''

    })
    .catch(err => console.error(err));
  }
})


// VIEW USER INFORMATION
$(document).on("click", ".btnView", function(){

  const id = $(this).data("id")
  const full_name = $(this).data("fullname")
  const username = $(this).data("user")
  const password = $(this).data("pass")
  const email = $(this).data("email")
  const group = $(this).data("group")

  $("#uid").val(id)
  $("#u_full_name").val(full_name)
  $("#u_username").val(username)
  $("#u_password").val(password)
  $("#u_email").val(email)
  $("#u_user_code").val(group)


  $(".edit_dm").select2({
      dropdownParent: $('#EditBackdrop'),
  });

  $(".edit_as").select2({
    dropdownParent: $('#EditBackdrop'),
  });

  $(".edit_bh").select2({
    dropdownParent: $('#EditBackdrop'),
  });


})



$(document).on("click", ".btn_HO", async function() {
  const user_code = $(this).data("id")

  $.ajax({
    url: "/users/groups/"+user_code,
    type: "GET",
    dataType: "json",
    success: function(data){
      var options = "";
      for (var i = 0; i < data.length; i++) {
          options += "<option value='"+ data[i].user_code +"'>" + data[i].group_name + "</option>";
      }
      $(".ho_code").html(options);
    }
  })
  
  $(".ho_code").select2({
    placeholder: "Select Usergroup",
    dropdownParent: $('#hoBackdrop'),
  });

})


$(document).on("click", ".btnHO", async function(){
  const dropdown = $('.ho_code');

  const json = '/users/groups';
  
  await $.get(json, (data) => {
  $.each(data, (key, i) => {
    dropdown.append($('<option value="'+i.user_code+'">'+i.group_name+'</option>'));
  })
  });

})





$(document).on("click", ".btnAS", async function() {
  const area_code = $(this).data("as")

  $.ajax({
    url: "/users/as/"+area_code,
    type: "GET",
    dataType: "json",
    success: function(data){
      var options = "";
      for (var i = 0; i < data.length; i++) {
          options += "<option value='"+ data[i].area_code +"'>" + data[i].area_location + " - " + data[i].area_supervisor + "</option>";
      }
      $(".edit_as").html(options);
    }
  })
})



$(document).on("click", ".btnBH", async function() {
  const branch_code = $(this).data("bh")

  $.ajax({
    url: "/users/bh/"+branch_code,
    type: "GET",
    dataType: "json",
    success: function(data){
      var options = "";
      for (var i = 0; i < data.length; i++) {
          options += "<option value='"+ data[i].branch_code +"'>" + data[i].branch_location + "</option>";
      }
      $(".edit_bh").html(options);
    }
  })
})



// $(document).on("click", ".btnGroup", async function() {
//   // const user_code = $(this).data("group")
//   // alert(user_code)

//   $.ajax({
//     url: "/users/bh/"+branch_code,c
//     type: "GET",
//     dataType: "json",
//     success: function(data){
//       var options = "";
//       for (var i = 0; i < data.length; i++) {
//           options += "<option value='"+ data[i].branch_code +"'>" + data[i].branch_location + "</option>";
//       }
//       $(".edit_bh").html(options);
//     }
//   })
// })




$(document).on("click", ".btn_DM", async function(){

  const dropdown = $('.edit_dm');

dropdown.empty();

// dropdown.append('<option value=""></option>');

const json = '/users/dm';

await $.get(json, (data) => {
  $.each(data, (key, i) => {
    dropdown.append($('<option value="'+i.district_code+'">\
    '+i.district_location+' - '+i.district_manager+'</option>'));
  })
});
})

$(document).on("click", ".btn_AS", async function(){

  const dropdown = $('.edit_as');

dropdown.empty();

// dropdown.append('<option value=""></option>');

const json = '/users/as';

await $.get(json, (data) => {
  $.each(data, (key, i) => {
    dropdown.append($('<option value="'+i.area_code+'">\
    '+i.area_location+' - '+i.area_supervisor+'</option>'));
  })
});
})


$(document).on("click", ".btn_BH", async function(){

  const dropdown = $('.edit_bh');

dropdown.empty();

// dropdown.append('<option value=""></option>');

const json = '/users/bh';

await $.get(json, (data) => {
  $.each(data, (key, i) => {
    dropdown.append($('<option value="'+i.branch_code+'">\
    '+i.branch_location+'</option>'));
  })
});
})



$(document).on("click", ".editUser", async function(){

  const id = $('#uid').val()
  const full_name = $('#u_full_name').val()
  const username = $('#u_username').val()
  const password = $('#u_password').val()
  const email = $('#u_email').val()
  const user_code = $('#u_user_code').val()

  data = {
    full_name: full_name,
    username: username,
    password: password,
    email: email,
    user_code: user_code
  }

  if(username == '' || password == '' || email == '' || full_name == '' || user_code == ''){
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

    await axios.put('/api/users/update/'+id, data)
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
      toastr.success('User account has been updated!')
    })
    .catch(err => console.error(err));
  }
})

$(document).on("click", ".deleteBtn", function(){

  const id = $(this).data("id")
  
  Swal.fire({
    title: 'Do you want to this user id? '+id,
    showCancelButton: true,
    confirmButtonText: 'Yes',
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {

      axios.delete('/api/users/delete/'+id)
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
        toastr.error('User Id# '+id+' has been deleted!')
      })
      .catch(err => console.error(err));
    } 
  })
})


document.getElementById('btnHO')
.addEventListener('click', async () => {
  $('#addBackdrop').modal("show")

const dropdown = $('#user_code');

dropdown.empty();

dropdown.append('<option value=""></option>');

const json = '/users/ho';

await $.get(json, (data) => {
  $.each(data, (key, i) => {
    dropdown.append($('<option value="'+i.user_code+'">\
    '+i.group_name+'</option>'));
  })
});

$("#user_code").select2({
  placeholder: "Select Usergroup",
  dropdownParent: $('#addBackdrop'),
});

})






// DM
// ADD NEW USER ACCOUNTS
document.getElementById('addDM')
.addEventListener('click', async () => {

  const full_name = document.getElementById('dm_full_name').value
  const username = document.getElementById('dm_username').value
  const password = document.getElementById('dm_password').value
  const email = document.getElementById('dm_email').value
  const dm_code = document.getElementById('dm_code').value

  if(username == '' || password == '' || email == '' || full_name == '' || dm_code == ''){
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
      full_name: full_name,
      username: username,
      password: password,
      email: email,
      dm_code: dm_code
    }
    await axios.post('/api/users/dm', data)
    .then(res => {
      $('#example').DataTable().ajax.reload();
      $('#dmBackdrop').modal("hide");
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
      toastr.success('New user account has been added!')
      document.getElementById('dm_full_name').value = ''
      document.getElementById('dm_username').value = ''
      document.getElementById('dm_password').value = ''
      document.getElementById('dm_email').value = ''
      document.getElementById('dm_code').value = ''

    })
    .catch(err => console.error(err));
  }
})




document.getElementById('btnDistrict')
.addEventListener('click', async () => {
  $('#dmBackdrop').modal("show")

const dropdown = $('#dm_code');

dropdown.empty();

dropdown.append('<option value=""></option>');

const json = '/users/dm';

await $.get(json, (data) => {
  $.each(data, (key, i) => {
    dropdown.append($('<option value="'+i.district_code+'">\
    '+i.district_manager+'</option>'));
  })
});

$("#dm_code").select2({
  placeholder: "Select District",
  dropdownParent: $('#dmBackdrop'),
});

})




document.getElementById('btnArea')
.addEventListener('click', async () => {
  $("#ASBackdrop").modal("show")

  const dropdown = $('#as_dm_code');

dropdown.empty();

dropdown.append('<option value=""></option>');

const json = '/users/dm';

await $.get(json, (data) => {
  $.each(data, (key, i) => {
    dropdown.append($('<option value="'+i.district_code+'">\
    '+i.district_manager+'</option>'));
  })
});

$("#as_dm_code").select2({
  placeholder: "Select District",
  dropdownParent: $('#ASBackdrop'),
});

const dropdownAS = $('#as_code');

dropdownAS.empty();
dropdownAS.append('<option value=""></option>');
const jsonAS = '/users/as';

await $.get(jsonAS, (data) => {
  $.each(data, (key, i) => {
    dropdownAS.append($('<option value="'+i.area_code+'">\
    '+i.area_supervisor+'</option>'));
  })
});

$("#as_code").select2({
  placeholder: "Select Area",
  dropdownParent: $('#ASBackdrop'),
});
})


// AS
// ADD NEW USER ACCOUNTS
document.getElementById('addAS')
.addEventListener('click', async () => {

  const full_name = document.getElementById('as_full_name').value
  const username = document.getElementById('as_username').value
  const password = document.getElementById('as_password').value
  const email = document.getElementById('as_email').value
  const dm_code = document.getElementById('as_dm_code').value
  const as_code = document.getElementById('as_code').value

  if(username == '' || password == '' || email == ''
   || full_name == '' || dm_code == '' || as_code == ''){
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
      full_name: full_name,
      username: username,
      password: password,
      email: email,
      dm_code: dm_code,
      as_code: as_code
    }
    await axios.post('/api/users/as', data)
    .then(res => {
      $('#example').DataTable().ajax.reload();
      $('#ASBackdrop').modal("hide");
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
      toastr.success('New user account has been added!')
      document.getElementById('as_full_name').value = ''
      document.getElementById('as_username').value = ''
      document.getElementById('as_password').value = ''
      document.getElementById('as_email').value = ''
      document.getElementById('as_dm_code').value = ''
      document.getElementById('as_code').value = ''
    })
    .catch(err => console.error(err));
  }
})



document.getElementById('btnBranch')
.addEventListener('click', async () => {
  $('#branchBackdrop').modal("show")

  const dropdownDM = $('#bh_dm_code');
  dropdownDM.empty();
  dropdownDM.append('<option value=""></option>');
  const jsonDM = '/users/dm';
  await $.get(jsonDM, (data) => {
    $.each(data, (key, i) => {
      dropdownDM.append($('<option value="'+i.district_code+'">\
      '+i.district_manager+'</option>'));
    })
  });
  $("#bh_dm_code").select2({
    placeholder: "Select District",
    dropdownParent: $('#branchBackdrop'),
  });

  const dropdownAS = $('#bh_as_code');
  dropdownAS.empty();
  dropdownAS.append('<option value=""></option>');
  const jsonAS = '/users/as';
  await $.get(jsonAS, (data) => {
    $.each(data, (key, i) => {
      dropdownAS.append($('<option value="'+i.area_code+'">\
      '+i.area_supervisor+'</option>'));
    })
  });
  $("#bh_as_code").select2({
    placeholder: "Select Area",
    dropdownParent: $('#branchBackdrop'),
  });

  const dropdownBH = $('#branch_code');
  dropdownBH.empty();
  dropdownBH.append('<option value=""></option>');
  const jsonBH = '/users/bh';
  await $.get(jsonBH, (data) => {
    $.each(data, (key, i) => {
      dropdownBH.append($('<option value="'+i.branch_code+'">\
      '+i.branch_head+'</option>'));
    })
  });
  $("#branch_code").select2({
    placeholder: "Select Branch",
    dropdownParent: $('#branchBackdrop'),
  });
})


// BH
// ADD NEW USER ACCOUNTS
document.getElementById('addBH')
.addEventListener('click', async () => {

  const full_name = document.getElementById('bh_full_name').value
  const username = document.getElementById('bh_username').value
  const password = document.getElementById('bh_password').value
  const email = document.getElementById('bh_email').value
  const dm_code = document.getElementById('bh_dm_code').value
  const as_code = document.getElementById('bh_as_code').value
  const bh_code = document.getElementById('branch_code').value

  data = {
    full_name: full_name,
    username: username,
    password: password,
    email: email,
    dm_code: dm_code,
    as_code: as_code,
    bh_code: bh_code
  }

  if(username == '' || password == '' || email == ''
   || full_name == '' || dm_code == '' || as_code == '' || bh_code == ''){
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
    await axios.post('/api/users/bh', data)
    .then(res => {
      $('#example').DataTable().ajax.reload();
      $('#branchBackdrop').modal("hide");
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
      toastr.success('New user account has been added!')
      document.getElementById('bh_full_name').value = ''
      document.getElementById('bh_username').value = ''
      document.getElementById('bh_password').value = ''
      document.getElementById('bh_email').value = ''
      document.getElementById('bh_dm_code').value = ''
      document.getElementById('bh_as_code').value = ''
      document.getElementById('branch_code').value = ''
    })
    .catch(err => console.error(err));
  }
})



// $(document).ready(function(){
//   $("#u_user_code").select2({
//       dropdownParent: $('#EditBackdrop'),
//   });
// })