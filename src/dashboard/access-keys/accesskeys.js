import './accesskeys.scss';
import { AccessKeyManagement, useUser } from '@descope/react-sdk';
import React, {useState, useEffect} from 'react';
const AccessKeys = () => {

  const { user } = useUser();


  useEffect(() => {
    if (user) {
      if (user.userTenants.length >= 1) {
        // Automatically select the first tenant if there's more than one
        setSelectedTenantId(user.userTenants[0].tenantId);
      }
    }
  }, [user]);

  // Initialize selectedTenantId as empty and will set it based on user's tenants
  const [selectedTenantId, setSelectedTenantId] = useState('');

  return (
    <div className="data-table-wrapper">
        <div className="accesskeys">
        {<AccessKeyManagement
          widgetId="user-access-key-management-widget"
          tenant={selectedTenantId}
        />}
        </div>
      </div>
  );
};

export default AccessKeys;
