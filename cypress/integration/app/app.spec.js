context('App Tests', () => {
  beforeEach(() => {
    cy.visit('/');
  })

  it('should display root route header text', () => {
    cy.get('app-header-dynamic-demo soho-toolbar h1 span')
      .contains('IDS Enterprise Angular Components');
  });
});
