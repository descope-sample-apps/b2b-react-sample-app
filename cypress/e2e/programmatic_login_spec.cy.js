describe('Descope', function () {
  beforeEach(function () {
    cy.deleteAllTestUsers()
    cy.loginViaDescopeAPI()
  })

  it('shows welcome page after log out', function () {
    cy.visit('/')
    cy.get('.ant-avatar-string').click();
    cy.get('.ant-popover-inner').contains('Hey');
    cy.get('a > p').click();
    cy.get('descope-wc').should('be.visible');
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