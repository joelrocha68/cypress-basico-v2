/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function() {
        cy.visit('./src/index.html')
    })

    it('verifica o título da aplicação', function() {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('preenche os campos obrigatórios e envia o formulário', function() {
        cy.get('#firstName').type('joel')
        cy.get('#lastName').type('rocha')
        cy.get('#email').type('joel@example.com')
        cy.get('#open-text-area').type('teste')
        cy.get('#phone').type('123456789')
        cy.get('button[type="submit"]').click()

        cy.get('.success').should('be.visible')
    })

    it('Fazendo variaveis ou constantes', function() {
    const longText = 'teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste'
        cy.get('#firstName').type('joel')
        cy.get('#lastName').type('rocha')
        cy.get('#email').type('joel@example.com')
        cy.get('#open-text-area').type(longText)
        cy.get('#phone').type('123456789')
        cy.get('button[type="submit"]').click()

        cy.get('.success').should('be.visible')
    })

    it('Fazendo variaveis ou constantes com propriedades e valores', function() {
    const longText = 'teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste'
        cy.get('#firstName').type('joel')
        cy.get('#lastName').type('rocha')
        cy.get('#email').type('joel@example.com')
        cy.get('#open-text-area').type(longText, { delay: 0})
        cy.get('#phone').type('123456789')
        cy.get('button[type="submit"]').click()

        cy.get('.success').should('be.visible')
    })
            
    it('Exibe mensagem de erro ao submeter o formulario com um email com formatação invalida', function() {
        cy.get('#firstName').type('joel')
        cy.get('#lastName').type('rocha')
        cy.get('#email').type('joel@example,com')
        cy.get('#open-text-area').type('teste')
        cy.get('#phone').type('123456789')
        cy.get('button[type="submit"]').click()

        cy.get('.error').should('be.visible')
    })

    it('campo telefone continua vazio quando preenchido com valor nao-numerico', function() {
        cy.get('#phone')
            .type('asdasfs')
            .should('have.value', '')
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatorio mas nao e preenchido antes do envio do formulario', function() {
        cy.get('#firstName').type('joel')
        cy.get('#lastName').type('rocha')
        cy.get('#email').type('joel@example.com')
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type('teste')
        cy.get('button[type="submit"]').click()

        cy.get('.error').should('be.visible')
    })

    it('preenche e limpa os campos obrigatorios', function() {
        cy.get('#firstName')
            .type('joel')
            .should('have.value', 'joel')
            .clear()
            .should('have.value', '')
        cy.get('#lastName')
            .type('rocha')
            .should('have.value', 'rocha')
            .clear()
            .should('have.value', '')
        cy.get('#email')
            .type('joel@example.com')
            .should('have.value', 'joel@example.com')
            .clear()
            .should('have.value', '')
        cy.get('#phone')
            .type('123456789')
            .should('have.value', '123456789')
            .clear()
            .should('have.value', '')
    })

    it('exibe mensagem de erro ao submeter o formulario sem preencher os campos obrigatorios', function() {
        cy.get('button[type="submit"]').click()
        
        cy.get('.error').should('be.visible')
    })

    it('envia o formulario com sucesso usando comandos customizados para evitar repetição de comandos', function() {
        cy.fillMandatoryFieldAndSubmit1()

        cy.get('.success').should('be.visible')
    })

    it('envia o formulario com sucesso usando comandos customizados com variaveis', function() {
        cy.fillMandatoryFieldAndSubmit('joel', 'rocha', 'joelrocha@example.com', 'texto', '123')

        cy.get('.success').should('be.visible')
    })

    it('usando a função contains', function() {
        cy.contains('button', 'Enviar').click()
        
        cy.get('.error').should('be.visible')
    })

    it('Seleciona um produto youtube por seu texto', function() {
        cy.get('#product')
            .select('YouTube')
            .should('have.value', 'youtube')
    })

    it('Seleciona um produto mentoria por seu valor com uma variavel', function() {
        const selectMentoria = 'mentoria'
        cy.get('#product')
            .select(selectMentoria)
            .should('have.value', selectMentoria)
    })

    it('Seleciona um produto blog por seu indice', function() {
        cy.get('#product')
            .select(1)
            .should('have.value', 'blog')
    })

    it('marca o tipo de atendimento "Feedback"', function() {
        cy.get('input[type="radio"]').check('feedback')
            .should('have.value', 'feedback')
    })

    it('marca cada tipo de atendimento', function() {
        cy.get('input[type="radio"]').check('feedback')
            .should('be.checked', 'feedback')
        cy.get('input[type="radio"]').check('elogio')
            .should('be.checked', 'elogio')
        cy.get('input[type="radio"]').check('ajuda')
            .should('be.checked', 'ajuda')
    })

    it('marca cada tipo de atendimento com each e wrap', function() {
        cy.get('input[type="radio"]')
            .should('have.length', 3)   // legth é o comprimento e verifica que tem três radio
            .each(function($radio) {    // o each vai pegar cada um dos elementos $radio
                cy.wrap($radio).check()   // o wrap vai empacotar cada um dos $radio e dar um check em todos
                cy.wrap($radio).should('be.checked')   // e depois verificar que todos foram marcados         
            })
    })

    it('marca ambos checkboxes, depois desmarca o último', function() {
        cy.get('input[type="checkbox"]').check()
            .should('be.checked')
            .last()
            .uncheck()
            .should('not.be.checked')
    })

    it('seleciona um arquivo da pasta fixtures', function() {
        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('cypress/fixtures/example.json')
            .should(function($input) {
                console.log($input)
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })

    it('seleciona um arquivo simulando um drag-and-drop', function() {
        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('cypress/fixtures/example.json', { action: 'drag-drop' })  //selecionar um arquivo com arrasta e solta
            .should(function($input) {
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function() {
        cy.fixture("example.json").as('sampleFile')   // fazer um alias com fixture e as
        cy.get('input[type="file"]')
            .selectFile('@sampleFile')   // colocar o alias criado com @ na frente
            .should(function($input) {
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })

    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function() {
        cy.get('#privacy a').should('have.attr', 'target', '_blank')
    })

    it('acessa a página da política de privacidade removendo o target e então clicando no link', function() {
        cy.get('#privacy a')
            .invoke('removeAttr', 'target')
            .click()

        cy.contains('Talking About Testing').should('be.visible')
    })
    
  })