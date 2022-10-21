//Register
const registerForm = document.getElementById("form-register");

//Capturo el evento submit del formulario de Register
registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('register-email');
    const pass = document.getElementById('register-password');

    const User = {"email": email.value, "password": pass.value}

    const response = await fetch('http://localhost:3000/users/register', {
                        headers: {'Content-Type': 'application/json'},
                        method: 'POST',
                        body: JSON.stringify(User)
                    })
    //La respuesta será un jwt que es un string, o un mensaje de error, por lo que no hago response.json()
    const responseData = await response.text()
    
    if (response.status >= 400) {
        const errorNode = document.getElementById('error')
        errorNode.innerHTML = responseData
    } else {
        //Registro exitoso
        console.log(responseData);
        //Mensaje de SweetAlert2
        Swal.fire({
            position: 'center-center',
            icon: 'success',
            title: 'Cuenta registrada exitosamente',
            showConfirmButton: false,
            timer: 1500
          }).then(relocation => window.location.href = "./login.html")
    }
})