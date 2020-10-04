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
