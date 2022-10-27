class Book {
    constructor(idCategoria, idAutor, titulo, isbn, fechaPublicacion, 
        nroPaginas, idIdioma, precio, reseña, portada, idUsuario) {
      this.idCategoria = idCategoria
      this.idAutor = idAutor
      this.titulo = titulo
      this.isbn = isbn
      this.fechaPublicacion = fechaPublicacion
      this.numeroPaginas = nroPaginas
      this.idIdioma = idIdioma
      this.precio = precio
      this.resenia = reseña
      this.imagenTapa = portada
      this.idUsuario = idUsuario
    }
};

class BookGet extends Book {
    constructor(categoria, autor, usuario, idioma) {
    super() //Se encarga de llamar al constructor de la clase padre
    this.categoria = categoria
    this.autor = autor
    this.idioma = idioma
    this.idUsuario = usuario
  }
}



