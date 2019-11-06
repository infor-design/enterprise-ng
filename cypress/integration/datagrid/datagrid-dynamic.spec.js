context('Datagrid Dynamic Tests', () => {
  beforeEach(() => {
    cy.visit('/datagrid-dynamic');
  })

  it('should show context menu', () => {
    cy.contains('Compressor').rightclick();
    cy.get('div.popupmenu-wrapper ul')
      .should('be.visible')
      .children()
      .should('have.length', 5);

    cy.contains('2142201 Compressor').rightclick();
    cy.get('div.popupmenu-wrapper ul')
      .should('be.visible')
      .children()
      .should('have.length', 10);

    cy.contains('2142201 Compressor').rightclick();
    cy.get('div.popupmenu-wrapper ul')
      .should('be.visible')
      .children()
      .should('have.length', 3);
  });
});
