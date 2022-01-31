import React, { useEffect, useRef, useState } from 'react';
import { useUserContext } from '../../context/UserContext';
import { apiFetchUser } from '../../api/UserAPI';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const [user, setUser] = useUserContext()

  const [translations, setTranslations] = useState([])
  const [deleted, setDeleted] = useState('')
  const [deletedOnIndex, setDeletedOnIndex] = useState(0)
  let isInitialMount = useRef(true)
  const navigator = useNavigate()


  const getUserInfo = async () => {
    apiFetchUser('dewaldels')
    .then(response => response[1])
    .then(data => {
      setUser(data[0])
      filterTranslations(data[0].translations)

    })
  }

  const filterTranslations = (arr) => {

    let tmp = [] 
    console.log(deleted)

    if(deleted === 'false'){
      if(arr.length <= 10) {
        for(let i = 0; i < arr.length; i++) {
          tmp.push(arr[i])
        }
      }

      else {
        tmp = arr.slice(Math.max(arr.length - 10, 1))
      }
    }
    else {

      if((arr.length - deletedOnIndex) <= 10) {
        console.log('aaaa is ', arr.length)
        for(let i = deletedOnIndex; i < arr.length; i++) {
          tmp.push(arr[i])
        }
      }
      
      else {
        tmp = arr.slice(Math.max(arr.length - 10, 1))
      }
    }
      
    setTranslations(tmp)

  }
  
  useEffect(() => {
    
    // localStorage.setItem('isDeleted', JSON.stringify(false))
    // localStorage.removeItem('isDeleted')
    // localStorage.removeItem('startIndex')


    if(isInitialMount) {
      let tmp = localStorage.getItem('storedUser')
      tmp = JSON.parse(tmp)
      setUser(tmp)

      const tmp2 = localStorage.getItem('isDeleted')
      if(tmp2) {
        setDeleted(tmp2)
      }
      else {
        localStorage.setItem('isDeleted', JSON.stringify(false))
        const tmp3 = localStorage.getItem('isDeleted')
        setDeleted(tmp3)

      }

      const indexNum = localStorage.getItem('startIndex')
      if(indexNum) {
        setDeletedOnIndex(indexNum)
      }
      
      getUserInfo()
      isInitialMount = false

    }
    else {
      filterTranslations(user.translations)
    }
  }, [deleted])


  const logout = () => { 
    localStorage.removeItem('storedUser')
    localStorage.removeItem('isDeleted')
    setDeleted('true')


    navigator('/')
  }
  
  const deleteLog = () => {
    localStorage.setItem('isDeleted', JSON.stringify(true))
    localStorage.setItem('startIndex', user.translations.length)


    setDeleted('true')
  }

 
  return (
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
