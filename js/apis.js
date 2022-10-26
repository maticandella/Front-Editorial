const getAll = async (apiName) => {
    const response = await fetch('http://localhost:3000/' + apiName, {
            headers: {
                "Authorization": sessionStorage.getItem("jwt")
            }
    })
    return await response.json()
}

const getById = async (apiName, id) => {
    const response = await fetch('http://localhost:3000/' + apiName + '/' + id, {
            headers: {
                "Authorization": sessionStorage.getItem("jwt")
            }
    })
    return await response.json()
}

const getUserByEmail = async (apiName, email) => {
    const response = await fetch('http://localhost:3000/' + apiName + '/' + email, {
            headers: {
                "Authorization": sessionStorage.getItem("jwt")
            }
    })
    return await response.json()
}

const postObject = async (apiName, object) => {
    const response = await fetch('http://localhost:3000/' + apiName, {
        headers: {
                    "Content-Type": 'application/json', 
                    "Authorization": sessionStorage.getItem("jwt")},
        method: 'POST',
        body: JSON.stringify(object)
    })
    return response
}
