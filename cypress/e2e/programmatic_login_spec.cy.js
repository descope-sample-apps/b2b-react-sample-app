describe('Descope', function () {
  beforeEach(function () {
    cy.deleteAllTestUsers()
    cy.loginViaDescopeAPI()
  })

  cy.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    console.log('!!!!!!!! error', err);
    return false
})

  it('shows step up page and collapsable', function () {
    cy.visit('/admin/data-tables')
    cy.get('.ant-collapse-header-text').click();
  })

  it('shows revenue information on rev dashboard', function () {
    cy.visit('/')
    cy.get('.ant-typography').contains('Your Rev Dashboard');
    // If desired, add more assertions.
  })
})