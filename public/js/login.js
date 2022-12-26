document.getElementById('submit')
.addEventListener('click', async () => {
  
    const username = document.getElementById('username').value
    const password = document.getElementById('password').value

    data = {
      username: username,
      password: password
    }

    await axios.post('/login/', data)
    .then(res => {
    })
    .catch(err => console.error(err));

})