@account
Feature: Registro e Login no site
    
    Background: Acessar o site especifico
        Given que um usuário acesse o site desejado

    @CT-THS01
    Scenario: Realiza o cadastro
        When direcionar até a pagina de Cadastro, preencher o e-mail e as informações necessarias para o cadastro
        And clicar no botão "Register"
        Then o usuário será registrado com sucesso e será direcionado para a página inicial da conta

    @CT-THS02
    Scenario: Valida informar e-mail existente na tela de cadastro
        When direcionar até a pagina de Cadastro e informar um e-mail já cadastrado
        And clicar no botão "Create an account"
        Then o usuário receberá um alerta de erro informando "An account using this email address has already been registered. Please enter a valid password or request a new one."

    @CT-THS03
    Scenario: Validar e-mail inválido na tela de cadastro
        When direcionar até a pagina de Cadastro e informar um e-mail inválido
        And clicar no botão "Create an account"
        Then o usuário receberá um alerta de erro informando "Invalid email address."

    @CT-THS04
    Scenario: Validar cadastro de campos obrigatórios na tela de cadastro
        When direcionar até a pagina de Cadastro
        And não preencher os campos obrigatórios 'First name, Last name, Email e Password' 
        And clicar no botão "Register"
        Then o usuário receberá um alerta de erro "There are 4 errors" e deve exibir os campos obrigatórios no alerta de erro
