import logo from '../logo.svg';
import '../App.scss';
import { useDescope, Descope, useSession, useUser } from '@descope/react-sdk';
import { Navigate, Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

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

function generateCodeVerifier() {
  const array = new Uint8Array(96);
  crypto.getRandomValues(array);
  return btoa(String.fromCharCode(...array))
    .replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
}

async function generateCodeChallenge(verifier) {
  const data = new TextEncoder().encode(verifier);
  const digest = await crypto.subtle.digest('SHA-256', data);
  return btoa(String.fromCharCode(...new Uint8Array(digest)))
    .replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
}


function TestIframe() {
  const sdk = useDescope();
  const [silentAuthChecked, setSilentAuthChecked] = useState(false);
  const silentAuthCheckedRef = useRef(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [silentAuthStatus, setSilentAuthStatus] = useState(null);

  useEffect(() => {
    if (silentAuthCheckedRef.current) return;
    silentAuthCheckedRef.current = true;

    let activeMessageHandler = null;

    const cleanup = () => {
      if (activeMessageHandler) {
        window.removeEventListener('message', activeMessageHandler);
        activeMessageHandler = null;
      }
      const iframe = document.getElementById('silent-auth-iframe');
      if (iframe && iframe.parentNode) document.body.removeChild(iframe);
      sessionStorage.removeItem('silent-auth-state');
    };

    const checkSilentAuth = async () => {
      const state = generateCodeVerifier();
      const codeChallenge = await generateCodeChallenge(state);
      sessionStorage.setItem('silent-auth-state', state);

      const done = (status, authenticated = false) => {
        cleanup();
        setIsAuthenticated(authenticated);
        setSilentAuthStatus(status);
        setSilentAuthChecked(true);
      };

      const projectId = 'Puse136yK1TiyR4tmmaVToRDQs9icEIl';
      const customDomain = 'https://auth.reuven.descope.org';

      const messageHandler = async (event) => {
        if (event.origin !== window.location.origin) return;
        if (event.data.type !== 'silent-auth-result') return;

        const expectedState = sessionStorage.getItem('silent-auth-state');
        sessionStorage.removeItem('silent-auth-state');
        if (event.data.state !== expectedState) {
          console.log('Silent auth: state mismatch, ignoring');
          return;
        }

        if (event.data.code) {
          try {
            const tokenUrl = `${customDomain}/oauth2/v1/token`;
            const tokenData = {
              grant_type: 'authorization_code',
              code: event.data.code,
              client_id: projectId,
              code_verifier: expectedState,
            };
            const res = await fetch(tokenUrl, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(tokenData),
            });
            const data = await res.json();
            if (res.ok) {
              console.log('Silent auth: exchange success', data);
              done('Authenticated via custom domain', true);
            } else {
              console.log('Silent auth: exchange failed', res.status, data);
              done('No existing session');
            }
          } catch (err) {
            console.log('Silent auth: exchange error', err);
            done('No existing session');
          }
        } else {
          done('No existing session');
        }
      };

      activeMessageHandler = messageHandler;
      window.addEventListener('message', messageHandler);

      const iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      iframe.id = 'silent-auth-iframe';
      const redirectUri = `${window.location.origin}/silent-callback`;

      iframe.src = `${customDomain}/oauth2/v1/authorize?` +
        `response_type=code` +
        `&client_id=${projectId}` +
        `&redirect_uri=${encodeURIComponent(redirectUri)}` +
        `&oidc_error_redirect_uri=${encodeURIComponent(redirectUri)}` +
        `&state=${state}` +
        `&code_challenge=${codeChallenge}` +
        `&code_challenge_method=S256` +
        `&prompt=none` +
        `&scope=openid profile email`;

      document.body.appendChild(iframe);

      setTimeout(() => {
        if (activeMessageHandler) done('Silent auth timeout');
      }, 10000);
    };

    checkSilentAuth().catch((err) => {
      console.error('Silent auth error:', err);
      cleanup();
      setSilentAuthStatus('Silent auth failed');
      setSilentAuthChecked(true);
    });

    return cleanup;
  }, [sdk]);

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
