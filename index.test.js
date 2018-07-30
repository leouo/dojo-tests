require('jasmine');

let imc = require('./imc');
let nock = require('nock')

const setAPIMock = mockPayload =>
  nock('http://localhost:8888/')
    .get('/imc')
    .query(true)
    .reply(200, mockPayload);


describe('O módulo de IMC:', () => {
  afterAll(() => {
    nock.cleanAll();
  });

  it('Deve calcular o IMC com base no peso e altura', async () => {
    setAPIMock({ imc: 23.89 });
    expect(await imc.getIMC(80, 1.83)).toEqual({ imc: 23.89});
  });

  it('Deve retornar a classificação "Magro"', async () => {
    setAPIMock({ imc: 15 });
    expect(await imc.getClassification(50, 1.83)).toBe('Magro');
  });

  it('Deve retornar a classificação "Normal"', async () => {
    setAPIMock({ imc: 23 });
    expect(await imc.getClassification(80, 1.83)).toBe('Normal');
  });

  it('Deve retornar a classificação "Sobrepeso"', async () => {
    setAPIMock({ imc: 50 });
    expect(await imc.getClassification(90, 1.83)).toBe('Sobrepeso');
  });
});
