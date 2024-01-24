//
// cypress/support/commands.js
//

const projectId = Cypress.env('descope_project_id')
const managementKey = Cypress.env('descope_management_key')
const descopeAPIDomain = "api.descope.com"

// Define the authorization header
const authHeader = {
    'Authorization': `Bearer ${projectId}:${managementKey}`,
}

// Define the base URL for Descope API
const descopeApiBaseURL = `https://${descopeAPIDomain}/v1`;

const testUserLoginId = "testUser" + Math.floor(1000 + Math.random() * 9000) + "@gmail.com"; // Must match email to pass validation

// Define the test user details
const testUser = {
    loginId: testUserLoginId,
    email: testUserLoginId,
    phone: "+11231231234",
    verifiedEmail: true,
    verifiedPhone: true,
    displayName: "Test User",
    test: true,
}

// Add the loginViaDescopeAPI command
Cypress.Commands.add('loginViaDescopeAPI', () => {
    cy.request({
        method: 'POST',
        url: `${descopeApiBaseURL}/mgmt/user/create`,
        headers: authHeader,
        body: testUser,
    })
        .then(({ body }) => {
            const loginId = body["user"]["loginIds"][0];
            cy.request({
                method: 'POST',
                url: `${descopeApiBaseURL}/mgmt/tests/generate/otp`,
                headers: authHeader,
                body: {
                    "loginId": loginId,
                    "deliveryMethod": "email"
                }
            })
                .then(({ body }) => {
                    const otpCode = body["code"]
                    cy.request({
                        method: 'POST',
                        url: `${descopeApiBaseURL}/auth/otp/verify/email`,
                        headers: authHeader,
                        body: {
                            "loginId": loginId,
                            "code": otpCode
                        }
                    })
                        .then(({ body }) => {
                            const sessionJwt = body["sessionJwt"]
                            const refreshJwt = body["refreshJwt"]

                            /** Default name for the session cookie name / local storage key */
                            const SESSION_TOKEN_KEY = 'DS';
                            /** Default name for the refresh local storage key */
                            const REFRESH_TOKEN_KEY = 'DSR';

                            // // Store the JWT in the browser's local storage.
                            cy.window().then((win) => {
                                win.localStorage.setItem(SESSION_TOKEN_KEY, sessionJwt);
                                win.localStorage.setItem(REFRESH_TOKEN_KEY, refreshJwt);
                            });

                            // // Now navigate to the root URL of your application.
                            cy.visit('/')

                        })
                })
        })
})

Cypress.Commands.add('loginViaDescopeUI', () => {
    cy.request({
        method: 'POST',
        url: `${descopeApiBaseURL}/mgmt/user/create`,
        headers: authHeader,
        body: testUser,
    })
        .then(({ body }) => {
            const loginId = body["user"]["loginIds"][0];
            cy.request({
                method: 'POST',
                url: `${descopeApiBaseURL}/mgmt/tests/generate/enchantedlink`,
                headers: authHeader,
                body: {
                    "loginId": loginId,
                    "deliveryMethod": "email"
                }
            })
                .then(({ body }) => {
                    const token = body["link"].split('t=')[1]
                    const pendingRef = body["pendingRef"]
                    cy.log(pendingRef)
                    cy.log(token)


                    // Get the host, execution ID, and step ID from manually going through the flow in your browser
                    // http://localhost:3000/?descope-login-flow=sign-up-or-in%7C%23%7C2bBtkd7nNhiEWbDLaMLyMMKLgz7_14.end-2bBtkZSoriDJyqk6GVAee7MGSKJ&t=eb58e881ab2e22d3b534ae498c012699f11e2c3a3989e564e7d641c117141bdc

                    const executionId = "sign-up-or-in%7C%23%7C2bBtkd7nNhiEWbDLaMLyMMKLgz7"
                    const stepId = "14.end"

                    const host = 'http://localhost:3000/'
                    const enchantedLink = host + '?descope-login-flow=' + executionId + "_" + stepId + "-" + pendingRef + '&t=' + token;
              
                    cy.visit('/')

                    // Close modal
                    cy.get('.ant-modal-close').click()

                    cy.get('descope-wc')
                        .find('input')
                        .type(loginId)
                                            
                    cy.get('descope-wc')
                        .find('.descope-button').contains('Sign in with email').click()


                    cy.visit(enchantedLink)
                })
        })
})


// Add the deleteAllTestUsers command
Cypress.Commands.add('deleteAllTestUsers', () => {
    cy.request({
        method: 'DELETE',
        url: `${descopeApiBaseURL}/mgmt/user/test/delete/all`,
        headers: authHeader,
    })
})

