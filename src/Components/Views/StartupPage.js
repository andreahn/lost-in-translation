import React, { useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { apiFetchUser, createNewUser } from '../../api/UserAPI';
import { useUserContext } from '../../context/UserContext';

const StartupPage = () => {
  const [user, setUser] = useUserContext()
  const navigator = useNavigate()
  let enteredUsername = ''

  useEffect(() => {

    // localStorage.removeItem('storedUser')

    let storedUser = localStorage.getItem('storedUser')
    // console.log("current stored: " + storedUser)

    if (storedUser){
      // user is logged in -> redirect to translations page
      setUser(JSON.parse(storedUser))
      navigator('/translation')
    }
  });

  const handleLogin = async (event) => {
    // log in if user already exists, otherwise register new user

    event.preventDefault()

    apiFetchUser(enteredUsername)
      .then(response => response[1])
      .then(data => {
        if (JSON.stringify(data) === "[]"){
          // user doesn't exist -> register new user

          createNewUser(enteredUsername)
            .then (response => {
              if (!response[0]){
                return response[1]
              }
              console.error("User could not be created")
              alert("User could not be created")
            })
            .then(newUser => {
              localStorage.setItem('storedUser', JSON.stringify(newUser))
              setUser(newUser)
            })
        }

        else {
          // user exists -> store user data in state and local storage

          localStorage.setItem('storedUser', JSON.stringify(data[0]))
          setUser(data[0])
        }
      })
  }

  const handleUsernameChange = (event) => {
    enteredUsername = event.target.value
  }

  return (
    <>On startup page: {JSON.stringify(user)} ... {user.username} 
    <div>
      <form onSubmit={ handleLogin }>
        <input type="text" onChange={handleUsernameChange} />
        <button type="submit">Login</button>
      </form>
    </div>
    </>
    );
};

export default StartupPage;