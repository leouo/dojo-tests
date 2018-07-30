require('jasmine');

let imc = require('./imc');
let nock = require('nock')

let IMCMock = {};

describe('O módulo de IMC:', () => {
    beforeEach(() => {
        nock('http://localhost:8888/')
            .get('/imc')
            .query(true)
            .reply(200, IMCMock);
    });

    afterEach(() => {
        nock.cleanAll();
    });

    IMCMock = { imc: 23.89 };
    it('Deve calcular o IMC com base no peso e altura', async () => {
        expect(await imc.getIMC(80, 1.83)).toEqual({ imc: 23.89});
    });

    IMCMock = { imc: 15 };
    it('Deve retornar a classificação "Magro"', async () => {
        expect(await imc.getClassification(50, 1.83)).toBe('Magro');
    });

    IMCMock = { imc: 23 };
    it('Deve retornar a classificação "Normal"', async () => {
        expect(await imc.getClassification(80, 1.83)).toBe('Normal');
    });

    IMCMock = { imc: 50 };
    it('Deve retornar a classificação "Sobrepeso"', async () => {
        expect(await imc.getClassification(90, 1.83)).toBe('Sobrepeso');
    });
});
