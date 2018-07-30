// peso / (altura * altura)
// Magro (< 19); Normal (> 19 < 25); Sobrepeso (> 25)
let { URL, URLSearchParams } = require('url');
let fetch = require('isomorphic-fetch');

const getIMC = (peso, altura) => {
  const IMC_API_URL = new URL('http://localhost:8888/imc');
  
  IMC_API_URL.search = new URLSearchParams({ peso, altura });

  return fetch(IMC_API_URL.href)
    .then(res => res.json())
    .then(json => {
      return json;
  });
};

const getClassification = async (peso, altura) => {
  const { imc } = await getIMC(peso, altura);

  if (imc < 19) {
    return 'Magro';
  } else if (imc > 19 && imc < 25) {
    return 'Normal';
  } else {
    return 'Sobrepeso';
  }
}

module.exports = { getIMC, getClassification };
