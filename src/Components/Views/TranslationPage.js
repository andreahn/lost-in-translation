import React, { useEffect, useState } from 'react';
import { useUserContext } from '../../context/UserContext';
import Header from '../Header';
import TranslationForm from '../TranslationForm';
import './TranslationPage.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { addTranslationToUser } from '../../api/UserAPI';

const TranslationPage = () => {
  const [user, setUser] = useUserContext()
  const [translations, setTranslations] = useState([]);
  const navigator = useNavigate();
  let translationInput = '';
  
  // Check whether user is logged in or not, 
  // redirects to start page if not
  useEffect(() => {
    let storedUser = localStorage.getItem('storedUser');
    
    if(!storedUser) {
      navigator('/')
    }
  })
  
  // TODO: Function that translates text and store to api
  // Handle form submission
  const handleTranslation = (event) => {
    let newTranslationsArray = user.translations
    newTranslationsArray.push(translationInput)
    event.preventDefault()
    let translationArray = translationInput.split("");
    if(translationInput != 0) {
      setTranslations(translationArray.map((letter) => <img src={require(`../../assets/individial_signs/${letter}.png`)} alt={letter}/>))
      addTranslationToUser(user.id, newTranslationsArray)
    }
  }
  
  // Handle input
  const handleTranslationChange = (event) => {
    // Bind user input to variable
    translationInput = event.target.value
    // Filter input with RegEx to remove non-alphanumerical values
    translationInput = translationInput.replace(/[^A-Za-z]/gi, '').toLowerCase()
  }


  return (
    <>
      <Header />
      <TranslationForm translationSubmitted={handleTranslation} translationChange={handleTranslationChange} />
      <div id="translation">
            { translations }
      </div>
      <NavLink id="profile" to="/profile">
        <button type="button">
          Profile
        </button>
        
      </NavLink>
    </>
    );
};

export default TranslationPage;