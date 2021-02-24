describe("First", () => {
    
    it(">> Deve ser possivel somar 2 numeros e retornar 4", () => {
        expect(2 + 2).toBe(4);
    });

    it(">> Deve ser possivel somar 2 numeros e não retornar 5", () => {
        expect(2 + 2).not.toBe(5);
    });

})