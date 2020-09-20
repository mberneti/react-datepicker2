/// <reference types="cypress" />

context('Demo', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080')
  })

  // https://on.cypress.io/interacting-with-elements

  // it('.focus() - focus on a DOM element', () => {
  //   // https://on.cypress.io/focus
  //   cy.get('.action-focus').focus()
  //     .should('have.class', 'focus')
  //     .prev().should('have.attr', 'style', 'color: orange;')
  // })

  // it('.blur() - blur off a DOM element', () => {
  //   // https://on.cypress.io/blur
  //   cy.get('.action-blur').type('About to blur').blur()
  //     .should('have.class', 'error')
  //     .prev().should('have.attr', 'style', 'color: red;')
  // })

  // it('.clear() - clears an input or textarea element', () => {
  //   // https://on.cypress.io/clear
  //   cy.get('.action-clear').type('Clear this text')
  //     .should('have.value', 'Clear this text')
  //     .clear()
  //     .should('have.value', '')
  // })
});
