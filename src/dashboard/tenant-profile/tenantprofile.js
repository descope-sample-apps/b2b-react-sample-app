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
        <div
          role="alert"
          style={{
            margin: '16px 0',
            padding: '12px 16px',
            background: '#fff4e5',
            border: '1px solid #ffa940',
            borderRadius: '8px',
            color: '#ad4e00',
            lineHeight: 1.5,
          }}
        >
          <strong>Note:</strong> SSO setup works only with cookie-based sessions where the refresh token is managed in HTTP-only cookies. If refresh tokens are stored in local/session storage, SSO setup will not function.
        </div>
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


