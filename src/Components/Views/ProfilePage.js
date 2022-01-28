import React from 'react';
import { useUserContext } from '../../context/UserContext';

const ProfilePage = () => {
  const [user, setUser] = useUserContext()

  return (
    <>On profile page: {user.username} </>
    );
};

export default ProfilePage;
