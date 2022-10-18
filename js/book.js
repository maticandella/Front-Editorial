window.onload = async () => {
    //Obtengo el IdLibro del parametro de la Url
    let params = new URLSearchParams(location.search);
    const idLibro = params.get('idLibro');
    
    await getCategories()
    await getBookById(idLibro)
}

