import React from 'react';
import { useUserContext } from '../../context/UserContext';

const StartupPage = () => {
  const [user, setUser] = useUserContext()

  return (
    <>On startup page: {user.username} </>
    );
};

export default StartupPage;
