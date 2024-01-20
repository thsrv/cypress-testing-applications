/// <reference types="Cypress" />

import {Given, And, When, Then} from "cypress-cucumber-preprocessor/steps";
const loginPage = require("../../page/LoginPage");


Given('que um usuário acesse o site desejado', () =>{
    loginPage.acessWebsite();
});

And('realiza o Login com usuário especifico',() =>{
    loginPage.goLoginScreen();
    loginPage.loginWithUser(Cypress.env('Account').email,Cypress.env('Account').pass);
    loginPage.clickButton('Sign in');
})

When('direcionar até a pagina de Cadastro, preencher o e-mail e as informações necessarias para o cadastro', () =>{
    loginPage.accountCreation();
});

And(/^clicar no botão "([^"]*)"$/, (btnName) => {
	loginPage.clickButton(btnName);
});

Then('o usuário será registrado com sucesso e será direcionado para a página inicial da conta', () => {
    loginPage.validateUserWasCreated('Your account has been created.');
    loginPage.validateUrlWebSite('my-account');
});


When('direcionar até a pagina de Cadastro e informar um e-mail já cadastrado', () => {
    loginPage.goLoginScreen();
    loginPage.insertValueCreateEmail(Cypress.env('Account').email);
});

When('direcionar até a pagina de Cadastro e informar um e-mail inválido', () => {
    loginPage.goLoginScreen();
    loginPage.insertValueCreateEmail('123@');
});

Then(/^valida o retorno do alerta de erro informando "([^"]*)"$/, (msgError) => {
	loginPage.existingEmailErrorDisplay(msgError);
});

When('direcionar até a pagina de Cadastro', () => {
    loginPage.goLoginScreen();
    loginPage.generateAndInsertEmail();
    loginPage.clickButton('Create an account');
});

And(/^não preencher os campos obrigatórios 'First name, Last name, Email e Password'$/, () => {
	loginPage.notFillTheFields();
});

Then(/^valida o retorno do alerta de erro "([^"]*)" e deve exibir os campos obrigatórios no alerta de erro$/, (msgError) => {
	loginPage.validateRequiredErrorAlerts();
});

When(/^direcionar até a pagina de Login$/, () => {
    loginPage.goLoginScreen();
});

And(/^usuário preencher o e-mail e senha$/, () => {
    loginPage.loginWithUser(Cypress.env('Account').email,Cypress.env('Account').pass);
});

Then(/^valida que o login realizado com sucesso e direcionado para a página inicial da conta$/, () => {
    loginPage.validateUrlWebSite('my-account');
    loginPage.validateLoginSuccess();
});

And(/^usuário preencher o e-mail e senha incorreto$/, () => {
	loginPage.loginWithUser('emailigtesteth@email.com','Senha@2024');
});

Then(/^valida o retorno do alerta de erro de falha na autenticação$/, () => {
	loginPage.incorrectLoginAlert('Authentication failed');
});

And(/^usuário não preencher o campo "([^"]*)" obrigatório$/, (fieldName) => {
    if(fieldName.toLowerCase() === 'password'){
        loginPage.loginWithUser(Cypress.env('Account').email,null);
    }
    if(fieldName.toLowerCase() === 'email'){
        loginPage.loginWithUser(null,Cypress.env('Account').pass);
    }
});

Then(/^valida o retorno do alerta de erro do campo "([^"]*)"$/, (error) => {
	loginPage.incorrectLoginAlert(error);
});
