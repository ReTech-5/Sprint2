function validarSenha() {
  div_senha.innerHTML = "";
  var listaCaracteresEspeciais = ["!", "@", "#", "$", "%", "¨¨", "&", "*", "(", ")", "_", "-", "+", "=", "{", "}", "ª", "[", "]", "~", "^", ":", ";", ".", ",", "?", "°", "/"];
  // var listaNumeros = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  var temCaracteresEspeciais = 0;
  var temNumeros = 0;

  var senha = ipt_senha.value;
  var tamanhoSenha = senha.length;
  var senhaMaiuscula = senha.toUpperCase();
  var senhaMinuscula = senha.toLowerCase();

  var mensagem = "";
  var cont = 0;
  var criterios = 0;

  while (cont < tamanhoSenha) {
    if (listaCaracteresEspeciais.includes(senha[cont]) == true) {
      temCaracteresEspeciais++;
    }
    cont++;
  }
  cont = 0;
  while (cont < tamanhoSenha) {
    if (!isNaN(senha[cont])) {
      temNumeros++;
    }
    cont++;
  }

  if (senha == "") {
    div_senha.innerHTML = "Preencha o campo de senha";
  }
  else {
    // Validar se a senha possui mais que 8 caracteres
    if (senha.length >= 8) {
      criterios++;
      div_senha.innerHTML += "<span style='color: green;'>- A senha deve conter ao menos 8 caracteres</span><br>";
    }
    else {
      div_senha.innerHTML += "- A senha deve conter ao menos 8 caracteres<br>";
    }
    // Validar se a senha possui uma letra maiúscula
    if (senha != senhaMinuscula) {
      criterios++;
      div_senha.innerHTML += "<span style='color: green;'>- A senha deve conter uma letra maiúscula</span><br>";
    }
    else {
      div_senha.innerHTML += "- A senha deve conter uma letra maiúscula<br>";
    }
    // Validar se a senha possui uma letra minúscula
    if (senha != senhaMaiuscula) {
      criterios++;
      div_senha.innerHTML += "<span style='color: green;'>- A senha deve conter uma letra minúscula</span><br>";
    }
    else {
      div_senha.innerHTML += "- A senha deve conter 1 letra minúscula<br>";
    }
    // Validar se a senha possui um número
    if (temNumeros != 0) {
      criterios++;
      div_senha.innerHTML += "<span style='color: green;'>- A senha deve conter um número</span><br>";
    }
    else {
      div_senha.innerHTML += "- A senha deve conter um número<br>";
    }
    // Validar se a senha possui um caracter especial
    if (temCaracteresEspeciais != 0) {
      criterios++;
      div_senha.innerHTML += "<span style='color: green;'>- A senha deve conter um caracter especial</span><br>";
    }
    else {
      div_senha.innerHTML += "- A senha deve conter um caracter especial<br>";
    }
  }
}

function validarEmail() {
  var email = ipt_email.value;

  if (email == "") {
    div_email.innerHTML = "Preencha o campo de email";
  }
  else {
    div_email.innerHTML = "";
    habilitar++;
  }
}

function validar() {
  alert("Login Válido");
}