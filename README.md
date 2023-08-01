# b2b-react-sample-app

## Getting Started

## Set up
In order to launch this app:

#### 1. Clone the repo 
```
git clone git@github.com:descope-sample-apps/b2c-retail-sample-app.git
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
Browse to `https://localhost:3000`


## Testing
To run Cypress E2E tests:
```
yarn run cypress open
```

## Learn More
To learn more please see the [Descope Documentation and API reference page](https://docs.descope.com/).

## Contact Us
If you need help you can [contact us](https://docs.descope.com/support/)