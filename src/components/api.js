export const config = {
    baseUrl: 'https://nomoreparties.co/v1/plus-cohort-25',
    headers: {
        authorization: '332c93e4-69ad-42f7-b47e-3679b262bd10',
        'Content-Type': 'application/json'
    }
}
function checkRes(res) {
    if(res.ok) {
        return res.json();
    } else {
        return Promise.reject(`Ошибка: ${res.status}`);
    }
}

export const profileConfig = (config, nameInput, jobInput) => {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            name: nameInput.value,
            about: jobInput.value
        })
    })
    .then(res => checkRes(res))
}

export const getInitCard = (config) => {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'GET',
        headers: config.headers
    })
    .then(res => checkRes(res))
}

export const postAddCard = (config, element) => {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({
            name: element.name,
            link: element.link,
        })
    })
    .then(res => checkRes(res))
}

export const deleteCard = (config, card) => {
    return fetch(`${config.baseUrl}/cards/${card._id}`, {
        method: 'DELETE',
        headers: config.headers
    })
    .then(res => checkRes(res))
}

export const putLike = (config, card) => {
    return fetch(`${config.baseUrl}/cards/likes/${card._id}`, {
        method: 'PUT',
        headers: config.headers
    })
    .then(res => checkRes(res))
}

export const delLike = (config, card) => {
    return fetch(`${config.baseUrl}/cards/likes/${card._id}`, {
        method: 'DELETE',
        headers: config.headers
    })
    .then(res => checkRes(res))
}

export const editAvatar = (config, avatarEdit) => {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            avatar: avatarEdit.value
        })
    })
    .then(res => checkRes(res))
}