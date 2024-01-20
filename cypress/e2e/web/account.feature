@ACCOUNT
Feature: Registro e Login de Conta no site
    
    Background: Acessar o site especifico
        Given que um usuário acesse o site desejado

    @CT-AC01
    Scenario: Realiza o cadastro
        When direcionar até a pagina de Cadastro, preencher o e-mail e as informações necessarias para o cadastro
        And clicar no botão "Register"
        Then o usuário será registrado com sucesso e será direcionado para a página inicial da conta

    @CT-AC02
    Scenario: Valida informar e-mail existente na tela de cadastro
        When direcionar até a pagina de Cadastro e informar um e-mail já cadastrado
        And clicar no botão "Create an account"
        Then valida o retorno do alerta de erro informando "An account using this email address has already been registered. Please enter a valid password or request a new one."

    @CT-AC03
    Scenario: Validar e-mail inválido na tela de cadastro
        When direcionar até a pagina de Cadastro e informar um e-mail inválido
        And clicar no botão "Create an account"
        Then valida o retorno do alerta de erro informando "Invalid email address."

    @CT-AC04
    Scenario: Validar cadastro de campos obrigatórios na tela de cadastro
        When direcionar até a pagina de Cadastro
        And não preencher os campos obrigatórios 'First name, Last name, Email e Password' 
        And clicar no botão "Register"
        Then valida o retorno do alerta de erro "There are 4 errors" e deve exibir os campos obrigatórios no alerta de erro

    @CT-AC05
    Scenario: Validar login com usuário válido
        When direcionar até a pagina de Login
        And usuário preencher o e-mail e senha
        And clicar no botão "Sign in"
        Then valida que o login realizado com sucesso e direcionado para a página inicial da conta

    @CT-AC06
    Scenario: Login com usuário incorreto
        When direcionar até a pagina de Login
        And usuário preencher o e-mail e senha incorreto
        And clicar no botão "Sign in"
        Then valida o retorno do alerta de erro de falha na autenticação
    
    @CT-AC07
    Scenario: Validar login sem preencher a senha
        When direcionar até a pagina de Login
        And usuário não preencher o campo "Password" obrigatório
        And clicar no botão "Sign in"
        Then valida o retorno do alerta de erro do campo "Password is required."

    @CT-AC08
    Scenario: Validar login sem preencher o email
        When direcionar até a pagina de Login
        And usuário não preencher o campo "Email" obrigatório
        And clicar no botão "Sign in"
        Then valida o retorno do alerta de erro do campo "An email address required."