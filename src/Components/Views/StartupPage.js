import React, { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { apiFetchUser, createNewUser } from '../../api/UserAPI';
import { useUserContext } from '../../context/UserContext';
import LoginForm from '../LoginForm';
import './StartupPage.css'
import WelcomeMessage from '../WelcomeMessage';
import Header from '../Header';

const StartupPage = () => {
  const [user, setUser] = useUserContext()
  const navigator = useNavigate()
  let enteredUsername = ''

  useEffect(() => {

    // localStorage.removeItem('storedUser')

    let storedUser = localStorage.getItem('storedUser')

    if (storedUser) {
      // user is logged in -> update with info from API and redirect to translations page
      setUser(JSON.parse(storedUser))

      apiFetchUser(JSON.parse(storedUser).username)
        .then(response => response[1])
        .then(data => {
          if (JSON.stringify(data) === "[]") {
            // user stored in local storage doesn't exist in API
            localStorage.removeItem('storedUser')
          }
          else {
            localStorage.setItem('storedUser', JSON.stringify(data[0]))
            setUser(data[0])
            navigator('/translation')
          }
        })
    }
  }, []);

  const handleLogin = async (event) => {
    // log in if user already exists, otherwise register new user

    event.preventDefault()

    if (enteredUsername === '') {
      alert("Enter a valid username")
      return;
    }

    apiFetchUser(enteredUsername)
      .then(response => response[1])
      .then(data => {
        if (JSON.stringify(data) === "[]") {
          // user doesn't exist -> register new user

          createNewUser(enteredUsername)
            .then(response => {
              if (!response[0]) {
                return response[1]
              }
              console.error("User could not be created")
              alert("User could not be created")
            })
            .then(newUser => {
              localStorage.setItem('storedUser', JSON.stringify(newUser))
              setUser(newUser)
              navigator('/translation')
            })
        }

        else {
          // user exists -> store user data in state and local storage

          localStorage.setItem('storedUser', JSON.stringify(data[0]))
          setUser(data[0])
          navigator('/translation')
        }
      })
  }

  const handleUsernameChange = (event) => {
    enteredUsername = event.target.value
  }

  return (
    <>
      <Header />
      <WelcomeMessage />
      <LoginForm usernameSubmitted={handleLogin} usernameChange={handleUsernameChange} />
    </>
  );
};

export default StartupPage;