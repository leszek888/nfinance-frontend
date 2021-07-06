import { nanoid } from 'nanoid'
import { formatNumber } from '../../../src/helpers';
 
describe('Transactions List Test', () => {
  const fillOutWithAutocomplete = (selectionType, parent) => {
    if (selectionType === 'enter')
      parent.find('[data-cy="input-account"]').type('{enter}');
    if (selectionType === 'click') {
      parent.get('[data-cy="container-autocomplete"]').find('[data-cy="ac-suggestion"]').eq(2).click();
    }
  }

  it('Display, Edit and Create transactions', () => {
    cy.visit('/');
    const debitAccountName = nanoid();
    const payeeName = nanoid();
    const transactionValue = Math.floor(Math.random()*10000);
    
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

    // Fill out the transactions data
    cy.get('[data-cy="container-edit-transaction"] [data-cy="input-date"]').type('2021-01-01');
    cy.get('[data-cy="container-edit-transaction"] [data-cy="input-payee"]').type(payeeName);

    cy.get('[data-cy="container-edit-transaction"]').find('[data-cy="container-edited-entry"]').each((entry, index) => {
      cy.wrap(entry).find('[data-cy="input-account"]').as('inputAccount');
      cy.wrap(entry).find('[data-cy="input-amount"]').as('inputAmount');

      if (index === 0) {
        cy.get('@inputAccount').type(debitAccountName);
        cy.get('@inputAmount').type(transactionValue.toString());
      }
      if (index === 1) {
        cy.get('@inputAccount').focus();
        fillOutWithAutocomplete('enter', cy.wrap(entry));
        cy.get('@inputAmount').type((-1*(transactionValue-100)).toString());
      }
      if (index === 2) {
        cy.get('@inputAccount').focus();
        fillOutWithAutocomplete('click', cy.wrap(entry));
        cy.get('@inputAmount').type((-100).toString());
      }
    });

    // Save and display the transaction
    cy.get('[data-cy="btn-save-transaction"]').click();
    cy.get('[data-cy="container-transactions-list"]').contains(payeeName);
    cy.get('[data-cy="container-transactions-list"]').contains(debitAccountName);
    cy.get('[data-cy="container-transactions-list"]').contains('-'+formatNumber(transactionValue-100));
  })
})
