window.onload = async () => {
    const isLoggedIn = checkLogin()
    if (isLoggedIn) {
        // const ulNav = document.getElementById("ul-nav")
        // const template = `<li class="nav-item">
        //                     <a id="logout" class="nav-link" href="#">Cerrar sesión</a>
        //                   </li>`
        // ulNav.innerHTML = template;
        
        await getCategories()
        await getBooks()
        await redirectBookId()
    } else {
        window.location.href = "/login";
    }
}
