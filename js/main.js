window.onload = async () => {
    const isLoggedIn = checkLogin()
    if (isLoggedIn) {
        await getCategories()
        await getBooks()
        await redirectBookId()
    } else {
        window.location.href = "./login.html";
    }
}
