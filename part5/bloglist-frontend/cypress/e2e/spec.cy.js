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

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'rumppi', password: 'let-me-in' })
    })

    it('A blog can be created', function() {
      cy.get('button').contains('new blog').click()
      cy.get('input[placeholder="add title..."]').type('I <3 Cypress')
      cy.get('input[placeholder="add author..."]').type('A. Nonymous')
      cy.get('input[placeholder="add url..."]').type('http://localhost:3000')
      cy.get('button').contains('create').click()

      cy.get('.info')
        .should('contain', 'a new blog')
        .and('contain', 'I <3 Cypress')
        .and('contain', 'A. Nonymous')

      cy.get('.blog')
        .contains('I <3 Cypress')
        .contains('view')
    })

    describe('and a blog exists', function() {
      beforeEach(function() {
        cy.createBlog({
          author: 'The Gang of Four',
          title: 'Design Patterns',
          url: 'https://www.example.com',
        })
      })

      it.only('a user can like a blog', function() {
        cy.get('.blog')
          .contains('The Gang of Four')
          .contains('view')
          .click()
        cy.get('.blog').contains('The Gang of Four').parent().as('theBlog')
        cy.get('@theBlog').find('.togglableContent .likes').contains('0')
        cy.get('@theBlog').find('.togglableContent .btn-like').click()
        cy.get('@theBlog').find('.togglableContent .likes').contains('1')
      })
    })
  })
})