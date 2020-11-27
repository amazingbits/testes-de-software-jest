const testes = require('../funcoes/testes');

test('Testar validade semantica do CPF', () => {
  expect(testes.cpf('')).toBe(false);
  expect(testes.cpf('a256f8965ff')).toBe(false);
  expect(testes.cpf('1256589658')).toBe(false);
  expect(testes.cpf('125632565689')).toBe(false);
  expect(testes.cpf('55896589658')).toBe(false);
  expect(testes.cpf(0)).toBe(false);
  expect(testes.cpf(37885788822)).toBe(false);
  expect(testes.cpf('37885788822')).toBe(true);
});

test('Testar validade semantica do Email', () => {
  expect(testes.email('')).toBe(false);
  expect(testes.email(0)).toBe(false);
  expect(testes.email('email@email.com')).toBe(true);
  expect(testes.email('email.com')).toBe(false);
});

test('Testar se data está no formato brasileiro separado por barras "/"', () => {
  expect(testes.dataBrl(0)).toBe(false);
  expect(testes.dataBrl('')).toBe(false);
  expect(testes.dataBrl('25/10/202r')).toBe(false);
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
  expect(testes.senha('*A2a/ppppp')).toBe(false);
  expect(testes.senha('aA2*ppppppppppppppppp')).toBe(false);
  expect(testes.senha('aA2*pppppp')).toBe(true);
});

test('exemplo de mock', () => {
  const terceiro = jest.fn();
  terceiro.mockReturnValue(1);
  expect(testes.funcaoTerceira(10, terceiro)).toBe(11);
});
