const getAuthors = async () => {
    //Se utiliza para obtener los autores y listarlos
    const contenedorImagenes = document.querySelector('.contenedor-imagenes')
    
    const authors = await getAll("authors")
    //En el siguiente template falta mostrar abajo de la foto de perfil, el nombre del Autor
    const template = author => `
        <img class="img-thumbnail col-md-2 col-sm-3 desvanecer" src="${author.FotoPerfil}" alt="Foto Autor"
        id="${author.IdAutor}">
    `
    contenedorImagenes.innerHTML = authors.map(author => template(author)).join('')

    //Search input
    const inputSearch = document.getElementById("input-search")

    //Con el evento keyup voy obteniendo lo que el usuario va tecleando en el input
    inputSearch.addEventListener('keyup',() => {
        let authorName = ""
        const authorSearch = []
        authors.forEach(author => {
            const valor = inputSearch.value
            authorName = author.Nombre + ' ' + author.Apellido
            const include = authorName.toLowerCase().includes(valor.toLowerCase())
            if (include) {
                authorSearch.push(author)
            }
        })
        
        contenedorImagenes.innerHTML = ""
        const template = authorTemplate => `
        <img class="img-thumbnail col-md-2 col-sm-3" src="${authorTemplate.FotoPerfil}" alt="Foto Autor"
        id="${authorTemplate.IdAutor}">
        `
        contenedorImagenes.innerHTML = authorSearch.map(authorTemplate => template(authorTemplate)).join('')
        redirectAuthorId()
    })
}

const redirectAuthorId = async () => {
    //Se utiliza para cuando el usuario clickea una img, se lo redirecciona al autor indicado 
    //con toda su información
    const imgs = document.querySelectorAll('#contenedor-imgs img')
    imgs.forEach(function(img) {
        img.addEventListener("click", async (e) => {
            //Al hacer click obtengo el Id del Autor para enviar la petición a la API
            const idAutor = e.currentTarget.id
            
            //Redirecciono a book enviando el IdLibro
            window.location.href = `author?idAutor=${idAutor}`
        })
    })
}

const getAuthorById = async (idAutor) => {
    //Envio el Id a la API para que me devuelva el Objeto Autor completo
    const author = await getById("authors", idAutor)

    const authorGet = new AuthorGet()
    authorGet.nombre = author.Nombre
    authorGet.apellido = author.Apellido
    authorGet.fotoPerfil = author.FotoPerfil
    authorGet.idNacionalidad = author.idNacionalidad
    authorGet.nota = author.Nota
    authorGet.urlInstagram = author.UrlInstagram
    authorGet.urlTwitter = author.UrlTwitter
    authorGet.urlFacebook = author.UrlFacebook
    authorGet.urlLinkedin = author.UrlLinkedin
    authorGet.urlWeb = author.UrlWeb
    authorGet.idUsuario = author.IdUsuario

    return authorGet
}

const setTemplatesAuthor = authorGet => {
    //Variables a utilizar para setear propiedades en el HTML
    const infoAuthor = document.getElementById('info-autor')
    const imgPerfil = document.getElementById('img-perfil')

    //Seteo las propiedades en el HTML
    imgPerfil.src = authorGet.fotoPerfil

    // if(authorGet.urlInstagram) {
    //     instagram = `<a href="${authorGet.urlInstagram}"><i class="bi bi-instagram h3 text-danger"></i></a>`
    // }

    var instagram = authorGet.urlInstagram ? `<a href="${authorGet.urlInstagram}"><i class="bi bi-instagram h3 text-danger m-1"></i></a>` : ''
    var twitter = authorGet.urlTwitter ? `<a href="${authorGet.urlTwitter}"><i class="bi bi-twitter h3 text-info m-1"></i></a>` : ''
    var linkedin = authorGet.urlLinkedin ? `<a href="${authorGet.urlLinkedin}"><i class="bi bi-linkedin h3 text-secondary m-1"></i></a>` : ''
    var facebook = authorGet.urlFacebook ? `<a href="${authorGet.urlFacebook}"><i class="bi bi-facebook h3 text-primary m-1"></i></a>` : ''
    var web = authorGet.urlWeb ? `<a href="${authorGet.urlWeb}"><i class="bi bi-browser-chrome h3 text-success m-1"></i></a>` : ''
    
    const templateAuthor = `
        <li class="list-group-item">
            <div class="row">
            <div class="col">
                <h1 class="fs-1">${authorGet.nombre} ${authorGet.apellido}</h1>
                <a class="btn btn-primary" id="btn-modificar" href="#">Modificar</a>
                <a class="btn btn-danger" id="btn-eliminar" href="#">Eliminar</a>
            </div>
            </div>
        </li>
        <li class="list-group-item"><p class="text-secondary">${authorGet.nota}</p></li>
        <div class="m-3">${instagram}${twitter}${linkedin}${facebook}${web}</div>
    `

    infoAuthor.innerHTML = templateAuthor
}

window.onload = async () => {
    const isLoggedIn = checkLogin()
    if (isLoggedIn) {
        await getCategories()
        await getAuthors()
        await redirectAuthorId()
    } else {
        window.location.href = "/login";
    }
}