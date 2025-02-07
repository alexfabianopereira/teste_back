//Cenário 1: Validar o status da resposta da API
//Objetivo: Garantir que a chamada para a lista de APIs retorne um status de resposta HTTP 200 (OK).

//Passos:
//Enviar uma requisição GET para o endpoint /api_list.
//Verificar se a resposta tem um status code 200.
//Validar o corpo da resposta (ex: verificar se a lista de APIs não está vazia)

//Cenário 2: Validar o formato da resposta
//Objetivo: Validar se a resposta da API está retornando os dados no formato JSON esperado.

//Passos:
//Enviar uma requisição GET para o endpoint /api_list.
//Verificar se o cabeçalho Content-Type é application/json.
//Validar se a resposta contém um campo esperado (ex: api_name).

//Cenário 3: Validar a estrutura dos dados retornados
//Objetivo: Validar se cada item retornado pela API contém os campos obrigatórios.

//Passos:
//Enviar uma requisição GET para o endpoint /api_list.
//Validar que cada objeto na resposta possui os campos 

describe('Validar Status da Resposta da API', () => {
  it('Deve retornar status 200 para a requisição GET /api_list', () => {
    cy.request('GET', 'https://automationexercise.com/api_list')
      .its('status')
      .should('eq', 200);
  });
});

describe('Validar Formato da Resposta da API', () => {
  it('Deve retornar resposta no formato JSON com campo api_name', () => {
    cy.request('GET', 'https://automationexercise.com/api_list')
      .its('headers')
      .its('content-type')
      .should('include', 'application/json');
    
    cy.request('GET', 'https://automationexercise.com/api_list')
      .its('body')
      .should('be.an', 'array')
      .and('have.length.greaterThan', 0)
      .each((api) => {
        expect(api).to.have.property('api_name');
      });
  });
});

describe('Validar Estrutura dos Dados Retornados', () => {
  it('Deve retornar cada item com os campos api_name, api_description, api_url, e api_type', () => {
    cy.request('GET', 'https://automationexercise.com/api_list')
      .its('body')
      .should('be.an', 'array')
      .and('have.length.greaterThan', 0)
      .each((api) => {
        expect(api).to.have.property('api_name');
        expect(api).to.have.property('api_description');
        expect(api).to.have.property('api_url');
        expect(api).to.have.property('api_type');
      });
  });
});