var listaCaracteresEspeciais = [
  "!",
  "@",
  "#",
  "$",
  "%",
  "¨¨",
  "&",
  "*",
  "(",
  ")",
  "_",
  "-",
  "+",
  "=",
  "{",
  "}",
  "ª",
  "[",
  "]",
  "~",
  "^",
  ":",
  ";",
  ".",
  ",",
  "?",
  "°",
  "/",
];

// Lista de usuários
var listaUsuarios = [];
listaUsuarios.push({
  nome: "Claudio Frizzarini",
  email: "Claudio@prefeituraSP.com",
  senha: "Frizza123",
  nivel: "Administrador",
});
listaUsuarios.push({
  nome: "Julia Araripe",
  email: "Julia@prefeituraCampinas.com",
  senha: "Julia123",
  nivel: "Padrão",
});

// Filtro atual
var filtro = "todos";

// Div da tabela
var tabelaDivConteudo = ""; // Variável que vai armazenar o HTML da tabela

// Função para "renderizar" tabela dentro da div
function mostrarTabela() {
  tabelaDivConteudo =
    "<table class='tabela'><tr><th>Nome</th><th>E-mail</th><th>Senha</th><th>Nível</th></tr>";

  var cont = 0;
  var tamanhoListaUsuario = listaUsuarios.length;
  while (cont < tamanhoListaUsuario) {
    var usuario = listaUsuarios[cont];
    var mostrar = false;

    if (filtro == "todos") {
      mostrar = true;
    } else if (usuario.nivel.toLowerCase() == filtro) {
      mostrar = true;
    }

    if (mostrar == true) {
      tabelaDivConteudo +=
        "<tr>" +
        "<td>" +
        usuario.nome +
        "</td>" +
        "<td>" +
        usuario.email +
        "</td>" +
        "<td>" +
        usuario.senha +
        "</td>" +
        "<td>" +
        usuario.nivel +
        "</td>" +
        "</tr>";
    }

    cont++;
  }

  tabelaDivConteudo = tabelaDivConteudo + "</table>";

  // Atualiza o conteúdo da div
  tabelaDiv.innerHTML = tabelaDivConteudo;
}

// Função para renderizar o card de cadastro
function novoUsuario() {
  main_container.innerHTML += `
  <div class="card_cadastro">

    <div class="card_cadastro_header">
      Cadastro de Usuario
    </div>

    <div class="card_cadastro_body">
      <div class="campo_cadastro">
        <label for="ipt_nome" class="lbl_cadastro">Nome</label>
        <input placeholder="Insira um nome..." type="text" id="ipt_nome" class="ipt_cadastro">
      </div>

      <div class="campo_cadastro">
        <label for="ipt_email" class="lbl_cadastro">E-mail</label>
        <input placeholder="Insira um e-mail..." type="text" id="ipt_email" class="ipt_cadastro">
      </div>

      <div class="campo_cadastro">
        <label for="ipt_senha" class="lbl_cadastro">Senha</label>
        <input placeholder="Insira uma senha..." type="password" id="ipt_senha" class="ipt_cadastro">
      </div>

      <div class="campo_cadastro">
        <label for="slc_nivel" class="lbl_cadastro">Nível de Acesso</label>
        <select name="" id="slc_nivel" class="ipt_cadastro">
          <option>Padrão</option>
          <option>Administrador</option>
          <option selected disabled value>Selecione um nível</option>
        </select>
      </div>
      <br>
      <button onclick="cadastrar()" id="btn_cadastrar" class="button">Cadastrar</button>
      <br>
      <div id='div_erro'></div>
    </div>
  </div>
  `;
}

// Função para cadastrar novo usuário
function cadastrar() {
  var nome = ipt_nome.value;
  var email = ipt_email.value;
  var senha = ipt_senha.value;
  var nivel = slc_nivel.value;

  var tamanhoSenha = senha.length;
  var senhaMaiuscula = senha.toUpperCase();
  var senhaMinuscula = senha.toLowerCase();
  var temCaracteresEspeciais = 0;
  var temNumeros = 0;
  var mensagem = "";
  var cont = 0;

  while (cont < tamanhoSenha) {
    if (listaCaracteresEspeciais.includes(senha[cont]) == true) {
      temCaracteresEspeciais++;
    }
    if (!isNaN(senha[cont])) {
      temNumeros++;
    }
    cont++;
  }

  if (nome == "" || email == "" || senha == "" || nivel == "") {
    mensagem = "Todos os campos devem estar preenchidos antes de prosseguir!";
  } else if (
    !email.includes("@") ||
    tamanhoSenha < 8 ||
    senha == senhaMaiuscula ||
    senha == senhaMinuscula ||
    temNumeros == 0 ||
    temCaracteresEspeciais == 0
  ) {
    if (!email.includes("@")) {
      mensagem = "- E-mail deve conter @<br>";
    }
    if (temNumeros == 0) {
      mensagem += "- Senha deve conter número<br>";
    }
  } else {
    usuarios.push({ nome: nome, email: email, senha: senha, nivel: nivel });
    mostrarTabela();
  }

  div_erro.innerHTML = mensagem;
}

// Função para editar usuário
function editarUsuario() {
  mostrarTabela();
  var id = prompt("Digite o ID do usuário que deseja editar:");
  var idNum = id * 1; // converte string em número

  if (idNum < 0 || idNum >= usuarios.length || id == "") {
    alert("ID inválido!");
  } else {
    var u = usuarios[idNum];
    var novoNome = prompt("Editar nome:", u.nome);
    var novoEmail = prompt("Editar e-mail:", u.email);
    var novoNivel = prompt("Editar nível:", u.nivel);

    if (novoNome && novoEmail && novoNivel) {
      usuarios[idNum].nome = novoNome;
      usuarios[idNum].email = novoEmail;
      usuarios[idNum].nivel = novoNivel;
      mostrarTabela();
    } else {
      alert("Todos os campos são obrigatórios!");
    }
  }
}

// Funções de filtro
function filtrarTodos() {
  filtro = "todos";
  mostrarTabela();
}
function filtrarAdmin() {
  filtro = "administrador";
  mostrarTabela();
}
function filtrarPadrao() {
  filtro = "padrão";
  mostrarTabela();
}

// Inicializa
mostrarTabela();
