class Author {
    constructor(nombre, apellido, idNacionalidad, nota, urlInstagram, 
      urlFacebook, urlLinkedin, urlTwitter, urlWeb , idUsuario, fotoPerfil) {
    this.nombre = nombre
    this.apellido = apellido
    this.idNacionalidad = idNacionalidad
    this.nota = nota
    this.urlInstagram = urlInstagram
    this.urlTwitter = urlTwitter
    this.urlFacebook = urlFacebook
    this.urlLinkedin = urlLinkedin
    this.urlWeb = urlWeb
    this.idUsuario = idUsuario
    this.fotoPerfil = fotoPerfil
  }
};

class AuthorGet extends Author {
    constructor(idAutor) {
    super() //Se encarga de llamar al constructor de la clase padre
    this.idAutor = idAutor
  }
}