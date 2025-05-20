import './widgets.scss';
import { UserManagement, RoleManagement, AccessKeyManagement, useUser, useSession } from '@descope/react-sdk';
import React, { useState, useEffect, useMemo } from 'react';

const Widgets = () => {
  const { user, isUserLoading } = useUser();
  const { isSessionLoading } = useSession();


  const tenantAdminRelatedTenants = useMemo(() => {
    return user?.userTenants.filter((tenant)=> {
      if (tenant.roleNames.includes("Tenant Admin")) return tenant
  })
  }, [user?.userTenants])
  
  const [activeTab, setActiveTab] = useState('tab1');
  // Initialize selectedTenantId as empty and will set it based on user's tenants
  const [selectedTenantId, setSelectedTenantId] = useState('');

  useEffect(() => {
    if (user && tenantAdminRelatedTenants) {
      if (user.userTenants.length >= 1) {
        // Automatically select the first tenant if there's more than one
        setSelectedTenantId(tenantAdminRelatedTenants[0].tenantId);
      }
    }
  }, [user]); // Depend on user to auto-select the first tenant on load


  if (isUserLoading || isSessionLoading) {
    return null;
  }

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleTenantChange = (event) => {
    setSelectedTenantId(event.target.value);
  };

  const getTabButtonStyle = (tabName) => ({
    flex: 1,
    cursor: 'pointer',
    padding: '10px 20px',
    border: 'none',
    borderBottom: activeTab === tabName ? '3px solid #007bff' : '3px solid transparent',
    background: '#f0f0f0',
    color: '#333',
    outline: 'none',
    transition: 'background-color 0.3s',
    ':hover': {
      background: '#e0e0e0',
    },
  });

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
              {tenantAdminRelatedTenants.map((tenant) => (
                <option key={tenant.tenantId} value={tenant.tenantId}>
                  {tenant.tenantName}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="tabs" style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '20px' }}>
          <button style={getTabButtonStyle('tab1')} onClick={() => handleTabChange('tab1')}>User Management</button>
          <button style={getTabButtonStyle('tab2')} onClick={() => handleTabChange('tab2')}>Role Management</button>
          <button style={getTabButtonStyle('tab3')} onClick={() => handleTabChange('tab3')}>Access Key Management</button>
        </div>

        {/* Keying the tab content with selectedTenantId to force re-render upon tenant change */}
        {activeTab === 'tab1' && (
          <UserManagement key={selectedTenantId} widgetId="user-management-widget" tenant={selectedTenantId} />
        )}
        {activeTab === 'tab2' && (
          <RoleManagement key={selectedTenantId} widgetId="role-management-widget" tenant={selectedTenantId} />
        )}
        {activeTab === 'tab3' && (
          <AccessKeyManagement key={selectedTenantId} widgetId="access-key-management-widget" tenant={selectedTenantId} />
        )}
      </div>
    </div>
  );
};

export default Widgets;