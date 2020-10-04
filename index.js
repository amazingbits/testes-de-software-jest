const express = require('express');
const app = express();
const port = 9999;

const testes = require('./funcoes/testes');

let senha = '999999senhaqualqueR*1';
let testarSenha = testes.senha(senha);

/**
 * Rotas
 */
app.get('/', (req, res) => {
  res.send(testarSenha);
});

/**
 * Iniciando servidor
 */
app.listen(port, () => {
  console.log('Servidor iniciado!');
});
