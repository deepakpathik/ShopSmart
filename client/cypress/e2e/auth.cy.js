describe('Authentication E2E Flow', () => {
  it('Loads the Home screen and navigates to Login via button', () => {
    cy.visit('http://localhost:5173');
    
    cy.contains('Initialize ShopSmart').should('not.exist');
    
    cy.contains('Login').click();
    
    cy.url().should('include', '/login');
    cy.contains('Welcome Back');
  });
  
  it('Successfully mocks a login integration sequence', () => {
    cy.intercept('POST', '**/api/auth/login', {
      statusCode: 200,
      body: { token: 'mock-jwt-token', user: { email: 'admin@shopsmart.com' } }
    }).as('loginRequest');
    
    cy.visit('http://localhost:5173/login');
    
    cy.get('input[type="email"]').type('admin@shopsmart.com');
    cy.get('input[type="password"]').type('password123');
    
    cy.get('button[type="submit"]').click();
    
    cy.wait('@loginRequest');
    
    cy.contains('Login successful!');
  });
});
