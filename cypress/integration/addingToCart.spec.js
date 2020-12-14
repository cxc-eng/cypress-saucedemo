/// <reference types="cypress" />

context('Feature: Adding Products to cart', () => {
    beforeEach(() => {
      cy.visit('/');
      cy.login({login: 'standard_user', password: 'secret_sauce'});
      cy.assertThatUserLoggedInSuccessfuly();
      cy.resetAppState();
    })
  
    it('adds a backpack product to cart ', () => {
        const product = {
            name: 'Sauce Labs Backpack',
            description: 'carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.',
            price: '29.99'
        }

        cy.contains(product.name).click();
        cy.contains('ADD TO CART').click();
        cy.get('#shopping_cart_container span').should('have.text', '1');
        cy.get('#shopping_cart_container').click();

        const cartItemLocator = '.cart_item';

        cy.get(cartItemLocator).should('have.length', 1);
        cy.get(cartItemLocator).find('.cart_quantity').should('have.text', '1')
        cy.get(cartItemLocator).find('.inventory_item_name').should('have.text', product.name);
        cy.get(cartItemLocator).find('.inventory_item_desc').should('have.text', product.description);
        cy.get(cartItemLocator).find('.inventory_item_price').should('have.text', product.price);
    });
  })