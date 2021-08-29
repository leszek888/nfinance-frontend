import { nanoid } from 'nanoid'
import { formatNumber } from '../../../src/helpers';
 
describe('Transactions List Test', () => {
  const fillOutWithAutocomplete = (selectionType, parent) => {
    if (selectionType === 'enter') {
      parent.find('[data-cy="input-account"]').type('{enter}');
      parent.find('[data-cy="input-account"]').type('{enter}');
    }
    if (selectionType === 'click') {
      parent.get('[data-cy="container-autocomplete"]').find('[data-cy="ac-suggestion"]').eq(2).click();
    }
  }

  it('Creates transactions', () => {
    cy.clock(new Date(2021, 0, 1, 12, 0, 0), ['Date']);
    cy.visit('/load');
    cy.wait(5500);
    const payeeName = nanoid();
    const transactionValue = Math.floor(Math.random()*10000);
    const accountNames = [ 'Assets', 'Equity', 'Liabilities' ];

    cy.get('[data-cy="nav-link-transactions"]').click();
    
    // There should be no transactions in the list
    cy.wait(3000);
    cy.get('[data-cy="container-transactions-list"]').find('[data-cy="container-transaction"]').should('have.length', 0);

    // Display Transaction Edit Window when clicking "New Transaction"
    cy.contains('button', 'New Transaction');
    cy.get('[data-cy="btn-new-transaction"]').click();

    // All inputs should be empty
    cy.get('[data-cy="container-edit-transaction"]');
    cy.get('[data-cy="container-edit-transaction"] input').each(input => {
      cy.wrap(input).invoke('val').should('eq', '');
    });

    // Add third entry
    cy.get('[data-cy="btn-add-entry"]').click();

    // Try to submit without filling out the inputs
    cy.get('[data-cy="btn-save-transaction"]').click();
    cy.get('[data-cy="container-edit-transaction"]').find('.has-error').should('have.length', 8);

    // Fill out the transactions data
    cy.get('[data-cy="container-edit-transaction"] [data-cy="input-date"]').type('2021-01-01');
    cy.get('[data-cy="container-edit-transaction"] [data-cy="input-payee"]').type(payeeName);

    cy.get('[data-cy="container-edit-transaction"]').find('[data-cy="container-edited-entry"]').each((entry, index) => {
      cy.wrap(entry).find('[data-cy="input-account"]').as('inputAccount');
      cy.wrap(entry).find('[data-cy="input-amount"]').as('inputAmount');

      cy.get('@inputAccount').type(accountNames[index]);

      if (index === 0) {
        cy.get('@inputAmount').type(transactionValue.toString());
      }
      if (index === 1) {
        cy.get('@inputAmount').type((-1*(transactionValue-100)).toString());
        cy.get('@inputAmount').blur();
        cy.get('[data-cy="field-unbalanced-amount"]').contains('-100,00');
      }
      if (index === 2) {
        cy.get('@inputAmount').type((-100).toString());
        cy.get('@inputAmount').blur();
      }
    });

    // Save and display the transaction
    cy.get('[data-cy="btn-save-transaction"]').click();
    cy.get('[data-cy="container-transactions-list"]').contains(payeeName);
    cy.get('[data-cy="container-transactions-list"]').contains(accountNames[0]);
    cy.get('[data-cy="container-transactions-list"]').contains(accountNames[1]);
    cy.get('[data-cy="container-transactions-list"]').contains(accountNames[2]);
    cy.get('[data-cy="container-transactions-list"]').contains('-'+formatNumber(transactionValue-100));
  })

})

describe('It filters transactions on the list', () => {
  it('Filters transactions by date, account and payee name', () => {
    cy.visit('/load?balance_id=b10fc767-7a43-43d8-ae1e-8125ebecf503');
    cy.wait(4000);
    cy.get('[data-cy="nav-link-transactions"]').click();
    cy.wait(1000);

    cy.get('[data-cy="filter-payee"]').find('input').type('Shop A').type('{enter}');
    cy.get('[data-cy="container-transaction"]').should('have.length', 1);
  });

});

describe('Displays accounts with balances on /accounts page', () => {
  it('Filters transactions by date, account and payee name', () => {
    cy.visit('/load?balance_id=b10fc767-7a43-43d8-ae1e-8125ebecf503');
    cy.wait(4000);
    cy.get('[data-cy="nav-link-accounts"]').click();

    cy.get('[data-cy="container-accounts"]').find('[data-cy="account-row"]').should('have.length', 12);
  });

});
