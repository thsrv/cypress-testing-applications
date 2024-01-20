/// <reference types="Cypress" />

const { ctibor, xayrullo } = require("gender-detection/genders/male");


const locators = {
    BTN_HOME: 'li > .btn > span',
    MENU_WOMEN: '.sf-menu > :nth-child(1) > [href="http://www.automationpractice.pl/index.php?id_category=3&controller=category"]',
    FIRST_PRODUCT_LIST: ':nth-child(1) > .product-container',
    NAME_PRODUCT: 'h1',
    PRICE_PRODUCT: '#our_price_display',
    PRODUCT_AVAILABILITY: '#availability_value',
    LABEL_QUANTITY: "#quantity_wanted_p > label",
    INPUT_QUANTITY_DESIRED: '#quantity_wanted',
    BTN_QUANTITY_MIN: '.icon-minus',
    BTN_QUANTITY_MAX: '.icon-plus',
    LABEL_SIZE_PRODUCT: ':nth-child(2) > .attribute_label',
    COMBO_SIZE_PRODUCT: '#group_1',
    OPT_SIZE_PRODUCT: '#group_1 > option:nth-child({index})',//replace para o valor S=1, M=2 e L=3
    LABEL_COLOR: ':nth-child(3) > .attribute_label',
    COLOR_OPTION_YELLOW: '#color_13',
    ZOOM_PICTURE: '#bigpic',
    CLOSE_ZOOM_PICTURE: '.fancybox-item',
    BTN_ADD_CART: '.exclusive > span',
    TXT_CONFIRM_CART_PRODUCT: '.layer_cart_product > h2',
    BTN_PROCED_CHECKOUT: '.button-medium > span',
    BTN_CONTINUE_SHOP: '.continue > span',
    TXT_TITLE_CART_SUMMARY: '#cart_title',
    CURRENT_STATUS_BAR: '.step_current > span',
    AMOUNT_TOTAL_PRODUCT: '#total_product',
    AMOUNT_TOTAL_SHIPPING: '#total_shipping',
    AMOUNT_PRICE_TOTAL: '#total_price',
    BTN_ADVANCE: '.cart_navigation > .button > span',
    LABEL_ADDRESS_DELIVERY: '.address_delivery > label',
    COMBO_ADDRESS_DELIVERY: '#id_address_delivery',
    LABEL_ADDRESS_BILLING: '.checkbox > label',
    CHECK_BILLING: '#addressesAreEquals',
    LABEL_TERM_SERVICE: '.order_carrier_content > :nth-child(4)',
    CHECK_TERM_SERVICE: '#cgv',
    TYPE_PAYMENT: '.bankwire',
    ALERT_ORDER_COMPLETE: '.alert',
}


class ShoppingScreenPage{

    constructor(){
        this.productName = null;
        this.productPrice = null;
        this.productQtd = null; 
    }

    goHome(time){
        cy.get(locators.BTN_HOME).click().then(()=>{
            cy.wait(time).log('Redirecionando para pagina inicial...');
        });    
    }

    selectMenuWomen(){
        cy.get(locators.MENU_WOMEN).click();
    }

    selectItem(){
        cy.get(locators.FIRST_PRODUCT_LIST).should('be.visible').then(()=>{
            cy.get(locators.FIRST_PRODUCT_LIST).click().then(()=>{
                this.productName = cy.get(locators.NAME_PRODUCT).should('be.visible').invoke('text');
                this.productPrice = cy.get(locators.PRICE_PRODUCT).should('be.visible').invoke('text');
                cy.get(locators.ZOOM_PICTURE).click().then(()=>{
                    cy.wait(2000);
                    cy.get(locators.CLOSE_ZOOM_PICTURE).click();
                });
            });
        });
    }

    insertProductInforTheOrder(quantity,size){
        let indexNumber;
        switch(size){
            case 'S':
                indexNumber=1;
                break;
            case 'M':
                indexNumber=2;
                break;
            case 'L':
                indexNumber=3;
                break;
            default:
                throw new Error(`Tamanho não reconhecido: ${size}`);
        }
        cy.get(locators.LABEL_QUANTITY).should('be.visible');
        cy.get(locators.INPUT_QUANTITY_DESIRED).type(quantity);
        this.productQtd = quantity; 
        cy.get(locators.LABEL_SIZE_PRODUCT).should('be.visible');
        cy.get(locators.COMBO_SIZE_PRODUCT).should('have.text',size).then(($el)=>{
            if($el.text().trim() !== size){
                cy.get(locators.COMBO_SIZE_PRODUCT).click().then(()=>{
                    cy.get(locators.OPT_SIZE_PRODUCT.replace('{index}',indexNumber)).click();
                });
            }
        });
        cy.get(locators.LABEL_COLOR).should('be.visible');
        cy.get(locators.COLOR_OPTION_YELLOW).click();
    }

}

module.exports = new ShoppingScreenPage();