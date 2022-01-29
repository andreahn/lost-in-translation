import React, { useEffect, useState } from 'react';
import { useUserContext } from '../../context/UserContext';
import { apiFetchUser } from '../../api/UserAPI';

const ProfilePage = () => {
  // const [user, setUser] = useUserContext()
  const [user, setUser] = useState({})


  const getUserInfo = async () => {
    const userInfo = await apiFetchUser('dewaldels')
    setUser(userInfo)
    console.log(userInfo)

  }
  
  useEffect(() => {
    getUserInfo()
  }, [])

  return (
    // <>On profile page: {user.username} </>
    <main>
      <div>
        <h1>Hello</h1>
      </div>
    </main>
    );
};

export default ProfilePage;
