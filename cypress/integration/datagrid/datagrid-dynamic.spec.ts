describe('Datagrid Dynamic Tests', () => {

  beforeEach(() => {
    cy.visit('/datagrid-dynamic');
  });

  describe('Context Menu Tests', () => {
    it('should show context menus', () => {
      // 1st context menu
      cy.get('tr[aria-rowindex="1"]').rightclick()
        .should('have.class', 'is-selected');
      cy.get('tr.is-selected').should('have.length', 1);
      cy.get('#grid-context-menu').should('be.visible')
        .children().should('have.length', 5);

      // close context menu via submenu
      cy.get('#grid-context-menu li:nth-child(5)')
        .trigger('mouseover')
        .find('ul')
        .children()
        .should('be.visible')
        .should('have.length', 2)
        .first()
        .click();
      cy.get('#grid-context-menu').should('not.be.visible');

      // 2nd context menu
      cy.get('tr[aria-rowindex="3"]').rightclick()
        .should('have.class', 'is-selected');
      cy.get('tr.is-selected').should('have.length', 1);
      cy.get('#grid-context-menu').should('be.visible')
        .children().should('have.length', 10);

      // close context menu
      cy.get('#grid-context-menu li:first>a').click();
      cy.get('#grid-context-menu').should('not.be.visible');

      // 3rd context menu
      cy.get('tr[aria-rowindex="8"]').rightclick()
        .should('have.class', 'is-selected');
      cy.get('tr.is-selected').should('have.length', 1);
      cy.get('#grid-context-menu').should('be.visible')
        .children().should('have.length', 3);

      // close context menu
      cy.get('#grid-context-menu li:first>a').click();
      cy.get('#grid-context-menu').should('not.be.visible');
    });
  });

  describe('Multiselect Tests', () => {
    it('should select 1 or more rows', () => {
      // select 1 row
      cy.get('tr[aria-rowindex="1"]').click();
      cy.get('#datagrid-dynamic-datagrid-1-header-0 .datagrid-checkbox')
        .should('have.class', 'is-checked is-partial');
      cy.get('tr.is-selected').should('have.length', 1);
      // select another row
      cy.get('table.datagrid tr:last').click();
      cy.get('#datagrid-dynamic-datagrid-1-header-0 .datagrid-checkbox')
        .should('have.class', 'is-checked is-partial');
      cy.get('tr.is-selected').should('have.length', 2);
    });

    it('select/unselect all rows', () => {
      // select all
      cy.get('#datagrid-dynamic-datagrid-1-header-0').click();
      cy.get('#datagrid-dynamic-datagrid-1-header-0 .datagrid-checkbox')
        .should('have.class', 'is-checked')
        .should('not.have.class', 'is-partial');
      cy.get('tr.is-selected').should('have.length', 8);

      // unselect all
      cy.get('#datagrid-dynamic-datagrid-1-header-0 .datagrid-checkbox')
        .should('have.class', 'is-checked')
      cy.get('#datagrid-dynamic-datagrid-1-header-0').click();
      cy.get('#datagrid-dynamic-datagrid-1-header-0 .datagrid-checkbox')
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
