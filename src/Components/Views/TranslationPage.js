import React from 'react';
import { useUserContext } from '../../context/UserContext';

const TranslationPage = () => {
  const [user, setUser] = useUserContext()

  return (
    <>On translation page: {user.username} </>
    );
};

export default TranslationPage;
