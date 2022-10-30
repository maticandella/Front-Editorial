let port = 3000 //Puerto de API-Editorial
let hostSplit = window.location.host.split(':')
let host = window.location.protocol + "//" + hostSplit[0] + ":"

const getAll = async (apiName) => {
    const response = await fetch(host + port + '/' + apiName, {
            headers: {
                "Authorization": sessionStorage.getItem("jwt")
            }
    })
    return await response.json()
    //window.location.host VER
}

const getById = async (apiName, id) => {
    const response = await fetch(host + port + '/' + apiName + '/' + id, {
            headers: {
                "Authorization": sessionStorage.getItem("jwt")
            }
    })
    return await response.json()
}

const getByCategorie = async (apiName, idCategorie) => {
    const response = await fetch(host + port + '/' + apiName + '/' + idCategorie, {
            headers: {
                "Authorization": sessionStorage.getItem("jwt")
            }
    })
    return await response.json()
}

const getUserByEmail = async (apiName, email) => {
    const response = await fetch(host + port + '/' + apiName + '/' + email, {
            headers: {
                "Authorization": sessionStorage.getItem("jwt")
            }
    })
    return await response.json()
}

const postObject = async (apiName, object) => {
    const response = await fetch(host + port + '/' + apiName, {
        headers: {
                    "Content-Type": 'application/json', 
                    "Authorization": sessionStorage.getItem("jwt")},
        method: 'POST',
        body: JSON.stringify(object)
    })
    return response
}

const putObject = async (apiName, id, object) => {
    const response = await fetch(host + port + '/' + apiName + '/' + id, {
        headers: {
                    "Content-Type": 'application/json', 
                    "Authorization": sessionStorage.getItem("jwt")},
        method: 'PUT',
        body: JSON.stringify(object)
    })
    return response
}

const deleteObject = async (apiName, id) => {
    const response = await fetch(host + port + '/' + apiName + '/' + id, {
        headers: {
                    "Content-Type": 'application/json', 
                    "Authorization": sessionStorage.getItem("jwt")},
        method: 'DELETE'
    })
    return response
}
