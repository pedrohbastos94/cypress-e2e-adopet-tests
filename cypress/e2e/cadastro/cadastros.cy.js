describe('Cadastro de Usuário', () => {

  beforeEach(() => {
    cy.visit('https://adopet-frontend-cypress.vercel.app/');
    cy.contains('a', 'Cadastrar').click();
  });

  it('Deve cadastrar um novo usuário com dados válidos', () => {
    cy.cadastroCorreto('Ana de Jesus', 'ana@email.com', 'Senha123');
   
  });

  it('Deve exibir mensagens de erro ao enviar formulário vazio', () => {
    cy.get('[data-test="submit-button"]').click();

    cy.contains('É necessário informar um endereço de email').should('be.visible');
    cy.contains('Crie uma senha').should('be.visible');
    cy.contains('Repita a senha criada acima').should('be.visible');
  });

});