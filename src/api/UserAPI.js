const apiURL = "https://trivia-vue-api.herokuapp.com"
const apiKey = "Hr0Q8UeUONO66F3WZzW5wgmK0XFcE4GJwKL5kMwkG2y5MJ4XSNxOQvZZzWMxeOhk"

export function apiFetchAllUsers() {
    // fetches all users from API

    fetch(`${apiURL}/translations`)
        .then(response => response.json())
        .then(results => {
            return [null, results]
        })
        .catch(error => {
            return [error.message,[]]
        })
}

export function apiFetchUser(username){
    //fetches user(s) with a given username

    fetch(`${apiURL}/translations?username=${username}`)
        .then(response => response.json())
        .then(results => {
            return [null, results]
        })
        .catch(error => {
            return [error.message,[]]
        })
}

export function createNewUser(username){
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

    fetch(`${apiURL}/translations`, requestOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error('Could not create new user')
            }
            return response.json()
        })
        .then(newUser => {
            return [null, newUser]
        })
        .catch(error => {
            return [error.message, []]
        })
}

export function addTranslationToUser (userID, translations){
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

    fetch(`${apiURL}/translations/${userID}`, requestOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error('Could not update translations history')
            }
            return response.json()
        })
        .then(updatedUser => {
            return [null, updatedUser]
        })
        .catch(error => {
            return [error.message, []]
        })

}