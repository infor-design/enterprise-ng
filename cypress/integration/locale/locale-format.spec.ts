describe('Locale Tests', () => {
  beforeEach(() => {
    cy.visit('/locale-pipe');
  });

  const checkLocale = (locale, name, date, currency) => {
    it(`should format data in ${name}`, () => {
      // dropdown list do not exist if dropdown is not opened
      cy.get('#dropdown-list')
        .should('not.exist');

      cy.get('div.dropdown-wrapper')
        .should('be.visible')
        .click();

      // select locale
      cy.get('#dropdown-list')
        .contains(name)
        .should('exist')
        .click();

      cy.get('div.dropdown-wrapper')
        .contains(name)
        .should('be.visible');

      // check selection
      cy.get('#locale')
        .should('have.value', locale);

      // check date format
      cy.get('#date')
        .should('have.value', date);

      // check currency format
      cy.get('#currency')
        .should('have.value', currency);
    });
  };

  [
    [ 'en-GB', 'English (British)',      '09/12/2019', '£1,000.00'   ],
    [ 'da-DK', 'Danish (Denmark)',       '09-12-2019', '1.000,00 kr' ],
    [ 'zh-CN', 'Chinese (Simplified)',   '2019/12/9',  '¥ 1,000.00'  ],
    [ 'pt-BR', 'Portugese (Brazillian)', '09/12/2019', 'R$1.000,00'  ],
    [ 'fr-CA', 'French (Canada)',        '2019-12-09', '1 000,00 $'  ],
    [ 'en-US', 'English (American)',     '12/9/2019',  '$1,000.00'   ],
  ].forEach(data => checkLocale(...data));
});
