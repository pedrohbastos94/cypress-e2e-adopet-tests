describe('Login', () => {
    beforeEach(()=>{
         cy.visit('https://adopet-frontend-cypress.vercel.app/');
         cy.get('[data-test="login-button').click();  
         cy.intercept('POST', 'https://adopet-api-i8qu.onrender.com/adotante/login', {
            statusCode:400, }).as('stubPost')
        })
    

  it('Deve preencher os campos de login corretamente e autenticar o suário na página', () => {
      
       cy.login('ana@email.com', 'Senha123')
       
  })
  it('Verifica mensagem de falha no login', () => {
        cy.get('[data-test="submit-button"]').click()
        cy.contains('É necessário informar um endereço de email').should('be.visible')
        cy.contains('Insira sua senha').should('be.visible')
    })

    it('Deve falhar mesmo que os campos sejam preenchidos corretamente', ()=> {
        cy.login('ana@email.com', 'Senha123')
        cy.wait('@stubPost')
        cy.contains('Falha no login. Consulte suas credenciais.').should('be.visible')
    })
    it('Deve fazer o login, primeiro clicando no icone no header, e preenchendo os campos de login corretamente',()=>{
         cy.visit('https://adopet-frontend-cypress.vercel.app/');
         cy.get('[aria-label="Ir para Mensagens"]').click()
         cy.login('ana@email.com', 'Senha123')
    })
    
})