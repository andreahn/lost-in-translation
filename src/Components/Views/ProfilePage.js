import React, { useEffect, useRef, useState } from 'react';
import { useUserContext } from '../../context/UserContext';
import { apiFetchUser } from '../../api/UserAPI';
import { useNavigate } from 'react-router-dom';
import Header from '../Header';


const ProfilePage = () => {
  const [user, setUser] = useUserContext()
  const [userInfoApi, setUserApi] = useState([])
  const [translations, setTranslations] = useState([])
  const [isDeleted, setDeleted] = useState(false)
  const [startIndex, setStartIndex] = useState(0)
  const navigator = useNavigate()
  let isInitialMount = true
  const [change, setChange] = useState(0)


  // Fetch user-info from API
  const getUserInfo = async (name) => {

    apiFetchUser(name)
    .then(response => response[1])
    .then(data => {
      setUserApi(data[0])
    })
  }

  // Filter translations
  const filterTranslations = (arr) => {
    
    let listItems = [] 
    
    // User has not deleted the log
    // If under 10 item => render all
    // If over 10 items => render the last 10 items in arry
    if(isDeleted === false){
      if(arr.length <= 10) {
        for(let i = 0; i < arr.length; i++) {
          listItems.push(arr[i])
        }
      }
      else {
        listItems = arr.slice(Math.max(arr.length - 10, 1))
      }
    }
    
    // User has deleted the log
    // If sum of all items - start index is less than 10 => render all from start index
    // If sum of all items - start index is greater than 10 => render the last 10 items in arry
    else {
      if((arr.length - startIndex) <= 10) {
        for(let i = startIndex; i < arr.length; i++) {
          listItems.push(arr[i])
        }
      }
      else {
        listItems = arr.slice(Math.max(arr.length - 10, 1))
      }
    }
    
    const test = listItems.map((listItem) => <li key={listItem}>{listItem}</li>)
    setTranslations(test)
  }

  // Delete logg => set deleted boolan to true, update start index to be the last item of array
  const deleteLog = () => {
    setDeleted(true)
    localStorage.setItem('isDeleted', JSON.stringify(true))

    setStartIndex(userInfoApi.translations.length)
    localStorage.setItem('startIndex', JSON.stringify(userInfoApi.translations.length))
    setChange(change + 1)

  }

  // Logout => remove stored user, deleted boolan and start index from local storage
  // Navigate to start page
  const logout = () => {
    localStorage.removeItem('storedUser')
    localStorage.removeItem('isDeleted')
    localStorage.removeItem('startIndex')

    navigator('/')
  }

  // Check if deleted boolan is stored in local storage
  // If so, read value and store in local variable
  // If not, create a new item in local storage
  const getDeleted = () => {
    const isDeletedFromLocalStore = JSON.parse(localStorage.getItem('isDeleted'))

    if(isDeletedFromLocalStore) {
      setDeleted(isDeletedFromLocalStore)
    }
    else {
      localStorage.setItem('isDeleted', JSON.stringify(false))
    }
  }
  
  // Check if start index is stored in local storage
  // If so, read value and store in local variable
  // If not, create a new item in local storage
  const getIndex = () => {
    const getIndexOfTranslations = JSON.parse(localStorage.getItem('startIndex'))
    if(getIndexOfTranslations) {
      setStartIndex(getIndexOfTranslations)
    }
    else {
      localStorage.setItem('startIndex', JSON.stringify(0))
    }
  }

  // Check if initial mount, if so => get stored userinfo from localstorage
  // If not initial mount, but an update on isDeleted variable, render list of translation again
  useEffect(() => {
    if(isInitialMount === true) {
      // localStorage.removeItem('startIndex')
      // localStorage.removeItem('isDeleted')
      const userInfo = JSON.parse(localStorage.getItem('storedUser'))
  
  
      getDeleted()
      getIndex()
      getUserInfo(userInfo.username)
      filterTranslations(userInfo.translations)

      isInitialMount = false

    }
    else {
      getDeleted()
      getIndex()
      filterTranslations(userInfoApi.translations)

    }
  },[change, isDeleted])




  return (
      <main>
      <Header />
        <div>
          <h1>Hello  { userInfoApi.username }</h1>
          <h3> This is your 10 latest translation:</h3>
            {translations}
        </div>
        <div>
          <button onClick={deleteLog}>Delete log</button>
          <button onClick={logout}>Logout</button>
        </div>

      </main>
      
    );
};

export default ProfilePage;
