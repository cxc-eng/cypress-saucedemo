/// <reference types="cypress" />

context('Feature: Logging', () => {
    beforeEach(() => {
      cy.visit('/');
    })
  
    it('logs in with valid credentials', () => {

      const validCredentials = [
          {login: 'standard_user', password: 'secret_sauce'},
          {login: 'problem_user', password: 'secret_sauce'},
          {login: 'performance_glitch_user', password: 'secret_sauce'}
      ];

      validCredentials.forEach(user => {
          cy.login(user);
          cy.assertThatUserLoggedInSuccessfuly();
          cy.logout();
      })
    });
  })