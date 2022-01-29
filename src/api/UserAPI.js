const apiURL = "https://trivia-vue-api.herokuapp.com"
const apiKey = "Hr0Q8UeUONO66F3WZzW5wgmK0XFcE4GJwKL5kMwkG2y5MJ4XSNxOQvZZzWMxeOhk"

export async function apiFetchAllUsers() {
    // fetches all users from API

    try {
        const response = await fetch(`${apiURL}/translations`)
        const data = await response.json()

        return [null, data]
    }
    catch (e){
        return [e.message, []]
    }
}

export async function apiFetchUser(username){
    //fetches user(s) with a given username

    try {
        const response = await fetch(`${apiURL}/translations?username=${username}`)
        const data = await response.json()

        return [null, data]
    }
    catch (e){
        return [e.message, []]
    }
}

export async function createNewUser(username){
    // creates a new user given a username
    // returns new user object if successful

    const requestOptions = {
        method: 'POST',
        headers: {
            'X-API-Key': apiKey,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            translations: []
        })
    }

    try {
        const response = await fetch(`${apiURL}/translations`, requestOptions)
        const data = await response.json()

        return [null, data]
    }
    catch (e){
        return [e.message, []]
    }
}

export async function addTranslationToUser (userID, translations){
    // adds translations to user (given user ID, not username)
    // returns updated user object

    const requestOptions = {
        method: 'PATCH',
        headers: {
            'X-API-Key': apiKey,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            translations: translations
        })
    }


    try {
        const response = await fetch(`${apiURL}/translations/${userID}`, requestOptions)
        const data = await response.json()

        return [null, data]
    }
    catch (e){
        return [e.message, []]
    }
}