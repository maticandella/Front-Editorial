//Login
const loginForm = document.getElementById("form-login");

//Capturo el evento submit del formulario de Login
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email');
    const pass = document.getElementById('password');

    const User = {"email": email.value, "password": pass.value}

    const response = await fetch('http://localhost:3000/users/login', {
                        headers: {'Content-Type': 'application/json'},
                        method: 'POST',
                        body: JSON.stringify(User)
                    })
    //La respuesta será un jwt que es un string, o un mensaje de error, por lo que no hago response.json()
    const responseData = await response.text()
    
    //Pregunto si el response.status es mayor a 400, ya que todos los errores HTTP tienen numeración mayor a 400
    if (response.status >= 400) {
        const errorNode = document.getElementById('error')
        errorNode.innerHTML = responseData
    } else {
        console.log(responseData);
        sessionStorage.setItem("jwt", `Bearer ${responseData}`)
        sessionStorage.setItem("email", email.value)
        window.location.href = "/index"//"./index.html"
    }
})