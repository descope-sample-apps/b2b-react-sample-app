describe('Descope', function () {
  beforeEach(function () {
    cy.deleteAllTestUsers()
    cy.loginViaDescopeUI()
  })

  it('shows authenticated status', function () {
    cy.get('descope-wc').find('descope-text').contains(`authenticated`)
  })
})