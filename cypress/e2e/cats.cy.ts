/* eslint-disable */

describe('Cats', () => {
    it('should naviage to cats from main menu', () => {
      cy.visit('http://localhost:3000/')

      cy.get('a.nav-link[href*="cats"]').click()
      cy.get('a.nav-link[href*="form"]').click()

      cy.url().should('include', '/cats')
      cy.url().should('include', '/form')
      cy.get('h1').contains('View your cats')
    })
  })

  export {}
 