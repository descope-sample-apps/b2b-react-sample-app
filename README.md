# b2b-react-sample-app

## Getting Started

## Set up
In order to launch this app:

#### 1. Clone the repo 
```
git clone git@github.com:descope-sample-apps/b2c-retail-sample-app.git
```

#### 2. Set up environment variables in `.env` file

Create a .env file, in the main root directory, and include your project ID. This is mandatory.

```
REACT_APP_DESCOPE_PROJECT_ID="YOUR PROJECT ID"
```

If you would like to use a different flow, other than sign-up-or-in, or a different base_url (**OPTIONAL**)

```
DESCOPE_BASE_URL="http://localhost:8000"
REACT_APP_DESCOPE_SIGN_IN_FLOW_ID="sign-up-or-in" // You can get this flow-id from the Flows page in the Descope Console
```

#### 3. Install dependencies 
```
npm i
```
#### 4. Start the app
```
npm run start
```

#### 5. Open the app
Browse to `https://localhost:3000`

## Learn More
To learn more please see the [Descope Documentation and API reference page](https://docs.descope.com/).

## Contact Us
If you need help you can [contact us](https://docs.descope.com/support/)