context('Datagrid Dynamic Tests', () => {

  before(() => {
    cy.visit('/datagrid-dynamic');
    // close side nav to maximize viewport for the main content
    cy.get('.header > .toolbar > .title > .btn-icon').click();
    // ensure datagrid is ready with busy indicator already hidden
    cy.get('table.datagrid tr').should('exist');
    cy.get('.overlay.busy').should('not.exist');
  });

  // close the context menu
  afterEach(() => {
    cy.get('ul[soho-popupmenu] li:first>a').click();
    cy.get('ul[soho-popupmenu]').should('not.be.visible');
  });

  it('should show 1st context menu', () => {
    // rightclick is still buggy
    cy.get('table.datagrid tr:first').trigger('contextmenu')
      .should('have.class', 'is-selected');
    cy.get('ul[soho-popupmenu]').should('be.visible')
      .children().should('have.length', 5);
  });

  it('should show 2nd context menu', () => {
    // rightclick is still buggy
    cy.get('table.datagrid tr:nth-child(3)').trigger('contextmenu')
      .should('have.class', 'is-selected');
    cy.get('ul[soho-popupmenu]').should('be.visible')
      .children().should('have.length', 10);
  });

  it('should show 3rd context menu', () => {
    // rightclick is still buggy
    cy.get('table.datagrid tr:last').trigger('contextmenu')
      .should('have.class', 'is-selected');
    cy.get('ul[soho-popupmenu]').should('be.visible')
      .children().should('have.length', 3);
  });
});
