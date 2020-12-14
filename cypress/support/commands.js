
Cypress.Commands.add('login', (user) => {
    cy.get('[data-test="username"]').type(user.login);
    cy.get('[data-test="password"]').type(user.password);
    cy.contains('LOGIN').click();
})

Cypress.Commands.add('assertThatUserLoggedInSuccessfuly', () => {
    cy.get('.product_label').should("be.visible");
    cy.url().should('include', 'inventory.html');
})

Cypress.Commands.add('logout', () => {
    cy.get('.bm-burger-button > button').click();
    cy.get('#logout_sidebar_link').click();
    cy.url().should('include', 'index.html');
})

Cypress.Commands.add('resetAppState', () => {
    cy.get('.bm-burger-button > button').click();
    cy.get('#reset_sidebar_link').click();
    cy.get('.bm-cross-button').click();
});