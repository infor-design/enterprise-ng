describe('Modal Tests', () => {
  before(() => {
    cy.visit('/modal-dialog');
    // close side nav
    cy.get('button[soho-nav-button]').click();
  });

  describe('Full on Tablet', () => {
    it('should access the modal in normal view', () => {
      cy.contains('Full on Tablet').click();
      cy.get('div.modal').should('be.visible').should('not.have.class', 'display-fullsize');
      cy.get('div.modal-header').contains('Example Modal Dialog');
      cy.contains('Submit').click();
    });

    it('should access the modal in full view', () => {
      cy.viewport(600, 600);
      cy.contains('Full on Tablet').click();
      cy.get('div.modal').should('be.visible').should('have.class', 'display-fullsize');
      cy.get('div.modal-header').contains('Example Modal Dialog');
      cy.contains('Submit').click();
    });
  });
});
