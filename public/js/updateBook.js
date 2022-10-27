const setCategories = async (idCategoria) => {
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
    selectCategorie.value = idCategoria
}

const completeSelects = async (bookGet) => {
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
    selectAutor.value = bookGet.idAutor

    //API Idiomas
    const languages = await getAll("languages")
    
    //Rellenar Select Idioma del formulario
    const templateIdioma = language => `
        <option value=${language.IdIdioma}>${language.Idioma}</option>
    `
    
    selectIdioma.innerHTML = languages.map(language => templateIdioma(language)).join('')
    selectIdioma.value = bookGet.idIdioma
}

const completeFormElements = async (bookGet) => {
    //Inputs
    const titulo = document.getElementById("titulo")
    const isbn = document.getElementById("isbn")
    const fechaPublicacion = document.getElementById("fecha-publicacion")
    const nroPaginas = document.getElementById("nro-paginas")
    const precio = document.getElementById("precio")
    const reseña = document.getElementById("reseña") 
    //const portada = document.getElementById("portada")

    //Formateo la fecha para el input type date
    const [date, month, year] = bookGet.fechaPublicacion.split('/')
    const fecha = `${year}-${month}-${date}`

    titulo.value = bookGet.titulo
    isbn.value = bookGet.isbn
    fechaPublicacion.value = fecha
    nroPaginas.value = bookGet.numeroPaginas
    precio.value = bookGet.precio
    reseña.value = bookGet.resenia
    //portada.value = bookGet.imagenTapa
}

const getId = (valor) => {
    const select = document.getElementById(valor)
    return select.options[select.selectedIndex].value
}

const updateBook = (idLibro) => {
    const formAdd = document.getElementById("form-addBook")

    formAdd.addEventListener('submit', async (e) => {
        e.preventDefault()
        //Obtengo el id de Categoria
        const idCategoria = await getId("categoria")
        //Obtengo el id de Autor
        const idAutor = await getId("autor")
        //Obtengo el id de Idioma
        const idIdioma = await getId("idioma")
        //Obtengo el id de Usuario
        const usuario = await getUserByEmail("users", sessionStorage.getItem("email"))
        const idUsuario = usuario.IdUsuario

        //Inputs
        const titulo = document.getElementById("titulo").value
        const isbn = document.getElementById("isbn").value
        const fechaPublicacion = document.getElementById("fecha-publicacion").value
        const nroPaginas = document.getElementById("nro-paginas").value
        const precio = document.getElementById("precio").value
        const reseña = document.getElementById("reseña").value

        //Portada 
        const portada = document.getElementById("portada").value
        //Obtengo el name de la imagen seleccionada
        if (portada) {
            var startIndex = (portada.indexOf('\\') >= 0 ? portada.lastIndexOf('\\') : portada.lastIndexOf('/'));
            var filename = portada.substring(startIndex);
            if (filename.indexOf('\\') === 0 || filename.indexOf('/') === 0) {
                filename = filename.substring(1);
            }
        }
        //Path de la imagen seleccionada
        const imgTapa = '/img/' + filename

        const book = new Book(idCategoria, idAutor, titulo, isbn, fechaPublicacion, 
             nroPaginas, idIdioma, precio, reseña, imgTapa, idUsuario);
        
        const response = await putObject("books", idLibro, book)    
        console.log(response.status)
        let mensaje = ""

        if (response != null && response.status >= 400) {
            mensaje = await response.json()
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: mensaje.errors[0].msg
              })
        } else {
            //Registro exitoso
            mensaje = await response.text()
            //Mensaje de SweetAlert2
            Swal.fire({
                position: 'center-center',
                icon: 'success',
                title: mensaje,
                showConfirmButton: false,
                timer: 1500
              }).then(relocation => window.location.href = "/index")
        }
    })
}

document.addEventListener('DOMContentLoaded', async () => {
    const isLoggedIn = checkLogin()
    if (isLoggedIn) {
        let params = new URLSearchParams(location.search);
        const idLibro = params.get('idLibro');

        const bookGet = await getBookById(idLibro)
        await setCategories(bookGet.idCategoria)
        await completeSelects(bookGet)
        completeFormElements(bookGet)
        updateBook(idLibro)
    } else {
        window.location.href = "/login";
    }
})