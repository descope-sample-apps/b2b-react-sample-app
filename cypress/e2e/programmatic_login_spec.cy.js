describe('Descope', function () {
  beforeEach(function () {
    cy.deleteAllTestUsers()
    cy.loginViaDescopeAPI()
    cy.visit('/')
  })

  it('shows welcome page', function () {
    cy.get('.ant-avatar-string').click();
    cy.get('.ant-popover-inner').contains('Hey');
    cy.get('a > p').click();
    cy.contains('Sign in').should('be.visible')
  })
})