import './accesskeys.scss';
import { AccessKeyManagement, useSession, useUser } from '@descope/react-sdk';
import React, {useState, useEffect} from 'react';
const AccessKeys = () => {

  const { user, isUserLoading } = useUser();
  const { isSessionLoading } = useSession();

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


  const handleTenantChange = (event) => {
    setSelectedTenantId(event.target.value);
  };

  if (isUserLoading || isSessionLoading) {
    return null;
  }

  if (isUserLoading || selectedTenantId === '') {
      return <div>Loading... check user's tenant association.</div>;
  }


  return (
    <div className="data-table-wrapper">
      <div style={{ margin: 'auto', maxWidth: 'auto', borderRadius: '10px', overflow: 'hidden', width: '100%' }}>
        {/* Conditionally render the select dropdown if there are multiple tenants */}
        {user && user.userTenants && (
          <div style={{ margin: '20px 0' }}>
            <label htmlFor="tenantSelect">Select Tenant: </label>
            <select id="tenantSelect" value={selectedTenantId} onChange={handleTenantChange}>
              {/* Map through all tenants for selection options */}
              {user.userTenants.map((tenant) => (
                <option key={tenant.tenantId} value={tenant.tenantId}>
                  {tenant.tenantName}
                </option>
              ))}
            </select>
          </div>
        )}
        <div className="accesskeys">
        {<AccessKeyManagement
          widgetId="user-access-key-management-widget"
          tenant={selectedTenantId}
        />}
        </div>
      </div>
      </div>
  );
};

export default AccessKeys;
