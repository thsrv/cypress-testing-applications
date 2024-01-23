/// <reference types="Cypress" />

const { ctibor, xayrullo } = require("gender-detection/genders/male");


const locators = {
    BTN_HOME: 'li > .btn > span',
    MENU_WOMEN: '.sf-menu > :nth-child(1) > [href="http://www.automationpractice.pl/index.php?id_category=3&controller=category"]',
    FIRST_PRODUCT_LIST: '#center_column > ul > li:nth-child(1) > div > div.right-block > h5 > a',
    NAME_PRODUCT: '#center_column > div > div > div.pb-center-column.col-xs-12.col-sm-4 > h1',
    PRICE_PRODUCT: '#our_price_display',
    PRODUCT_AVAILABILITY: '#availability_value',
    LABEL_QUANTITY: "#quantity_wanted_p > label",
    INPUT_QUANTITY_DESIRED: '#quantity_wanted',
    BTN_QUANTITY_MIN: '.icon-minus',
    BTN_QUANTITY_MAX: '.icon-plus',
    LABEL_SIZE_PRODUCT: ':nth-child(2) > .attribute_label',
    SELECT_SIZE_PRODUCT_CURRENT: '#uniform-group_1 > span',
    SELECT_SIZE_PRODUCT: '#group_1',
    LABEL_COLOR: ':nth-child(3) > .attribute_label',
    COLOR_OPTION_YELLOW: '#color_13',
    BTN_ADD_CART: '.exclusive > span',
    TXT_CONFIRM_CART_PRODUCT: '.layer_cart_product > h2',
    BTN_PROCED_CHECKOUT: '.button-medium > span',
    BTN_CONTINUE_SHOP: '.continue > span',
    TXT_TITLE_CART_SUMMARY: '#cart_title',
    CURRENT_STATUS_BAR: '.step_current > span',
    NAME_PRODUCT_RESUME: '.cart_description > .product-name > a',
    AMOUNT_TOTAL_PRODUCT: '#total_product',
    AMOUNT_TOTAL_SHIPPING: '#total_shipping',
    AMOUNT_TOTAL_ORDER: '#total_price',
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

    constructor(productName,productPrice,quantity){
        this.productName = productName;
        this.productPrice = productPrice;
        this.productQtd = quantity; 
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
            cy.get(locators.FIRST_PRODUCT_LIST).click();
        });
    }

    insertProductInforTheOrder(quantity,size){
        let indexNumber;
        switch(size){
            case 'S':
                indexNumber=0;
                break;
            case 'M':
                indexNumber=1;
                break;
            case 'L':
                indexNumber=2;
                break;
            default:
                throw new Error(`Tamanho não reconhecido: ${size}`);
        }
        cy.get(locators.NAME_PRODUCT).should('be.visible').invoke('text').then((productName)=>{
            this.productName = productName;
        });
        cy.get(locators.PRICE_PRODUCT).should('be.visible').invoke('text').then((productPrice)=>{
            this.productPrice = productPrice;
        });
        cy.get(locators.LABEL_QUANTITY).should('be.visible');
        cy.get(locators.INPUT_QUANTITY_DESIRED).clear().type(quantity);
        cy.get(locators.LABEL_SIZE_PRODUCT).should('be.visible');
        cy.get(locators.SELECT_SIZE_PRODUCT_CURRENT).should('be.visible').then(($el)=>{
            const actualValue = $el.text().trim();
            if(actualValue !== size){
                cy.get(locators.SELECT_SIZE_PRODUCT).select(indexNumber);
            }
        });
        this.productQtd = quantity;
        cy.get(locators.LABEL_COLOR).should('be.visible');
        cy.get(locators.COLOR_OPTION_YELLOW).click();
    }

    toCheckProductStock(){
        cy.get(locators.PRODUCT_AVAILABILITY).should('include.text','In stock');
    }

    addProduct(){
        cy.get(locators.BTN_ADD_CART).should('be.visible').click().then(()=>{
            cy.get(locators.TXT_CONFIRM_CART_PRODUCT).should('be.visible');
            cy.get(locators.BTN_PROCED_CHECKOUT).should('be.visible').click();
        });
    }

    resumeMyOrder(amountDelevery){
        cy.get(locators.TXT_TITLE_CART_SUMMARY).should('be.visible');
        cy.get(locators.AMOUNT_TOTAL_PRODUCT).should('contain', this.productPrice);
        cy.get(locators.NAME_PRODUCT_RESUME).should('contain',this.productName);
        const productPriceNum = parseFloat(String(this.productPrice).replace('$', ''));
       
        const totalOrder = (productPriceNum * this.productQtd) + amountDelevery;
        cy.get(locators.AMOUNT_TOTAL_ORDER)
            .should('be.visible')
            .invoke('text')
            .should('equal','$'+totalOrder.toString());
    }

}

module.exports = new ShoppingScreenPage();