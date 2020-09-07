describe('Swap List Tests', () => {
  let dataTransfer;

  beforeEach(() => {
    cy.visit('/swaplist');
    dataTransfer = new DataTransfer();
  });

  it('should transfer item from left to right via drag & drop', () => {
    cy.contains('Option A')
      .closest('li')
      .find('.handle.draggable')
      .invoke('show')
      .trigger('mousedown')
      .trigger('dragstart', { dataTransfer });

    cy.get('soho-swaplist-card[type="selected"] .card-content')
      .trigger('dragenter')
      .trigger('dragover')
      .trigger('dragend')
      .contains('Option A')
      .should('be.visible');

    cy.get('soho-swaplist-card[type="available"] .card-content')
      .contains('Option A')
      .should('not.exist');
  });

  it('should transfer item from left to right via right arrow icon', () => {
    cy.contains('Option A').click();
    cy.get('button[movetoselected]').click();
    cy.get('soho-swaplist-card[type="selected"] .card-content')
      .contains('Option A')
      .should('be.visible');
    cy.get('soho-swaplist-card[type="available"] .card-content')
      .contains('Option A')
      .should('not.exist');
  });

  it('should transfer item from right to left via drag & drop', () => {
    cy.contains('Option D')
      .closest('li')
      .find('.handle.draggable')
      .invoke('show')
      .trigger('mousedown')
      .trigger('dragstart', { dataTransfer });

    cy.get('soho-swaplist-card[type="available"] .card-content')
      .trigger('dragenter')
      .trigger('dragover')
      .trigger('dragend')
      .contains('Option D')
      .should('be.visible');

    cy.get('soho-swaplist-card[type="selected"] .card-content')
      .contains('Option D')
      .should('not.exist');
  });

  it('should transfer item from right to left via left arrow icon', () => {
    cy.contains('Option D').click();
    cy.get('button[movetoleft]').click();
    cy.get('soho-swaplist-card[type="available"] .card-content')
      .contains('Option D')
      .should('be.visible');
    cy.get('soho-swaplist-card[type="selected"] .card-content')
      .contains('Option D')
      .should('not.exist');
  });
});
