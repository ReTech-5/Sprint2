
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
var temCaracteresEspeciais = 0;
var temNumeros = 0;

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

  var i = 0;
  var tamanhoListaUsuario = listaUsuarios.length;
  while (i < tamanhoListaUsuario) {
    var usuario = listaUsuarios[i];
    var mostrar = false;

    if (filtro == "todos") {
      mostrar = true;
    } else if (usuario.nivel.toLowerCase() == filtro) {
      mostrar = true;
    }

    if (mostrar == true) {
      tabelaDivConteudo =
        tabelaDivConteudo +
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

    i++;
  }

  tabelaDivConteudo = tabelaDivConteudo + "</table>";

  // Atualiza o conteúdo da div
  tabelaDiv.innerHTML = tabelaDivConteudo;
}

// Função para renderizar o card de cadastro
function TelaCadastro(){

  main_container.innerHTML += `
  <div class="card_cadastro">
                <div class="card_title">
                    Cadastro de Usuario
                </div>

                <p>
                    A senhas devem conter Letras Maiusculas, Minusculas, Caracteres Especiais,
                    Numeros e 8 ou mais caracteres
                </p>

                <div class="div_cadastro">
                    <label for="ipt_nome">Informe seu nome</label>
                    <input placeholder="Nome" type="text" name="" id="ipt_nome" class="ipt">
                </div>
                <div class="div_cadastro">
                    <label for="ipt_email">Informe seu email</label>
                    <input placeholder="Email" type="text" name="" id="ipt_email" class="ipt">
                    <div id="erro_email" class="div_erro">email invalido</div>
                </div>
                <div class="div_cadastro">
                    <label for="ipt_senha">Informe sua senha</label>
                    <input placeholder="Senha" type="password" name="" id="ipt_senha" class="ipt">
                    <div id="erro_senha" class="div_erro">senha errada</div>
                </div>
                <div class="div_cadastro">
                    <label for="slc_acesso">Nivel de acesso</label>
                    <select name="" id="slc_acesso" class="ipt">
                        <option>Padrão</option>
                        <option>Administrador</option>
                    </select>
                </div>

                <button onclick="Conexao" class="button">Cadastrar</button>

            </div>
  `

}

// Função para cadastrar novo usuário
function novoUsuario() {
  TelaCadastro()

  var nome = prompt("Digite o nome do novo usuário:");
  if (nome == "") {
    alert("Nome obrigatório!");
  } else {
    var email = prompt("Digite o e-mail:");

    if (email == "") {
      alert("E-mail obrigatório!");
    } else if (!email.includes("@")) {
      alert("E-mail deve conter @!");
    } else {
      var senha = prompt("Digite a senha:");

      while (cont < tamanhoSenha) {
        if (listaCaracteresEspeciais.includes(senha[cont]) == true) {
          temCaracteresEspeciais++;
        }
        if (!isNaN(senha[cont])) {
          temNumeros++;
        }
        cont++;
      }

      if (senha == "") {
        alert("E-mail obrigatório!");
      } else if (senha) {
      }

      var nivel = prompt("Informe o nível de acesso (Administrador/Padrão):");

      if (!nivel) {
        alert("Nível obrigatório!");
      } else if (nivel != "Administrador" && nivel != "Padrão") {
        alert("Nível diferente das opções disponíveis: Administrador/Padrão!");
      } else {
        usuarios.push({ nome: nome, email: email, senha: senha, nivel: nivel });
        mostrarTabela();
      }
    }
  }
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
