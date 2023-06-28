describe('Descope', function () {
  beforeEach(function () {
    cy.deleteAllTestUsers()
    cy.loginViaDescopeAPI()
    cy.visit('/')
  })

  it('shows welcome page', function () {
    /* ==== Generated with Cypress Studio ==== */
    cy.get('.ant-avatar-string').click();
    cy.get('.ant-popover-inner').contains('Hey');
    /* ==== End Cypress Studio ==== */
    /* ==== Generated with Cypress Studio ==== */
    cy.get('a > p').click();
    // cy.get('descope-wc').click();
    cy.contains('Sign in').should('be.visible')

    /* ==== End Cypress Studio ==== */
  })
})