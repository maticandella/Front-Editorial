const checkLogin = () => localStorage.getItem('jwt')

const linkLogout = document.getElementById('logout')

linkLogout.addEventListener('click', (e) => {
    localStorage.setItem("jwt", "")
    window.location.href = "./login.html"
})