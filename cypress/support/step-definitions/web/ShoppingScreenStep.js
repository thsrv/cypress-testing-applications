/// <reference types="Cypress" />

import {Given, And, When, Then} from "cypress-cucumber-preprocessor/steps";
const shoppingSreeenPage = require("../../page/ShoppingScreenPage");


Given(/^esteja na pagina inicial do site$/, () => {
    shoppingSreeenPage.goHome(1000);
});


When(/^usuário selecionar a categoria desejada$/, () => {
    shoppingSreeenPage.selectMenuWomen();
});

When(/^exibir a lista de itens e selecionar o produto para visualizar os detalhes$/, () => {
	shoppingSreeenPage.selectItem();
});

When(/^usuário selecionar a quantidade, tamanho e cor desejada$/, () => {
    shoppingSreeenPage.insertProductInforTheOrder('1','M');
});

When(/^usuário verifica se o produto tem estoque$/, () => {
	shoppingSreeenPage.toCheckProductStock();
});

When(/^clicar em "([^"]*)" e prosseguir para o checkout com o produto no carrinho$/, (args1) => {
	shoppingSreeenPage.addProduct();
});

When(/^usuário validar as informações de valores no resumo da compra$/, () => {
	shoppingSreeenPage.resumeMyOrder(7);
	shoppingSreeenPage.advanceStepOrder();
});

When(/^selecionar o endereço de entrega "([^"]*)" e prosseguir para o checkout aceitando os termos de serviço$/, (adress) => {
	shoppingSreeenPage.selectAddressDelivery(adress);
	shoppingSreeenPage.checkAdressDelivery();
	shoppingSreeenPage.advanceStepOrder();
	shoppingSreeenPage.acceptTerms();
	shoppingSreeenPage.advanceStepOrder();
});

When(/^usuário selecionar e confirmar a forma de pagamento$/, () => {
	shoppingSreeenPage.selectPayBank();
	shoppingSreeenPage.advanceStepOrder();

});

Then(/^o site deve realizar a compra do produto com sucesso "([^"]*)"$/, (msg) => {
	shoppingSreeenPage.validateOrderSucess(msg);
});

