# b2b-react-sample-app

## Getting Started

## Set up
In order to launch this app:

#### 1. Clone the repo 
```
git clone git@github.com:descope-sample-apps/b2b-react-sample-app.git
```

#### 2. Set up Descope environment variables in `.env` file
```
REACT_APP_DESCOPE_PROJECT_ID="YOUR PROJECT ID" // Required for Descope authentication
REACT_APP_DESCOPE_SIGN_IN_FLOW_ID="sign-up-or-in" // Optional, if you would like to use a flow other than sign-up-or-in
REACT_APP_DESCOPE_MANAGEMENT_KEY="YOUR MANAGEMENT KEY" // Optional, if you would like to run E2E tests
DESCOPE_BASE_URL="http://localhost:8000" // Optional, if you would like to use a different base URL
```
_You can get your project-id [here](https://app.descope.com/settings/project)_.
_You can get this flow-id from the Flows page [here](https://app.descope.com/flows)_.


#### 3. Install dependencies 

You can use npm or yarn, but we recommend using yarn. If it isn't already installed on your machine, the instructions on how to do so can be found [here](https://classic.yarnpkg.com/lang/en/docs/install/). After yarn is installed, run this command:
```
yarn install
```

#### 4. Start the app

Run this command to start the app:

```
yarn start
```

#### 5. Open the app
Browse to `http://localhost:3000`

#### Pass attributes from URL search params
1. pass project id, base url, and flow id as search params in the URL
```
// You can pass one or more of the following search params
// project: YOUR_PROJECT_ID
// baseUrl: YOUR_BASE_URL
// flow: YOUR_FLOW_ID
http://localhost:3000/?project=YOUR_PROJECT_ID&baseUrl=YOUR_BASE_URL&flow=YOUR_FLOW_ID
```

2. Pass `AuthProvider` props as search params in the URL 
```
// prefix the prop name with `auth-provider.`
// it will convert prop from kebab-case to camelCase
// e.g. `auth-provider.refresh-cookie-name` will be converted to `refreshCookieName`
// e.g. `auth-provider.persist-tokens` will be converted to `persistTokens`

http://localhost:3000/?auth-provider.refresh-cookie-name=DSR1&auth-provider.persist-tokens=false
```

##### User invitation with Magic Link
This app contains a user invitation route that uses a magic link.
To use it, go to your [project configuration](https://app.descope.com/settings/project) and do the following
 - Set the "User Invitation Redirect URL" to a URL with the path of `auth/invitation` (e.g. `http://localhost:3000/auth/invitation`)
 - Check the Add a "Magic Link token to the invitation link" checkbox, so that the token is sent in the invitation email

## Testing
To run Cypress E2E tests:
```
yarn run cypress open
```

## Other Configuration

### Management Widgets & SSO Setup

To test `Management Widgets` or `SSO Setup` functionality, you'll need to have a user configured with a tenant and the `Tenant Admin` role assigned.


## Learn More
To learn more please see the [Descope Documentation and API reference page](https://docs.descope.com/).

## Contact Us
If you need help you can [contact us](https://docs.descope.com/support/)
