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

    it('doesn\'t log in with invalid credentials', () => {

        const invalidCredentialsAndErrorMessages = [
            {login: 'locked_out_user', password: 'secret_sauce'},
            {login: '{leftarrow}', password: 'secret_sauce'},
            {login: 'performance_glitch_user', password: '{leftarrow}'},
            {login: 'fakeusername', password: 'fakepassword'}
        ];

        const errorMessages = [
            'Sorry, this user has been locked out',
            'Epic sadface: Username is required',
            'Epic sadface: Password is required',
            'Epic sadface: Username and password do not match any user in this service',
        ]
  
        invalidCredentialsAndErrorMessages.forEach((user, index) => {
            cy.login(user);
  
            cy.get('h3 button.error-button').should('be.visible');
            cy.get('h3[data-test="error"]').should('contain.text', errorMessages[index]);

            cy.reload();
        })
      })
  })