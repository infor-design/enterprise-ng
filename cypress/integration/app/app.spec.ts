describe('App Tests', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display root route header text', () => {
    cy.get('.page-title')
      .contains('IDS Enterprise Angular Components');
  });
});
