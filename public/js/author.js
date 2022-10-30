window.onload = async () => {
    const isLoggedIn = checkLogin()
    if (isLoggedIn) {
        //Obtengo el IdAutor del parametro de la Url
        let params = new URLSearchParams(location.search);
        const idAutor = params.get('idAutor');
        
        await getCategories()
        const authorGet = await getAuthorById(idAutor)
        setTemplatesAuthor(authorGet)
        //await redirectAuthorBtn(idAutor)
        //deleteAuthor(idAutor)
    } else {
        window.location.href = "/login";
    }
}