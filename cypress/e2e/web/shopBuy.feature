@SHOPBUY
Feature: Compra de produtos no site
    
    Background: Acessa e realiza o login no site
        Given que um usuário acesse o site desejado
        And realiza o Login com usuário especifico
        And esteja na pagina inicial do site
     
    @CT-SB01
    Scenario: Realizar a compra de 1 produto para o endereço My Home
        When usuário selecionar a categoria desejada
        And exibir a lista de itens e selecionar o produto para visualizar os detalhes
        And usuário selecionar a quantidade, tamanho e cor desejada
        And usuário verifica se o produto tem estoque
        And clicar em "Add to cart" e prosseguir para o checkout com o produto no carrinho
        And usuário validar as informações de valores no resumo da compra
        And selecionar o endereço de entrega "My home" e prosseguir para o checkout aceitando os termos de serviço
        And usuário selecionar e confirmar a forma de pagamento
        Then o site deve realizar a compra do produto com sucesso "Your order on My Shop is complete."

    @CT-SB02
    Scenario: Realizar a compra mais de 2 produtos
        When usuário selecionar a categoria desejada
        And selecionar "3" produtos da lista no carrinho de compras
        And usuário finalizar a compra 
        Then o site deve realizar a compra dos produtos com sucesso

    @CT-SB03
    Scenario: Realizar a compra do produto com o melhor desconto
        When usuário navegar até a guia de descontos especial e visualizar os produtos
        And selecionar o produto com o desconto maior
        And adicionar ao carrinho e finalizar a compra
        Then o site deve realizar a compra do produto com sucesso "Your order on My Shop is complete."
