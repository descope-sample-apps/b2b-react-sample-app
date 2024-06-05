import './profile.scss';
import { UserProfile, useDescope } from '@descope/react-sdk';
import React, {useCallback} from 'react';
const Profile = () => {
  const { logout } = useDescope();
  
  const logoutUser = useCallback(async () => {
    logout();
  }, [logout]);


  return (
    <div className="data-table-wrapper">
        <div className="profile">
        {<UserProfile
          widgetId="user-profile-widget"
          onLogout={logoutUser}/>}
        </div>
    </div>
  );
};

export default Profile;
