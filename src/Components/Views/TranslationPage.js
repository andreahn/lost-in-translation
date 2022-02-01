import React, { useEffect, useState } from 'react';
import { useUserContext } from '../../context/UserContext';
import Header from '../Header';
import TranslationForm from '../TranslationForm';
import './TranslationPage.css';
import { useNavigate } from 'react-router-dom';

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
    event.preventDefault()
    let translationArray = translationInput.split("");
    //console.log(translationArray.map((letter) => <img src={require(`../../assets/individial_signs/${letter}.png`)} alt={letter}/>))
    setTranslations(translationArray.map((letter) => <img src={require(`../../assets/individial_signs/${letter}.png`)} alt={letter}/>))
    console.log(translations);
  }
  
  // Handle input
  const handleTranslationChange = (event) => {
    // Bind user input to variable
    translationInput = event.target.value
    // Filter input with RegEx to remove non-alphanumerical values
    translationInput = translationInput.replace(/[^A-Za-z0-9]/gi, '').toLowerCase()
  }


  return (
    <>
      <Header />
      <TranslationForm translationSubmitted={handleTranslation} translationChange={handleTranslationChange} />
      <div id="translation">           
            { translations }   
      </div>
    </>
    );
};

export default TranslationPage;
