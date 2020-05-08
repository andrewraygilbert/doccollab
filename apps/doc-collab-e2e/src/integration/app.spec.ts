import {
  getErrorMsg,
  getLogoutBtn
} from './../support/app.po';
import { mockUser } from './../fixtures/mock-credentials';

describe('app landing and login', () => {
  before(() => {
    cy.clearLocalStorage();
  });

  beforeEach(() => {
    cy.visit('/');
  });

  it('should go to login page', () => {
    cy.url().should('contain', 'login');
  });

  it('should login successfully', () => {
    cy.login(mockUser.username, mockUser.password);
    cy.url().should('contain', 'dashboard');
    cy.window().its('localStorage').should('have.property', 'access_token');
  });

  it('should throw with incorrect username', () => {
    cy.login('wrong', mockUser.password);
    getErrorMsg().should('exist');
  });

  it('should throw with incorrect password', () => {
    cy.login(mockUser.username, 'notcorrect');
    getErrorMsg().should('exist');
  });

});

describe('dashboard', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.login(mockUser.username, mockUser.password);
  });

  it('should log out', () => {
    getLogoutBtn().click();
    cy.url().should('contain', 'login');
  });

});
