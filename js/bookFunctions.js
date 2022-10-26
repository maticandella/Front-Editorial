const getCategories = async () => {
    //Se utiliza para obtener las categorias y mostrarlas en el dropdown de Categorias en la barra de 
    //navegación
    const dropdownCategorias = document.getElementById('categorias')
    
    const categories = await getAll("categories")
    const template = categorie => `
        <li>
            <a class="dropdown-item" href="#">${categorie.Descripcion}</a>
        </li>
    `
    dropdownCategorias.innerHTML = categories.map(categorie => template(categorie)).join('')
}

const getBooks = async () => {
    //Se utiliza para obtener los libros y listarlos
    const contenedorImagenes = document.querySelector('.contenedor-imagenes')
    
    const books = await getAll("books")
    const template = book => `
        <img class="img-thumbnail col-md-2 col-sm-3" src="${book.ImagenTapa}" alt="Portada Libro"
        id="${book.IdLibro}">
    `
    contenedorImagenes.innerHTML = books.map(book => template(book)).join('')

    //Search input
    const inputSearch = document.getElementById("input-search")
    
    //Con el evento keyup voy obteniendo lo que el usuario va tecleando en el input
    inputSearch.addEventListener('keyup',() => {
        const bookSearch = []
        books.forEach(book => {
            const valor = inputSearch.value
            const include = book.Titulo.toLowerCase().includes(valor.toLowerCase())
            if (include) {
                bookSearch.push(book)
            }
        })
        
        contenedorImagenes.innerHTML = ""
        const template = bookTemplate => `
        <img class="img-thumbnail col-md-2 col-sm-3" src="${bookTemplate.ImagenTapa}" alt="Portada Libro"
        id="${bookTemplate.IdLibro}">
        `
        contenedorImagenes.innerHTML = bookSearch.map(bookTemplate => template(bookTemplate)).join('')
        redirectBookId()
    })
}

const redirectBookId = async () => {
    //Se utiliza para cuando el usuario clickea una img, se lo redirecciona al libro indicado 
    //con toda su información
    const imgs = document.querySelectorAll('#contenedor-imgs img')
    imgs.forEach(function(img) {
        img.addEventListener("click", async (e) => {
            //Al hacer click obtengo el Id del Libro para enviar la petición a la API
            const idLibro = e.currentTarget.id
            
            //Redirecciono a book enviando el IdLibro
            window.location.href = `book.html?idLibro=${idLibro}`
        })
    })
}

const getBookById = async (idLibro) => {
    //Envio el Id a la API para que me devuelva el Objeto Libro completo
    const book = await getById("books", idLibro)
    
    //Obtengo la Categoría
    const categorie = await getById("categories", book.IdCategoria)

    //Obtengo el Autor
    const author = await getById("authors", book.IdAutor)

    //Obtengo el Idioma
    const language = await getById("languages", book.IdIdioma)

    //Formateo la fecha
    const [dateComponents, timeComponents] = book.FechaPublicacion.split('T');
    const [year, month, date] = dateComponents.split('-')
    const fechaPublicacion = `${date}/${month}/${year}`

    //Constantes a utilizar para setear propiedades en el HTML
    const infoCabecera = document.getElementById('info-cabecera')
    const infoDetalle = document.getElementById('info-detalle')
    const imgPortada = document.getElementById('img-portada')

    //Seteo las propiedades en el HTML
    imgPortada.src = book.ImagenTapa
    
    const templateCabecera = `
        <li class="list-group-item"><h4 class="fs-4 text-danger">${categorie.Descripcion}</h4></li>
        <li class="list-group-item">
            <div class="row">
            <div class="col">
                <h1 class="fs-1">${book.Titulo}</h1>
                <a class="btn btn-primary" href="updateBook.html">Modificar</a>
                <a class="btn btn-danger" href="deleteBook.html">Eliminar</a>
            </div>
            </div>
        </li>
        <li class="list-group-item"><p class="text-secondary">${book.Resenia}</p></li>
    `
    const templateDetalle = `
        <li class="list-group-item"><span class="fw-bold text-muted">ISBN:</span> ${book.ISBN}</li>
        <li class="list-group-item"><span class="fw-bold text-muted">Autor:</span> ${author.Nombre} ${author.Apellido}</li>
        <li class="list-group-item"><span class="fw-bold text-muted">Idioma:</span> ${language.Idioma}</li>
        <li class="list-group-item"><span class="fw-bold text-muted">Fecha de publicación:</span> ${fechaPublicacion}</li>
        <li class="list-group-item"><span class="fw-bold text-muted">Número de Páginas:</span> ${book.NumeroPaginas}</li>
        <li class="list-group-item"><span class="fw-bold text-muted">Precio:</span> ${book.Precio}</li>
    `

    infoCabecera.innerHTML = templateCabecera
    infoDetalle.innerHTML = templateDetalle
}