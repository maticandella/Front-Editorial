const getCategories = async () => {
    //Se utiliza para obtener las categorias y mostrarlas en la barra de navegacion y en el formulario
    const dropdownCategorias = document.getElementById('categorias')
    
    const categories = await getAll("categories")

    //Completar Drow Down de la barra de navegación
    const templateDropDown = categorie => `
        <li>
            <a class="dropdown-item" href="#">${categorie.Descripcion}</a>
        </li>
    `
    dropdownCategorias.innerHTML = categories.map(categorie => templateDropDown(categorie)).join('')
    
    //Rellenar Select del formulario
    const selectCategorie = document.getElementById('categoria')
    const templateSelect = categorie => `
        <li>
            <option value=${categorie.IdCategoria}>${categorie.Descripcion}</option>
        </li>
    `
    selectCategorie.innerHTML = categories.map(categorie => templateSelect(categorie)).join('')
}

const completeSelects = async () => {
    //Se utiliza para obtener los autores e idiomas disponibles y mostrarlos en los select del formulario
    const selectAutor = document.getElementById('autor')
    const selectIdioma = document.getElementById('idioma')

    //API Autores
    const authors = await getAll("authors")

    //Rellenar Select Autor del formulario
    const templateAutor = author => `
        <option value=${author.IdAutor}>${author.Nombre} ${author.Apellido}</option>
    `
    selectAutor.innerHTML = authors.map(author => templateAutor(author)).join('')

    //API Idiomas
    const languages = await getAll("languages")
    
    //Rellenar Select Idioma del formulario
    const templateIdioma = language => `
        <option value=${language.IdIdioma}>${language.Idioma}</option>
    `
    
    selectIdioma.innerHTML = languages.map(language => templateIdioma(language)).join('')
}

const addBook = async () => {
    const formAdd = document.getElementById("form-addBook")

    formAdd.addEventListener('submit', (e) => {
        e.preventDefault()
        //Continuar acaaaaaaaa / quitar lo harcodeado y reemplazarlo por los datos correctos
        const categoria = 1// document.getElementById("categoria").value
        const autor = 3//document.getElementById("autor").value
        const titulo = document.getElementById("titulo").value
        const isbn = document.getElementById("isbn").value
        const fechaPublicacion = document.getElementById("fecha-publicacion").value
        const nroPaginas = document.getElementById("nro-paginas").value
        const idioma = 1//document.getElementById("idioma").value
        const precio = document.getElementById("precio").value
        const reseña = document.getElementById("reseña").value
        const portada = "https://static.cegal.es/imagenes/marcadas/9788408/978840825327.gif" //document.getElementById("portada").value
        const usuario = 1
        
        const book = new Book(categoria, autor, titulo, isbn, fechaPublicacion, 
            nroPaginas, idioma, precio, reseña, portada, usuario);
        
        const response = postObject("books", book)    
        
        if (response.status >= 400) {
            // const errorNode = document.getElementById('error')
            // errorNode.innerHTML = response.text()
            console.log(response)
        } else {
            //Registro exitoso
            console.log(response);
            //Mensaje de SweetAlert2
            Swal.fire({
                position: 'center-center',
                icon: 'success',
                title: 'Libro registrado exitosamente',
                showConfirmButton: false,
                timer: 1500
              }).then(relocation => window.location.href = "./index.html")
        }
    })
}

document.addEventListener('DOMContentLoaded', async () => {
    const isLoggedIn = checkLogin()
    if (isLoggedIn) {
        await getCategories()
        await completeSelects()
        addBook()
    } else {
        window.location.href = "./login.html";
    }
})