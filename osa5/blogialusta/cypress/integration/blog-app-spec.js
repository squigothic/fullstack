describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset', {
      options: { users: true, blogs: true },
    })
    const user = {
      name: 'Cypress Testing',
      username: 'cypress',
      password: 'salaisuus',
    }
    cy.request('POST', 'http://localhost:3003/api/users', user).then(() => {
      cy.request('POST', 'http://localhost:3003/api/login', {
        username: 'cypress',
        password: 'salaisuus',
      })
        .then(response => {
          cy.log('Response to login: ', response)
          cy.wrap(response.body.token).as('token')
        })
        .then(() => cy.visit('http://localhost:3000/'))
        .then(() => {
          cy.get('[data-cy="username"]').type('cypress')
          cy.get('[data-cy="password"]').type('salaisuus')
          cy.get('[data-cy="submit"]').click()
          cy.contains('cypress logged in')
        })
    })
  })

  describe('Adding and removing blogs', function() {
    beforeEach(function() {
      cy.request
    })

    it('adding new blog post works', function() {
      cy.get('[data-cy="toggle-new-blog"]').click()
      cy.get('[data-cy="blog-title"]').type('testiblogi')
      cy.get('[data-cy="blog-author"]').type('cypress')
      cy.get('[data-cy="blog-url"]').type('cypress.com')
      cy.get('[data-cy="submit-blog"]').click()
      cy.contains('testiblogi')
    })

    it('deleting a blog works and browser is redirected', function() {
      const newBlogObject = {
        title: 'testiblog',
        author: 'cypress',
        url: 'cypress.meedia',
      }
      cy.request({
        method: 'POST',
        url: 'http://localhost:3003/api/blogs',
        auth: { bearer: this.token },
        body: newBlogObject,
      })
        .then(() => cy.reload())
        .then(() => {
          cy.get('[data-cy="link-to-blog"]').click()
          cy.on('window:confirm', function(str) {
            expect(str === 'Are you sure about that?').to.be.true
            return true
          })
          cy.get('[data-cy="delete-blog"]').click()
          cy.url().should('eq', 'http://localhost:3000/')
        })
    })
  })
})
