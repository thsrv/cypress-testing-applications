/// <reference types="Cypress" />
import { cyndy } from 'gender-detection/genders/female';
import '../commands'
import { loc } from 'gender-detection/genders/male';

//Mapeamentos da pagina
const locators = {
    OPT_LOGIN: '.login',
    TXT_CREATE_ACCOUNT:'#create-account_form > .page-subheading',
    TXT_EMAIL: '#create-account_form > .form_content > .form-group > label',
    INPUT_CREATE_EMAIL: '#email_create',
    BTN_CREATE_ACCOUNT: '#SubmitCreate > span',
    FORM_CREATE_ACCOUNT: '.page-subheading',
    LABEL_GENDER: '.account_creation > .clearfix > :nth-child(1)',
    CHECK_GENDER_OP: '#id_gender',
    LABEL_FIRSTNAME: '.account_creation > :nth-child(3) > label',
    INPUT_FIRSTNAME: '#customer_firstname',
    LABEL_LASTNAME: '.account_creation > :nth-child(4) > label',
    INPUT_LASTNAME: '#customer_lastname',
    LABEL_EMAIL: ':nth-child(5) > label',
    INPUT_EMAIL: '#email',
    LABEL_PASS: '.password > label',
    INPUT_PASS: '#passwd',
    BTN_REGISTER: '#submitAccount > span',
    TARGE_ALERT: '.alert',
    ALERT_ERROR_ACCOUNT: '#create_account_error',
    TXT_ERROR_ACCOUNT: 'ol > li',
    PARAGRAPH_ERROR: '.alert > p',
    LIST_ERROR: 'ol > :nth-child(index)',//Lembrar o index sera usado para fazer o replace para o numero desejado
    BTN_LOGIN: '#SubmitLogin > span',
    TXT_NAME_ACCOUNT: '.account > span',

}



class LoginPage { 
    acessWebsite(){
        cy.clearCookies();
        cy.visit('/');
    }

    accountCreation(){
        const genderDetection = require('gender-detection');

        let lastName, firstName, op ;
        let gender = ''; 
        cy.get(locators.OPT_LOGIN).click().wait(1000);
        cy.get(locators.TXT_CREATE_ACCOUNT).should('have.text', 'Create an account');
        cy.generateEmailRandom().then((email) => {
            // email = emailGene;

            const userName = email.split('@')[0];
            const names = userName.split(/[\W_]+|(?=[A-Z])/);

            firstName = names.shift().replace(/[^a-zA-Z]/g, '');
            //Verifica qual o genero do nome.
            gender = genderDetection.detect(firstName);
            lastName = names.join('').replace(/[^a-zA-Z]/g, '');
            if(!lastName){
                lastName = 'Teste';
            }
            cy.get(locators.INPUT_CREATE_EMAIL).type(email);
        }).then(()=>{
            cy.get(locators.BTN_CREATE_ACCOUNT).click().wait(2000);
        
            if(gender.toLowerCase() === 'MALE'){
                op = 1;
            }else{
                op = 2;
            }
            cy.get(locators.FORM_CREATE_ACCOUNT).should('be.visible');
            cy.get(locators.LABEL_GENDER).should('be.visible');
            cy.get(`${locators.CHECK_GENDER_OP}${op}`).click();//Para lembrar: Concatenar mapeamento usar o `${map}${var}`
            cy.get(locators.LABEL_FIRSTNAME).should('be.visible');
            cy.get(locators.INPUT_FIRSTNAME).type(firstName);
            cy.get(locators.LABEL_LASTNAME).should('be.visible');
            cy.get(locators.INPUT_LASTNAME).type(lastName);
            cy.get(locators.LABEL_PASS).should('be.visible');
            cy.get(locators.INPUT_PASS).type(Cypress.env('Account').pass,{log:false});

        });  
    }

    clickButton(btnName){
        let button;
        switch(btnName){
            case 'Create an account':
                button = locators.BTN_CREATE_ACCOUNT;
                break;
            case 'Register':
                button = locators.BTN_REGISTER;
                break;
            case 'Sign in':
                button = locators.BTN_LOGIN;
                break;
            default:
                throw new Error(`Botão não reconhecido: ${btnName}`);
        }
        cy.get(button).click().then(()=>{
            cy.log(`Botão ${button} foi clicado.`).wait(1000);
        });
    }

    validateUserWasCreated(msg){
        cy.get(locators.TARGE_ALERT).should('contain', msg);
    }
    
    validateUrlWebSite(specificUrl){
        cy.url().should('include',specificUrl);
    }

    generateAndInsertEmail(){
        cy.generateEmailRandom().then((email)=>{
            this.insertValueCreateEmail(email);
        });
    }
    insertValueCreateEmail(email){
        cy.get(locators.INPUT_CREATE_EMAIL).type(email);
    }

    existingEmailErrorDisplay(msgError){
        cy.get(locators.ALERT_ERROR_ACCOUNT).should('be.visible').then(()=>{
            cy.get(locators.TXT_ERROR_ACCOUNT).should('contain',msgError);
        })
    }

    goLoginScreen(){
        cy.get(locators.OPT_LOGIN).click().wait(1000);
    }

    notFillTheFields(){
        cy.get(locators.INPUT_FIRSTNAME).should('have.value', '');
        cy.get(locators.INPUT_LASTNAME).should('have.value', '');
        cy.get(locators.INPUT_EMAIL).clear().then(()=>{
            cy.get(locators.INPUT_EMAIL).should('have.value', '');
        });
        cy.get(locators.INPUT_PASS).should('have.value', '');
        }

    validateRequiredErrorAlerts(msg){
        const fieldsName = ['lastname','firstname','email','passwd']
        cy.get(locators.TARGE_ALERT).should('be.visible');
        for(var i=1; i<=4; i++){
            cy.get(locators.LIST_ERROR.replace('index', i)).should('be.visible').should('contain',fieldsName[i-1]);
        }
    }

    loginWithUser(){
        cy.get(locators.INPUT_EMAIL).type(Cypress.env('Account').email);
        cy.get(locators.INPUT_PASS).type(Cypress.env('Account').pass,{log:false});
    }

    validateLoginSuccess(){
        cy.get(locators.TXT_NAME_ACCOUNT).invoke('text').should('eq',Cypress.env('Account').name);
    }
}

module.exports = new LoginPage();