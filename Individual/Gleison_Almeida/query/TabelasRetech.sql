-- Criação do banco de dados
CREATE DATABASE ReTech;

-- Seleciona o banco de dados para uso
USE ReTech;

/*
Tabela Empresa

- Armazena os dados das empresas que contratam o sistema ReTech
- Cada empresa tem sensores, usúarios e contatos associados 
*/
CREATE TABLE Empresa( 
idEmpresa INT PRIMARY KEY AUTO_INCREMENT, 	-- Identificador único da empresa
nomeEmpresa VARCHAR(45),					-- Nome da empresa
dtInicioContrato DATE,						-- Data de início do contato
dtFimContrato DATE							-- Data do fim do contrato
);

/*
Tabela Endereco
- Armazena os locais onde os sensores estão instalados
- No diagrama de solução representa o ponto físico das lixeiras
*/
CREATE TABLE Endereco(
idEndereco INT PRIMARY KEY AUTO_INCREMENT, 	-- Identificador único do endereço
logradouro VARCHAR(45),						-- Rua, avenida ou local
numero INT,									-- Número do local 
cep CHAR(9),								-- Código postal (CEP)																																						
);

/*
Tabela Sensor

- Armazena os sensores instalados nas lixeiras
- Cada sensor coleta dados de distância (nível do lixo) e envia
via API para o banco de dados
*/
CREATE TABLE Sensor(
idSensor INT PRIMARY KEY AUTO_INCREMENT,	-- identificador do sensor
codigoSensor VARCHAR(45),					-- Código/Identificador do sensor
`status` TINYINT,                           -- Status da lixeira (1 = Ativada, 0 = Desativado)
fkEmpresa INT,								-- Empresa responsável
	CONSTRAINT fkSensorEmpresa
    FOREIGN KEY (fkEmpresa)
    REFERENCES empresa(idEmpresa),
fkEndereco INT,								-- Local onde o sensor está instalado
	CONSTRAINT fkSensorEndereco 
    FOREIGN KEY (fkEndereco)
    REFERENCES endereco(idEndereco)
);

/*
Tabela Contato

- Representa os contatos da ReTech(clientes)
*/
CREATE TABLE Contato(
idContato INT AUTO_INCREMENT NOT NULL, 	-- Identificador único do contato
email VARCHAR(45),								-- E-mail do contato
telefone VARCHAR(12),  							-- Telefone celular
telefoneFixo VARCHAR(11), 						-- Telefone Fixo
fkEmpresa INT,           						-- Chave estrangeira
	CONSTRAINT fkContatoEmpresa					-- Nome da Constrant
    FOREIGN KEY (fkEmpresa)
    REFERENCES empresa(idEmpresa),				-- Empresa à qual o contato pertence
PRIMARY KEY (idContato, fkEmpresa)		    	-- Estabelecendo uma entidade fraca
);

/*
Tabela Usúario
Representam os operadores das empresas ou o administrador 
*/
CREATE TABLE Usuario(
idUsuario INT PRIMARY KEY AUTO_INCREMENT, 		-- Identificador do usúario
nome VARCHAR(100),								-- Nome do usuário
email VARCHAR(100),								-- E-mail de login
senha VARCHAR(100),								-- Senha do acesso
fkAdministrador INT,							-- Auto-relacionamento (usuário administrador)
	CONSTRAINT fkUsuarioAdministrador 			
	FOREIGN KEY (fkAdministrador)
	REFERENCES usuario(idUsuario),
fkEmpresa INT,									-- Empresa a que o usuário pertence
	CONSTRAINT fkusuarioEmpresa
    FOREIGN KEY (fkEmpresa)
    REFERENCES empresa(idEmpresa)
);

/*
Tabela: ColetaDados

Registra todas as leituras feitas pelos sensores
No diagrama, corresponde à comunicação entre
sistema de coleta de dados (Arduino) e o Banco de Dados.
*/
CREATE TABLE ColetaDados(
idColeta INT AUTO_INCREMENT UNIQUE NOT NULL,		-- Identificador daa coleta
distancia DECIMAL(3,2),								-- Distância medida  (nível de resíduo)
horaColeta TIME,									-- Hora da leitura
dataColeta DATE, 									-- Data da leitura
fkSensor INT,										-- Sensor que coletou os dados
	CONSTRAINT fkColetaDadosSensor
    FOREIGN KEY (fkSensor)
    REFERENCES sensor(idSensor),
    PRIMARY KEY (idColeta, fkSensor)				-- Estabelecendo uma entidade fraca
);


