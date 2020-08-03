export const postRequest = (url, body) => {
    return fetch(url, {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        credentials: "same-origin",
        body: JSON.stringify(body)
    });
}

export const getRequest = (url) => {
    return fetch(url, {
        method: 'get',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        credentials: "same-origin"
    });
}