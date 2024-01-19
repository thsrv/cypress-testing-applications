/// <reference types="cypress"/>

it.only('A external test...',() => {

})

describe('Should group test...', () => {
    describe('Should group specific test...', () =>{
        it.skip('A specific test...', () => {

        })
    })
    describe('Should group more specific test 2', () => {
        it('A specific test2...', () => {

        })
    })

    it("A internal test...", () => {

    })
})