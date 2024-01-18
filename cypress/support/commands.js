Cypress.Commands.add('fillMandatoryFieldAndSubmit', function(nome, sobrenome, email, textarea, telefone) {
    cy.get('#firstName').type(nome)
    cy.get('#lastName').type(sobrenome)
    cy.get('#email').type(email)
    cy.get('#open-text-area').type(textarea)
    cy.get('#phone').type(telefone)
    cy.get('button[type="submit"]').click()
})

Cypress.Commands.add('fillMandatoryFieldAndSubmit1', function() {
    cy.get('#firstName').type('joel')
    cy.get('#lastName').type('rocha')
    cy.get('#email').type('joel@example.com')
    cy.get('#open-text-area').type('teste')
    cy.get('#phone').type('123456789')
    cy.contains('button', 'Enviar').click()
})
