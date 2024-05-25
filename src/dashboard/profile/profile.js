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
      <div style={{ margin: 'auto', maxWidth: '450px', borderRadius: "10px", overflow: "hidden", width: "100%" }}>
        <div className='profile'>
        {<UserProfile
          widgetId="user-profile-widget"
          onLogout={logoutUser}/>}
        </div>
      </div>
    </div>
  );
};

export default Profile;
