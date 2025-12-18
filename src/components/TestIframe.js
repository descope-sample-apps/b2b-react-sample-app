import logo from '../logo.svg';
import '../App.scss';
import { useDescope, Descope, useSession, useUser } from '@descope/react-sdk';
import { Navigate, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

function ProtectedRoute({ children }) {
  const { isAuthenticated, isSessionLoading } = useSession();

  if (isSessionLoading) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? children : <Navigate to="/" replace />;
}

function ProtectedPage() {
  const { user } = useUser();
  const sdk = useDescope();

  const handleLogout = () => {
    sdk.logout();
  };

  const handleSwitchTenant = async () => {
    const tenant = await sdk.selectTenant('xxx');
    await sdk.refresh();
    console.log('Selected tenant:', tenant);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h2>Protected Page</h2>
        <p>Welcome, {user?.name || user?.email || 'User'}!</p>
        <button onClick={handleLogout}>Logout</button>
        <button onClick={handleSwitchTenant}>Switch Tenant</button>
        <Link to="/">Home</Link>
      </header>
      <div>
        <Descope 
        flowId='sign-up-or-in'
          onSuccess={(e) => {
            console.log('Protected flow success:', e);
          }}
          onError={(e) => console.log('Protected flow error:', e)}
        />
      </div>
    </div>
  );
}

// Silent callback handler for the iframe
function SilentCallback() {
  useEffect(() => {
    // This page is loaded in an iframe and will send the auth result to the parent
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const error = urlParams.get('error');
    const state = urlParams.get('state');
    
    console.log('SilentCallback loaded:', { code, error, state, isIframe: window.parent !== window });
    
    if (window.parent !== window) {
      // Send message to parent window
      const message = {
        type: 'silent-auth-result',
        code,
        error,
        state,
        url: window.location.href
      };
      
      console.log('Sending message to parent:', message);
      window.parent.postMessage(message, window.location.origin);
    }
  }, []);

  return null; // Return null instead of div to avoid any rendering issues
}

function TestIframe() {
  const sdk = useDescope();
  const { isAuthenticated, isSessionLoading } = useSession();
  const [silentAuthChecked, setSilentAuthChecked] = useState(false);
  const [silentAuthStatus, setSilentAuthStatus] = useState(null);

  // Silent authentication check using iframe for OIDC federation
  useEffect(() => {
    const checkSilentAuth = async () => {
      try {
        console.log('Starting silent authentication check with iframe...');
        
        // Set up message listener for iframe response BEFORE creating iframe
        const messageHandler = async (event) => {
          console.log('Message received:', event.data, 'from origin:', event.origin);
          
          if (event.origin !== window.location.origin) {
            console.log('Ignoring message from different origin');
            return;
          }
          
          if (event.data.type === 'silent-auth-result') {
            console.log('Silent auth result received:', event.data);
            
            // Clean up
            const iframe = document.getElementById('silent-auth-iframe');
            if (iframe && iframe.parentNode) {
              document.body.removeChild(iframe);
            }
            window.removeEventListener('message', messageHandler);
            
            if (event.data.code) {
              // Exchange code for token using Descope SDK
              try {
                console.log('Exchanging code for token...');
                // Use Descope's OAuth exchange method
                await sdk.oauth.exchange(event.data.code);
                setSilentAuthStatus('User authenticated via custom domain');
                console.log('Silent auth successful - user is logged in');
              } catch (error) {
                console.log('Failed to exchange code:', error);
                setSilentAuthStatus('No existing session found');
              }
            } else if (event.data.error) {
              console.log('Silent auth returned error:', event.data.error);
              setSilentAuthStatus('No existing session found');
            }
            
            setSilentAuthChecked(true);
          }
        };
        
        window.addEventListener('message', messageHandler);
        console.log('Message listener added');
        
        // Create hidden iframe for silent auth
        const iframe = document.createElement('iframe');
        iframe.style.display = 'none';
        iframe.id = 'silent-auth-iframe';
        
        const projectId = 'Puse136yK1TiyR4tmmaVToRDQs9icEIl';
        const customDomain = 'https://auth.reuven.descope.org';
        const redirectUri = `${window.location.origin}/silent-callback`;
        
        // Use simple dummy state value
        const state = 'silent-auth-state';
        
        // Construct OIDC authorization URL with prompt=none for silent auth
        const authUrl = `${customDomain}/oauth2/v1/authorize?` +
          `response_type=code` +
          `&client_id=${projectId}` +
          `&redirect_uri=${encodeURIComponent(redirectUri)}` +
          `&state=${state}` +
          `&prompt=none` +
          `&scope=openid profile email`;
        
        console.log('Silent auth URL:', authUrl);
        
        // Set timeout in case iframe doesn't respond
        setTimeout(() => {
          if (!silentAuthChecked) {
            console.log('Silent auth timed out');
            window.removeEventListener('message', messageHandler);
            const iframe = document.getElementById('silent-auth-iframe');
            if (iframe && iframe.parentNode) {
              document.body.removeChild(iframe);
            }
            setSilentAuthStatus('Silent auth timeout');
            setSilentAuthChecked(true);
          }
        }, 10000); // 10 seconds timeout
        
        // Add iframe to page and start silent auth
        document.body.appendChild(iframe);
        console.log('Iframe added to page, loading URL...');
        iframe.src = authUrl;
        
      } catch (error) {
        console.error('Silent auth error:', error);
        setSilentAuthStatus('Silent auth failed');
        setSilentAuthChecked(true);
      }
    };

    // Only run silent auth check once on mount and if not already authenticated
    if (!isSessionLoading && !silentAuthChecked && !isAuthenticated) {
      checkSilentAuth();
    } else if (!isSessionLoading && (isAuthenticated || silentAuthChecked)) {
      setSilentAuthChecked(true);
      if (isAuthenticated) {
        setSilentAuthStatus('User already authenticated');
      }
    }
  }, [sdk, isSessionLoading, silentAuthChecked, isAuthenticated]);

  const runSSO = async () => {
    const d = await sdk.saml.start('descope.com', 'http://localhost:3000');
    window.location.href = d.data.url;
  };

  // Show loading state during silent auth check
  if (!silentAuthChecked) {
    return (
      <div className="App">
        <header className="App-header">
          <p>Checking authentication via custom domain...</p>
        </header>
      </div>
    );
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        {silentAuthStatus && (
          <p style={{ fontSize: '14px', color: isAuthenticated ? '#4CAF50' : '#FFC107' }}>
            Silent Auth Status: {silentAuthStatus}
          </p>
        )}
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      {isAuthenticated && (
        <div>
          <Link to="/protected">Go to Protected Page</Link>
        </div>
      )}
      <div>
        <Descope flowId='sign-up-or-in'
        form={{'application':'5ers'}}
        onSuccess={(e) => {
          console.log('success!!!:', e);
          
        }}
        onError={(e) => console.log('error!!!:', e)}
        >
        </Descope>
      </div>
      <button onClick={runSSO}>Run SSO</button>
    </div>
  );
}

export { TestIframe, SilentCallback, ProtectedPage, ProtectedRoute };
export default TestIframe;
