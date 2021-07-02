import { nanoid } from 'nanoid'
import { formatNumber } from '../../../src/helpers';
 
describe('Transactions List Test', () => {
  const fillOutWithAutocomplete = (parent) => {
    parent.type('{enter}');
    // parent.trigger('keydown', { keyCode: 13 });
    // parent.get('[data-cy="container-autocomplete"]');
  }

  it('Display, Edit and Create transactions', () => {
    cy.visit('/');
    const debitAccountName = nanoid();
    const payeeName = nanoid();
    const transactionValue = Math.floor(Math.random()*10000);

    // Display Transaction Edit Window when clicking "New Transaction"
    cy.contains('button', 'New Transaction');
    cy.get('[data-cy="btn-new-transaction"]').click();

    // All inputs should be empty
    cy.get('[data-cy="container-edit-transaction"]');
    cy.get('[data-cy="container-edit-transaction"] input').each(input => {
      cy.wrap(input).invoke('val').should('eq', '');
    });

    // Fill out the transactions data
    cy.get('[data-cy="container-edit-transaction"] [data-cy="input-date"]').type('2021-01-01');
    cy.get('[data-cy="container-edit-transaction"] [data-cy="input-payee"]').type(payeeName);
    cy.get('[data-cy="container-edit-transaction"]').find('[data-cy="container-edited-entry"]').each((entry, index) => {
      if (index === 0) {
        cy.wrap(entry).find('[data-cy="input-account"]').type(debitAccountName);
        cy.wrap(entry).find('[data-cy="input-amount"]').type(transactionValue.toString());
      }
      if (index === 1) {
        fillOutWithAutocomplete(cy.wrap(entry).find('[data-cy="input-account"]'));
        cy.wrap(entry).find('[data-cy="input-amount"]').type('-'+transactionValue.toString());
      }
    });

    // Save and display the transaction
    cy.get('[data-cy="btn-save-transaction"]').click();
    cy.get('[data-cy="container-transactions-list"]').contains(payeeName);
    cy.get('[data-cy="container-transactions-list"]').contains(debitAccountName);
    cy.get('[data-cy="container-transactions-list"]').contains('-'+formatNumber(transactionValue));
  })
})
