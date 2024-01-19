/// <reference types="Cypress" />

import {Given, And, When, Then} from "cypress-cucumber-preprocessor/steps";
const loginPage = require("../../page/LoginPage");


Given('que um usuário acesse o site desejado', () =>{
    loginPage.acessWebsite();
});

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

Then(/^o usuário receberá um alerta de erro informando "([^"]*)"$/, (msgError) => {
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

Then(/^o usuário receberá um alerta de erro "([^"]*)" e deve exibir os campos obrigatórios no alerta de erro$/, (msgError) => {
	loginPage.validateRequiredErrorAlerts(msgError);
});



