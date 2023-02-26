describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const testUser = {
      name: 'Rumpertus',
      username: 'rumppi',
      password: 'let-me-in',
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, testUser)
    cy.visit('')
  })

  it('Login form is shown', function() {
    cy.contains('Log in to application')
    cy.get('#username')
    cy.get('#password')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('rumppi')
      cy.get('#password').type('let-me-in')
      cy.get('#login-button').click()

      cy.contains('Rumpertus logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('rumppi')
      cy.get('#password').type('wrong-password')
      cy.get('#login-button').click()

      cy.get('.error')
        .should('contain', 'wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')

      cy.contains('Rumpertus logged in').should('not.exist')
    })
  })
})