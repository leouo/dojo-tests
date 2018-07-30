var express = require('express');
var app = express();

app.get('/imc', (req, res) => {
    const altura = req.query.altura;
    const peso = req.query.peso;
    
    const imc = new Number((peso / (altura * altura)).toFixed(2));

    console.log(imc);

    res.json({ imc });
});

app.listen(8888);
