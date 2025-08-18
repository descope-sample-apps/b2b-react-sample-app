import React, { useEffect, useMemo, useState } from 'react';
import { TenantProfile, useSession, useUser } from '@descope/react-sdk';

const TenantProfilePage = () => {
  const { user, isUserLoading } = useUser();
  const { isSessionLoading } = useSession();

  const tenantAdminRelatedTenants = useMemo(() => {
    return user?.userTenants.filter((tenant) => {
      return tenant.roleNames.includes('Tenant Admin');
    });
  }, [user?.userTenants]);

  const [selectedTenantId, setSelectedTenantId] = useState('');

  useEffect(() => {
    if (user && tenantAdminRelatedTenants && tenantAdminRelatedTenants.length >= 1) {
      setSelectedTenantId(tenantAdminRelatedTenants[0].tenantId);
    }
  }, [user, tenantAdminRelatedTenants]);

  if (isUserLoading || isSessionLoading) {
    return null;
  }

  const handleTenantChange = (event) => {
    setSelectedTenantId(event.target.value);
  };

  if (isUserLoading || selectedTenantId === '') {
    return <div>Loading...</div>;
  }

  return (
    <div className="data-table-wrapper">
      <div style={{ margin: 'auto', maxWidth: 'auto', borderRadius: '10px', overflow: 'hidden', width: '100%' }}>
        {user && user.userTenants && user.userTenants.length > 1 && (
          <div style={{ margin: '20px 0' }}>
            <label htmlFor="tenantSelect">Select Tenant: </label>
            <select id="tenantSelect" value={selectedTenantId} onChange={handleTenantChange}>
              {tenantAdminRelatedTenants.map((tenant) => (
                <option key={tenant.tenantId} value={tenant.tenantId}>
                  {tenant.tenantName}
                </option>
              ))}
            </select>
          </div>
        )}

        <TenantProfile key={selectedTenantId} widgetId="tenant-profile-widget" tenant={selectedTenantId} />
      </div>
    </div>
  );
};

export default TenantProfilePage;


