import { nanoid } from 'nanoid'
import { formatNumber } from '../../../src/helpers';
 
describe('Transactions List Test', () => {
  const fillOutWithAutocomplete = (selectionType, parent) => {
    if (selectionType === 'enter')
      parent.find('[data-cy="input-account"]').type('{enter}');
    if (selectionType === 'click')
      parent.get('[data-cy="container-autocomplete"]').find('[data-cy="ac-suggestion"]').eq(2).click();
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

    // Add third entry
    cy.get('[data-cy="btn-add-entry"]').click();

    // Fill out the transactions data
    cy.get('[data-cy="container-edit-transaction"] [data-cy="input-date"]').type('2021-01-01');
    cy.get('[data-cy="container-edit-transaction"] [data-cy="input-payee"]').type(payeeName);

    cy.get('[data-cy="container-edit-transaction"]').find('[data-cy="container-edited-entry"]').each((entry, index) => {
      if (index === 0) {
        cy.wrap(entry).find('[data-cy="input-account"]').type(debitAccountName);
        cy.wrap(entry).find('[data-cy="input-amount"]').type(transactionValue.toString());
      }
      if (index === 1) {
        fillOutWithAutocomplete('enter', cy.wrap(entry));
        cy.wrap(entry).find('[data-cy="input-amount"]').type((-1*(transactionValue-100)).toString());
      }
      if (index === 2) {
        fillOutWithAutocomplete('click', cy.wrap(entry));
        cy.wrap(entry).find('[data-cy="input-amount"]').type((-100).toString());
      }
    });

    // Save and display the transaction
    cy.get('[data-cy="btn-save-transaction"]').click();
    cy.get('[data-cy="container-transactions-list"]').contains(payeeName);
    cy.get('[data-cy="container-transactions-list"]').contains(debitAccountName);
    cy.get('[data-cy="container-transactions-list"]').contains('-'+formatNumber(transactionValue-100));
  })
})
