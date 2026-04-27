describe('Feedback Flow', () => {
  beforeEach(() => {
    // Intercept API calls to ensure stability
    cy.intercept('GET', '/api/feedback', {
      statusCode: 200,
      body: [
        {
          id: '1',
          name: 'Cypress User',
          message: 'Hello from Cypress',
          rating: 5,
          createdAt: new Date().toISOString(),
        },
      ],
    }).as('getFeedback');

    cy.intercept('POST', '/api/feedback', {
      statusCode: 201,
      body: {
        id: '2',
        name: 'New Automation User',
        message: 'Stable automation message',
        rating: 4,
        createdAt: new Date().toISOString(),
      },
    }).as('postFeedback');

    cy.visit('/feedback');
  });

  it('should allow a user to visit, fill the form, and see the new feedback', () => {
    // 1. Visit and see existing data
    cy.wait('@getFeedback');
    cy.contains('Cypress User').should('be.visible');
    cy.contains('Hello from Cypress').should('be.visible');

    // 2. Fill the form
    cy.get('#name').type('New Automation User');
    cy.get('#message').type('Stable automation message');
    cy.get('#rating').select('4');

    // 3. Submit
    cy.get('button[type="submit"]').click();
    cy.wait('@postFeedback');

    // 4. See the result
    cy.contains('New Automation User').should('be.visible');
    cy.contains('Stable automation message').should('be.visible');

    // Verify form reset
    cy.get('#name').should('have.value', '');
    cy.get('#message').should('have.value', '');
  });
});
