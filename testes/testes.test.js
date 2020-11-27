const testes = require('../funcoes/testes');

describe('Testar validade semântica do CPF', () => {
  it('valor nulo', () => {
    expect(testes.cpf('')).toBe(false);
  });

  it('valores alfanuméricos (letras e números)', () => {
    expect(testes.cpf('a256f8965ff')).toBe(false);
  });

  it('dez caracteres numéricos', () => {
    expect(testes.cpf('1256589658')).toBe(false);
  });

  it('doze caracteres numéricos', () => {
    expect(testes.cpf('125632565689')).toBe(false);
  });

  it('CPF numérico inválido', () => {
    expect(testes.cpf('55896589658')).toBe(false);
  });

  it('CPF com tipagem diferente de String', () => {
    expect(testes.cpf(37885788822)).toBe(false);
  });

  it('CPF válido', () => {
    expect(testes.cpf('37885788822')).toBe(true);
  });
});

describe('Testar validade semântica do E-mail', () => {
  it('E-mail com valor nulo', () => {
    expect(testes.email('')).toBe(false);
  });

  it('E-mail com valor com tipagem diferente de String', () => {
    expect(testes.email(0)).toBe(false);
  });

  it('E-mail inválido', () => {
    expect(testes.email('email.com')).toBe(false);
  });

  it('E-mail válido', () => {
    expect(testes.email('email@email.com')).toBe(true);
  });
});

describe('Testar se data está no formato brasileiro separado por barras "/"', () => {
  it('Data com valor numérico zero', () => {
    expect(testes.dataBrl(0)).toBe(false);
  });

  it('Data com valor nulo', () => {
    expect(testes.dataBrl('')).toBe(false);
  });

  it('Data inválida', () => {
    expect(testes.dataBrl('25/10/202r')).toBe(false);
  });

  it('Data correta em formato SQL (aaaa/mm/dd)', () => {
    expect(testes.dataBrl('2020/05/01')).toBe(false);
  });

  it('Data inválida separada por traços ( - )', () => {
    expect(testes.dataBrl('1989-25-02')).toBe(false);
  });

  it('Data com a máscara correta porém inexistente', () => {
    expect(testes.dataBrl('30/02/2020')).toBe(false);
  });

  it('Data com formato BRL porém separada por traços', () => {
    expect(testes.dataBrl('28-02-2020')).toBe(false);
  });

  it('Data válida no formato BRL', () => {
    expect(testes.dataBrl('28/02/2020')).toBe(true);
  });
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

describe('Verificar se senha está de acordo com as regras', () => {
  it('Senha com menos de 10 caracteres', () => {
    expect(testes.senha('aA2*ppppp')).toBe(false);
  });

  it('Senha com mais de 10 caracteres', () => {
    expect(testes.senha('aA2*ppppppppppppppppp')).toBe(false);
  });

  it('Senha sem uma letra maiúscula', () => {
    expect(testes.senha('aa2*pppppp')).toBe(false);
  });

  it('Senha sem números', () => {
    expect(testes.senha('aAa*pppppp')).toBe(false);
  });

  it('Senha sem asterisco', () => {
    expect(testes.senha('aA2apppppp')).toBe(false);
  });

  it('Senha com caracteres especiais além do asterisco', () => {
    expect(testes.senha('*A2a/ppppp')).toBe(false);
  });

  it('Senha válida', () => {
    expect(testes.senha('aA2*pppppp')).toBe(true);
  });
});

describe('Exemplo de um teste com mock para demonstração', () => {
  it('Teste mock', () => {
    const terceiro = jest.fn();
    terceiro.mockReturnValue(1);
    expect(testes.funcaoTerceira(10, terceiro)).toBe(11);
  });
});
