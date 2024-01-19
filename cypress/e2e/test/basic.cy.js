/// <reference types="cypress"/>

describe('Cypress basics', () => {
    it('Acessar uma pagina e validar o titulo', ()=>{
        cy.visit('https://www.wcaquino.me/cypress/componentes.html');
        
        cy.title()
            .should('equal','Campo de Treinamento')
            .and('contain','Campo')

    })

})