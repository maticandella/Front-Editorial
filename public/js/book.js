window.onload = async () => {
    const isLoggedIn = checkLogin()
    if (isLoggedIn) {
        //Obtengo el IdLibro del parametro de la Url
        let params = new URLSearchParams(location.search);
        const idLibro = params.get('idLibro');
        
        await getCategories()
        const bookGet = await getBookById(idLibro)
        setTemplatesBook(bookGet)
        await redirectBookBtn(idLibro)
        deleteBook(idLibro)
    } else {
        window.location.href = "/login";
    }
}

