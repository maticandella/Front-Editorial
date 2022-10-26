const linkLogout = document.getElementById('logout')

linkLogout.addEventListener('click', (e) => {
    sessionStorage.setItem("jwt", "")
    sessionStorage.setItem("email", "")
    window.location.href = "/login"
})