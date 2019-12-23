describe('Datagrid Dynamic Tests', () => {

  beforeEach(() => {
    cy.visit('/datagrid-dynamic');
    // close side nav
    cy.get('button[soho-nav-button]').click();
    // ensure datagrid is ready with busy indicator already hidden
    cy.get('table.datagrid tr').should('exist');
    cy.get('.overlay.busy').should('not.exist');
  });

  describe('Context Menu Tests', () => {
    it('should show context menus', () => {
      // 1st context menu
      cy.get('table.datagrid tr:first').rightclick()
        .should('have.class', 'is-selected');
      cy.get('tr.is-selected').should('have.length', 1);
      cy.get('ul[soho-popupmenu]').should('be.visible')
        .children().should('have.length', 5);

      // close context menu via submenu
      cy.get('ul[soho-popupmenu] li:nth-child(5)')
        .trigger('mouseover')
        .find('ul')
        .children()
        .should('be.visible')
        .should('have.length', 2)
        .first()
        .click();
      cy.get('ul[soho-popupmenu]').should('not.be.visible');

      // 2nd context menu
      cy.get('table.datagrid tr:nth-child(3)').rightclick()
        .should('have.class', 'is-selected');
      cy.get('tr.is-selected').should('have.length', 1);
      cy.get('ul[soho-popupmenu]').should('be.visible')
        .children().should('have.length', 10);

      // close context menu
      cy.get('ul[soho-popupmenu] li:first>a').click();
      cy.get('ul[soho-popupmenu]').should('not.be.visible');

      // 3rd context menu
      cy.get('table.datagrid tr:last').rightclick()
        .should('have.class', 'is-selected');
      cy.get('tr.is-selected').should('have.length', 1);
      cy.get('ul[soho-popupmenu]').should('be.visible')
        .children().should('have.length', 3);

      // close context menu
      cy.get('ul[soho-popupmenu] li:first>a').click();
      cy.get('ul[soho-popupmenu]').should('not.be.visible');
    });
  });

  describe('Multiselect Tests', () => {
    it('should select 1 or more rows', () => {
      // select 1 row
      cy.get('table.datagrid tr:first').click();
      cy.get('th > .datagrid-checkbox-wrapper > .datagrid-checkbox')
        .should('have.class', 'is-checked is-partial');
      cy.get('tr.is-selected').should('have.length', 1);
      // select another row
      cy.get('table.datagrid tr:last').click();
      cy.get('th > .datagrid-checkbox-wrapper > .datagrid-checkbox')
        .should('have.class', 'is-checked is-partial');
      cy.get('tr.is-selected').should('have.length', 2);
    });

    it('select/unselect all rows', () => {
      // select all
      cy.get('th > .datagrid-checkbox-wrapper').click();
      cy.get('th > .datagrid-checkbox-wrapper > .datagrid-checkbox')
        .should('have.class', 'is-checked')
        .should('not.have.class', 'is-partial');
      cy.get('tr.is-selected').should('have.length', 8);

      // unselect all
      cy.get('th > .datagrid-checkbox-wrapper > .datagrid-checkbox')
        .should('have.class', 'is-checked')
      cy.get('th > .datagrid-checkbox-wrapper').click();
      cy.get('th > .datagrid-checkbox-wrapper > .datagrid-checkbox')
        .should('not.have.class', 'is-checked is-partial');
      cy.get('tr.is-selected').should('not.exist');
    });
  });

  describe('Filter Tests', () => {
    it('should toggle filter row', () => {
      cy.get('th .datagrid-filter-wrapper:not(.is-empty)').should('be.visible').should('have.length', 7);
      cy.contains('Toggle Filter Row').click();
      cy.get('th .datagrid-filter-wrapper:not(.is-empty)').should('not.be.visible');
      cy.contains('Toggle Filter Row').click();
      cy.get('th .datagrid-filter-wrapper:not(.is-empty)').should('be.visible');
    });

    it('should filter rows', () => {
      cy.get('tr.datagrid-row').should('have.length', 8);
      cy.get('th .datagrid-filter-wrapper:not(.is-empty)').first().type('some');
      cy.get('tr.datagrid-row').should('have.length', 2);
      cy.contains('Reset Filter').click();
      cy.get('tr.datagrid-row').should('have.length', 8);
    });
  });
});
