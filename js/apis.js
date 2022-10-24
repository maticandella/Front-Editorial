const getAll = async (apiName) => {
    const response = await fetch('http://localhost:3000/' + apiName, {
            headers: {
                "Authorization": localStorage.getItem("jwt")
            }
    })
    return await response.json()
}

const getById = async (apiName, id) => {
    const response = await fetch('http://localhost:3000/' + apiName + '/' + id, {
            headers: {
                "Authorization": localStorage.getItem("jwt")
            }
    })
    return await response.json()
}

const postObject = async (apiName, object) => {
    const response = await fetch('http://localhost:3000/' + apiName, {
        headers: {
                    "Content-Type": 'application/json', 
                    "Authorization": localStorage.getItem("jwt")},
        method: 'POST',
        body: JSON.stringify(object)
    })
    return response
}
