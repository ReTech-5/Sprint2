// Lista de usuários
var listaUsuarios = [{
  nome: "Lucas Quevedo",
  email: "lucas.castro@sptech.gov",
  senha: "Polenta7?",
  nivel: "Administrador",
}, {
  nome: "Samara Freitas",
  email: "samara.farias@sptech.gov",
  senha: "Chocolate9.",
  nivel: "Administrador",
}, {
  nome: "Gleison Almeida",
  email: "gleison.almeida@sptech.gov",
  senha: "OrdemParanormal20!",
  nivel: "Padrão",
}, {
  nome: "Pedro Cardoso",
  email: "pedro.cardoso@sptech.gov",
  senha: "Formula1)",
  nivel: "Padrão",
}, {
  nome: "Gabriel Pereira",
  email: "gabriel.pereira@sptech.gov",
  senha: "Espanhol12$",
  nivel: "Padrão",
}, {
  nome: "Arthur Rodrigues",
  email: "arthur.rodrigues@sptech.gov",
  senha: "Minecraft33#",
  nivel: "Administrador",
}];

var validado = false
var tamanhoListaUsuarios = listaUsuarios.length;

function entrar() {
  var email = ipt_email.value.trim().toLowerCase();
  var senha = ipt_senha.value.trim();
  var certo = 0;
  var errado = 0;

  for (var i = 0; i < tamanhoListaUsuarios; i++) {
    var usuario = listaUsuarios[i];
    if (email == usuario.email && senha == usuario.senha) {
      certo++;
    }
    else {
      errado++;
    }
  }

  console.log(certo);
  console.log(errado);

  if (email == "" || senha == "") {
    div_erro.innerHTML = "Todos os campos devem estar preenchidos antes de prosseguir!";
  }
  else if (certo == 0) {
    div_erro.innerHTML = "Este usuário não existe!";
  }
  else {
    window.location.href = "perfil.html";
  }
}

function verSenha() {
  if (ipt_senha.type == "password") {
    ipt_senha.type = "text";
    icone_olho.classList.remove("fa-eye");
    icone_olho.classList.add("fa-eye-slash");
  }
  else {
    ipt_senha.type = "password";
    icone_olho.classList.remove("fa-eye-slash");
    icone_olho.classList.add("fa-eye");
  }
}