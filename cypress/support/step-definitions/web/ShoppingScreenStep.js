/// <reference types="Cypress" />

import {Given, And, When, Then} from "cypress-cucumber-preprocessor/steps";
const shoppingScreenPage = require("../../page/ShoppingScreenPage");


Given(/^esteja na pagina inicial do site$/, () => {
    shoppingScreenPage.goHome(1000);
});


When(/^usuário selecionar a categoria desejada$/, () => {
    shoppingScreenPage.selectMenuWomen();
});

When(/^exibir a lista de itens e selecionar o produto para visualizar os detalhes$/, () => {
	shoppingScreenPage.selectItem(1);
});

When(/^usuário selecionar a quantidade, tamanho e cor desejada$/, () => {
    shoppingScreenPage.insertProductInforTheOrder('1','M');
});

When(/^usuário verifica se o produto tem estoque$/, () => {
	shoppingScreenPage.toCheckProductStock();
});

When(/^clicar em "([^"]*)" e prosseguir para o checkout com o produto no carrinho$/, (args1) => {
	shoppingScreenPage.addProduct(false);
});

When(/^usuário validar as informações de valores no resumo da compra$/, () => {
	shoppingScreenPage.resumeMyOrder(7);
	shoppingScreenPage.advanceStepOrder();
});

When(/^selecionar o endereço de entrega "([^"]*)" e prosseguir para o checkout aceitando os termos de serviço$/, (adress) => {
	shoppingScreenPage.selectAddressDelivery(adress);
	shoppingScreenPage.checkAdressDelivery();
	shoppingScreenPage.advanceStepOrder();
	shoppingScreenPage.acceptTerms();
	shoppingScreenPage.advanceStepOrder();
});

When(/^usuário selecionar e confirmar a forma de pagamento$/, () => {
	shoppingScreenPage.selectPayBank();
	shoppingScreenPage.advanceStepOrder();

});

Then(/^o site deve realizar a compra do produto com sucesso "([^"]*)"$/, (msg) => {
	shoppingScreenPage.validateOrderSucess(msg);
});

When(/^selecionar "([^"]*)" produtos da lista no carrinho de compras$/, (qtdProduct) => {
	for(var id = 1; id <= qtdProduct; id++ ){
		shoppingScreenPage.selectItem(id);
		shoppingScreenPage.insertProductInforTheOrder('1','M');
		if(id==qtdProduct){
			shoppingScreenPage.addProduct(false);
		}else{
			shoppingScreenPage.addProduct(true);
			shoppingScreenPage.selectMenuWomen();
		}
	}
});


And(/^usuário finalizar a compra$/, () => {
	for(var step=1; step<=4;step++){
		if(step==3){
			cy.log("termo")
			shoppingScreenPage.acceptTerms();
		}else if(step==4){
			cy.log("pagamento")
			shoppingScreenPage.selectPayBank();
		}
		shoppingScreenPage.advanceStepOrder();
	}
});

Then(/^o site deve realizar a compra dos produtos com sucesso$/, () => {
	shoppingScreenPage.validateOrderSucess('Your order on My Shop is complete.');
});


When(/^usuário navegar até a guia de descontos especial e visualizar os produtos$/, () => {
	shoppingScreenPage.selectMenuWomen();
	shoppingScreenPage.goToSpecialProducts();
});


When(/^selecionar o produto com o desconto maior$/, () => {
	shoppingScreenPage.selectProductTheBestDiscount();
});


When(/^adicionar ao carrinho e finalizar a compra$/, () => {
	shoppingScreenPage.insertProductInforTheOrder('1','M');
	shoppingScreenPage.addProduct(false);
	for(var step=1; step<=4;step++){
		if(step==3){
			cy.log("termo")
			shoppingScreenPage.acceptTerms();
		}else if(step==4){
			cy.log("pagamento")
			shoppingScreenPage.selectPayBank();
		}
		shoppingScreenPage.advanceStepOrder();
	}
});

