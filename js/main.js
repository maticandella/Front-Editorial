window.onload = async () => {
    const isLoggedIn = checkLogin()
    if (isLoggedIn) {
        await getCategories()
        await getBooks()
    } else {
        window.location.href = "./login.html";
    }
}

