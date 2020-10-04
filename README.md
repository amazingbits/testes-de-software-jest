## PESQUISA

Trata-se de uma pesquisa da disciplina de **Testes de Software**. A pesquisa
consiste em trazer uma ferramenta de testes e fazer uma pequena apresentação
à turma. A ferramenta que escolhemos foi o **JEST**.

## O JEST

Jest é uma estrutura de teste de JavaScript mantida pelo Facebook, Inc. com foco na simplicidade. Trabalha com projetos usando: Babel, TypeScript, Node.js, React, Angular, Vue.js e Svelte. O objetivo é funcionar fora da caixa e sem configuração.

## ARQUIVOS COM OS ALGORITMOS DE TESTES

```js
module.exports = {
  /** 
  @params sCpf @type string 
  @return false ou true  @type boolean 
  */
  cpf(sCpf) {
    if (typeof sCpf !== 'string') return false;
    cpf = sCpf.replace(/[\s.-]*/gim, '');
    if (
      !cpf ||
      cpf.length != 11 ||
      cpf == '00000000000' ||
      cpf == '11111111111' ||
      cpf == '22222222222' ||
      cpf == '33333333333' ||
      cpf == '44444444444' ||
      cpf == '55555555555' ||
      cpf == '66666666666' ||
      cpf == '77777777777' ||
      cpf == '88888888888' ||
      cpf == '99999999999'
    ) {
      return false;
    }
    var soma = 0;
    var resto;
    for (var i = 1; i <= 9; i++)
      soma = soma + parseInt(cpf.substring(i - 1, i)) * (11 - i);
    resto = (soma * 10) % 11;
    if (resto == 10 || resto == 11) resto = 0;
    if (resto != parseInt(cpf.substring(9, 10))) return false;
    soma = 0;
    for (var i = 1; i <= 10; i++)
      soma = soma + parseInt(cpf.substring(i - 1, i)) * (12 - i);
    resto = (soma * 10) % 11;
    if (resto == 10 || resto == 11) resto = 0;
    if (resto != parseInt(cpf.substring(10, 11))) return false;
    return true;
  },
  /** 
  @params sEmail @type string 
  @return false ou true  @type boolean 
  */
  email(sEmail) {
    const email = String(sEmail);
    const usuario = email.substring(0, email.indexOf('@'));
    const dominio = email.substring(email.indexOf('@') + 1, email.length);

    if (
      usuario.length >= 1 &&
      dominio.length >= 3 &&
      usuario.search('@') == -1 &&
      dominio.search('@') == -1 &&
      usuario.search(' ') == -1 &&
      dominio.search(' ') == -1 &&
      dominio.search('.') != -1 &&
      dominio.indexOf('.') >= 1 &&
      dominio.lastIndexOf('.') < dominio.length - 1
    ) {
      return true;
    } else {
      return false;
    }
  },
  /**
   *
   * @param sData @type String
   * @returns bool
   */
  dataBrl(sData) {
    const regex = /[^0-9/ ]/gi;
    let data = sData.replace('-', '');
    data = data.replace(regex, '');

    if (data.length !== 10) {
      return false;
    }

    const dataGroup = data.split('/');
    const dia = Number(dataGroup[0]);
    const mes = Number(dataGroup[1]);
    const ano = Number(dataGroup[2]);

    if (dia < 1 || dia > 31) return false;
    if (mes < 0 || mes > 12) return false;
    if (mes === 2 && dia > 29) return false;
    if (ano < 1500) return false;

    return true;
  },
  /**
   * @param sSenha @type String
   * @returns bool
   */
  senha(sSenha) {
    const regex = /[^0-9A-Za-z *]/gi;
    let senha = sSenha.replace(regex, '');

    if (senha.length < 10 || senha.length > 20) return false;
    if (senha.search(/[A-Z]/) === -1) return false;
    if (senha.search(/[0-9]/) === -1) return false;
    if (senha.search(/[*]/) === -1) return false;

    return true;
  },
};
```

**cpf** - Testa se o formato da String que foi inserida como entrada
corresponde ao formato do CPF.

**email** - Testa se o formato da String que foi inserida como entrada
corresponde a um email válido.

**dataBrl** - Testa se o formato da String que foi inserida como entrada
corresponde a formato brasileiro de data "dd/mm/aaaa".

**senha** - Verifica se a string que foi inserida como entrada corresponde
às seguintes regras:

[x] - Precisa ter entre 10 e 20 caracteres
[x] - Precisa ter pelo menos uma letra maiúscula
[x] - Preciso ter pelo menos um número
[x] - Precisa ter pelo menos um asterisco
[x] - Não pode conter qualquer outro caracter especial que não
seja o asterisco

## ARQUIVO COM OS TESTES DO JEST (test.js)

```js
const testes = require('../funcoes/testes');

test('Testar validade semantica do CPF', () => {
  expect(testes.cpf('37885788822')).toBe(true);
  expect(testes.cpf('55896589658')).toBe(false);
});

test('Testar validade semantica do Email', () => {
  expect(testes.email('email@email.com')).toBe(true);
  expect(testes.email('email.com')).toBe(false);
});

test('Testar se data está no formato brasileiro separado por barras "/"', () => {
  expect(testes.dataBrl('2020/05/01')).toBe(false);
  expect(testes.dataBrl('1989-25-02')).toBe(false);
  expect(testes.dataBrl('30/02/2020')).toBe(false);
  expect(testes.dataBrl('28-02-2020')).toBe(false);
  expect(testes.dataBrl('28/02/2020')).toBe(true);
});

/* REGRAS DA SENHA */
/**
 * 1 - Precisa ter entre 10 e 20 caracteres
 * 2 - Precisa ter pelo menos uma letra maiúscula
 * 3 - Preciso ter pelo menos um número
 * 4 - Precisa ter pelo menos um asterisco
 * 5 - Não pode conter qualquer outro caracter especial que
 *     não seja o asterisco
 */
test('Verificar se a senha está de acordo com as regras', () => {
  expect(testes.senha('aA2*ppppp')).toBe(false);
  expect(testes.senha('aa2*pppppp')).toBe(false);
  expect(testes.senha('aAa*pppppp')).toBe(false);
  expect(testes.senha('aA2apppppp')).toBe(false);
  expect(testes.senha('aA2a/ppppp')).toBe(false);
  expect(testes.senha('aA2*ppppppppppppppppp')).toBe(false);
  expect(testes.senha('aA2*pppppp')).toBe(true);
});
```

## CONFIGURAÇÃO DO JEST PARA RODAR OS TESTES

```shell
yarn init && yarn add --dev jest
```

package.json

```json
{
  "name": "exercicio",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "test": "jest"
  },
  "license": "MIT"
}
```

## RODAR TESTE

```shell
yarn test
```
