import React, { useEffect, useState } from 'react';
import { useUserContext } from '../../context/UserContext';
import { apiFetchUser } from '../../api/UserAPI';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const [user, setUser] = useUserContext()
  const [translations, setTranslations] = useState([])
  const [deleted, setDeleted] = useState(false)
  const [deletedOnIndex, setDeletedOnIndex] = useState(0)
  const navigator = useNavigate()


  const getUserInfo = async () => {
    apiFetchUser('dewaldels')
    .then(response => response[1])
    .then(data => {
      setUser(data[0])
      filterTranslations(data[0].translations)

      const isDeleted = localStorage.getItem('isDeleted')
      if(isDeleted) {
        localStorage.setItem('isDeleted', true)
        setDeleted(true)
      }
    })
  }

  const filterTranslations = (arr) => {

    let isDeleted = false
    if(localStorage.getItem('isDeleted')) {
      isDeleted = true
    }
  

    let tmp = []
    if(isDeleted === true) {
      let startIndex = deletedOnIndex
      if(arr.length - startIndex <= 10) {
        for(let i = startIndex; i < arr.length; i++) {
          tmp.push(arr[i])
        }
      }
      else {
        for(let i = arr.length % 10 ; i < arr.length; i++) {
          tmp.push(arr[i])
        }
      }
      setTranslations(tmp)
      setDeletedOnIndex(tmp.length)
    }
    else {
      if(arr.length <= 10) {
        for(let i = 0; i < arr.length; i++) {
          tmp.push(arr[i])
        }
      }
      else {
        for(let i = arr.length % 10 ; i < arr.length; i++) {
          tmp.push(arr[i])
        }
      }
      setTranslations(tmp)
      setDeletedOnIndex(tmp.length)
    }
  }
  
  useEffect(() => {
    let storedUser = localStorage.getItem('storedUser')
    console.log(storedUser)
    // localStorage.removeItem('isDeleted')

    getUserInfo()
  }, [])

  useEffect(() => {
    localStorage.setItem('isDeleted', true)
    filterTranslations(user.translations)
  }, [deleted])


  const logout = () => { 
    localStorage.removeItem('storedUser')
    localStorage.removeItem('isDeleted')
    setDeleted(false)

    navigator('/')
  }
  
  const deleteLog = () => {
    setDeleted(true)
  }

 
  return (
    // <>On profile page: {user.username} </>
    <main>
      <div>
        <h1>Hello  { user.username }</h1>
        <h3> This is your 10 latest translation:</h3>
          {translations}
      </div>
      <div>
        <button onClick={deleteLog}>Delete log</button>
      </div>
      <div>
        <button onClick={logout}>Logout</button>
      </div>
    </main>
    );
};

export default ProfilePage;
