window.onload = async () => {
    const isLoggedIn = checkLogin()
    if (isLoggedIn) {
        //Obtengo el IdLibro del parametro de la Url
        let params = new URLSearchParams(location.search);
        const idCategoria = params.get('idCategoria');

        await getCategories()
        await getBooksByCategorie(idCategoria)
        await redirectBookId()
    } else {
        window.location.href = "/login";
    }
}