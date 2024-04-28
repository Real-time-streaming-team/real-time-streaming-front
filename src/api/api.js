export const Get = async (url, token) => {
    const header = token ? {Authorization : `Bearer ${token}`} : {}
    const response = await fetch(url, {
        method : 'GET',
        headers : header,
    });
    if(!response.ok) throw new Error(response.status)
    return response.json()
}

export const Post = async (url, body, token) => {
    const header = token ? {Authorization : `Bearer ${token}`} : {}
    const response = await fetch(url, {
        method : 'POST',
        headers : header,
        body : JSON.stringify(body)
    });
    if(!response.ok) throw new Error(response.status)
    return response.json()
}

