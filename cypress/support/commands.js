//
// cypress/support/commands.js
//

// Cypress 16 removed Cypress.env(); cy.env() is a chainable, so config is resolved per command.
const withDescope = (fn) =>
    cy.env(['descope_project_id', 'descope_management_key', 'descope_base_url']).then(({ descope_project_id: projectId, descope_management_key: managementKey, descope_base_url: baseUrl }) =>
        fn({
            authHeader: { 'Authorization': `Bearer ${projectId}:${managementKey}` },
            descopeApiBaseURL: `${baseUrl || (projectId.length >= 32 ? `https://api.${projectId.substring(1, 5)}.descope.com` : 'https://api.descope.com')}/v1`,
        })
    )

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
Cypress.Commands.add('loginViaDescopeAPI', () => withDescope(({ authHeader, descopeApiBaseURL }) => {
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

                            // Store the JWTs in the app's origin before it boots; cy.window() here is
                            // still about:blank under test isolation, so storage set there is lost
                            cy.visit('/', {
                                onBeforeLoad(win) {
                                    win.localStorage.setItem(SESSION_TOKEN_KEY, sessionJwt);
                                    win.localStorage.setItem(REFRESH_TOKEN_KEY, refreshJwt);
                                },
                            })

                        })
                })
        })
}))


// Add the deleteAllTestUsers command
Cypress.Commands.add('deleteAllTestUsers', () => withDescope(({ authHeader, descopeApiBaseURL }) => {
    cy.request({
        method: 'DELETE',
        url: `${descopeApiBaseURL}/mgmt/user/test/delete/all`,
        headers: authHeader,
    })
}))
