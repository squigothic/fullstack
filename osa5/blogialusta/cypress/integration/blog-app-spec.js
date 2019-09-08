describe('Blog app', function() {
  before(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.visit('http://localhost:3000/')
  })
  it('app login works', function() {
    cy.get('[data-cy="username"]').type('cypress')
    cy.get('[data-cy="password"]').type('salaisuus')
    cy.get('[data-cy="submit"]').click()
    cy.contains('cypress logged in')
  })
  describe('Adding and removig blogs', function() {
    it('adding new blog post works', function() {
      cy.get('[data-cy="toggle-new-blog"]').click()
      cy.get('[data-cy="blog-title"]').type('testiblogi')
      cy.get('[data-cy="blog-author"]').type('cypress')
      cy.get('[data-cy="blog-url"]').type('cypress.com')
      cy.get('[data-cy="submit-blog"]').click()
      cy.contains('testiblogi')
    })
    it('deleting a blog works and browser is redirected', function() {
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
