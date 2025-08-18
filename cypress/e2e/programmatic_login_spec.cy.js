describe('Descope', function () {
  beforeEach(function () {
    cy.deleteAllTestUsers()
    cy.loginViaDescopeAPI()
  })

  it('shows step up page and collapsable', function () {
    cy.visit('/admin/data-tables')
    cy.get('.ant-collapse-header-text').click();
  })

  it('shows revenue information on rev dashboard', function () {
    cy.visit('/')
    cy.get('.ant-typography').contains('Your Rev Dashboard');
    Cypress.on('uncaught:exception', (err) => {
      cy.log('Uncaught exception: ' + err.message);
      return false; // prevents Cypress from failing the test immediately
    });
    // If desired, add more assertions.
  })
})