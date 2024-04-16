import './audit.scss';
import { AuditManagement, useUser } from '@descope/react-sdk';
import React, { useState, useEffect } from 'react';

const Audit = () => {
  const { user, isUserLoading } = useUser();
  
  // Initialize selectedTenantId as empty and will set it based on user's tenants
  const [selectedTenantId, setSelectedTenantId] = useState('');

  useEffect(() => {
    if (user && user.userTenants) {
      if (user.userTenants.length >= 1) {
        // Automatically select the first tenant if there's more than one
        setSelectedTenantId(user.userTenants[0].tenantId);
      }
    }
  }, [user]); // Depend on user to auto-select the first tenant on load

  const handleTenantChange = (event) => {
    setSelectedTenantId(event.target.value);
  };

  if (isUserLoading || selectedTenantId === '') {
    return <div>Loading...</div>;
  }

  return (
    <div className="data-table-wrapper">
      <div style={{ margin: 'auto', maxWidth: 'auto', borderRadius: '10px', overflow: 'hidden', width: '100%' }}>
        {/* Conditionally render the select dropdown if there are multiple tenants */}
        {user && user.userTenants && user.userTenants.length > 1 && (
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

        {(
          <AuditManagement key={selectedTenantId} widgetId="audit-management-widget" tenant={selectedTenantId} />
        )}
      </div>
    </div>
  );
};

export default Audit;