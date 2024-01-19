/// <reference types="cypress"/>

it('Equality', ()=>{
    const a = 1;

    expect(a).equal(1);
    expect(a, 'Deveria ser 1').equal(1);
    expect(a).to.be.equal(1);
    expect('a').not.to.be.equal('b');
})

it('Truthy', ()=>{
    const a = true;
    const b = null;
    let c;

    expect(a).to.be.true;
    expect(b).to.be.null;
    expect(a).to.be.not.null;
    expect(c).to.be.undefined;

})

it('Object equality', () => {
    const obj ={
        a: 1,
        b: 2
    }

    expect(obj).equal(obj)
    expect(obj).equals(obj)
    expect(obj).eq(obj)
    //Verifica as propriedades dentro do objeto
    expect(obj).to.be.deep.equal({a:1,b:2})
    expect(obj).eql({a:1,b:2})
    //Verifica se contem a propriedade b:2 
    expect(obj).include({b:2})
    //verifica se possui a propriedade b e se o valor é 2
    expect(obj).to.have.property('b', 2)
    //Verifica se objeto não está vazio
    expect(obj).to.not.be.empty

})

it('Array', () => {
    const arr = [1,2,3];
    //Verifica se possui os valores abaixo no array
    expect(arr).to.have.members([1,2,3])
    //Verifica se contem algum dos valores
    expect(arr).to.include.members([1,3])
    //Verifica se o array não está vazio
    expect(arr).not.empty
    //Verifica se está vazio
    expect([]).empty
})

it('Types', () =>{
    const num = 1;
    const str = 'String';
    //Verifica se a variavel num é do tipo number
    expect(num).a('number');
    expect(str).a('string');
    expect({}).an('object');
    expect([]).a('array');
})

it('String', () => {
    const str = 'String de teste';

    expect(str).equal('String de teste')
    //Verifica o tamanho da string
    expect(str).length(15)
    expect(str).contains('de')
    //Verifica se a string inicia com a palavra String via regex ^
    expect(str).match(/^String/)
    //Verifica se a string finaliza com a palavra teste via regex $
    expect(str).match(/teste$/)
    //Verifica se existe apenas letras na string via regex /\w+
    expect(str).match(/\w+/)

})

it('Numbers', () =>{
    const number = 4;
    const floatNumber = 5.2123;

    //Verifica se o valor da variavel está acima de
    expect(number).above(3);
    //Verifica se está abaixo de 7
    expect(number).below(7);
    //Verifica se o numero é proximo ao 5.2 com a precisao de 0.1
    expect(floatNumber).closeTo(5.2, 0.1);
})