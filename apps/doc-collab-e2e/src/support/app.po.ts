// Login
export const getUsernameInput = () => cy.get('[data-cy=username-input]');
export const getPasswordInput = () => cy.get('[data-cy=password-input]');
export const getLoginBtn = () => cy.get('[data-cy=login-btn]');
export const getErrorMsg = () => cy.get('[data-cy=error-login]');

// Dashboard

export const getLogoutBtn = () => cy.get('[data-cy=logout-btn]');
