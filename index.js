var imc = require('./imc');

imc.getClassification(50, 1.83)   
    .then(classification => console.log(classification))
