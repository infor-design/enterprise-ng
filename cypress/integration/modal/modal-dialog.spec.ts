describe('Modal Tests', () => {

  // https://www.cypress.io/blog/2019/01/22/when-can-the-test-click/
  let count = 0
  const click = (elem) => {
    count++;
    return elem.click();
  };

  beforeEach(() => {
    count = 0;
    cy.visit('/modal-dialog');
  });

  describe('Full on Tablet', () => {
    it('should access the modal in normal view', () => {
      cy.contains('Full on Tablet').click();
      cy.get('div.modal-page-container')
        .should('be.visible')
        .find('div.modal')
        .should('exist')
        .should('not.have.class', 'display-fullsize')
        .contains('Submit')
        .pipe(click)
        .should('not.exist')
        .then(() => cy.log(`click retry count: ${count}`));
    });

    it('should access the modal in full view', () => {
      cy.viewport(600, 600);
      cy.contains('Full on Tablet').click();
      cy.get('div.modal-page-container')
        .should('be.visible')
        .find('div.modal')
        .should('exist')
        .should('have.class', 'display-fullsize')
        .contains('Submit')
        .pipe(click)
        .should('not.exist')
        .then(() => cy.log(`click retry count: ${count}`));
    });
  });
});
