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
cep CHAR(9)									-- Código postal (CEP)
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
    REFERENCES Empresa(idEmpresa),
fkEndereco INT,								-- Local onde o sensor está instalado
	CONSTRAINT fkSensorEndereco 
    FOREIGN KEY (fkEndereco)
    REFERENCES Endereco(idEndereco)
);

/*
Tabela Contato

- Representa os contatos da ReTech(clientes)
*/
CREATE TABLE Contato(
idContato INT AUTO_INCREMENT NOT NULL, 		-- Identificador único do contato
email VARCHAR(45),							-- E-mail do contato
telefone VARCHAR(12),  						-- Telefone celular
telefoneFixo VARCHAR(11), 					-- Telefone Fixo
fkEmpresa INT,           					-- Chave estrangeira
	CONSTRAINT fkContatoEmpresa				-- Nome da Constrant
    FOREIGN KEY (fkEmpresa)
    REFERENCES Empresa(idEmpresa),			-- Empresa à qual o contato pertence
PRIMARY KEY (idContato, fkEmpresa)		    -- Estabelecendo uma entidade fraca
);

/*
Tabela Usuário
Representam os operadores das empresas ou o administrador 
*/
CREATE TABLE Usuario(
idUsuario INT PRIMARY KEY AUTO_INCREMENT, 	-- Identificador do usúario
nome VARCHAR(100),							-- Nome do usuário
email VARCHAR(100),							-- E-mail de login
senha VARCHAR(100),							-- Senha do acesso
fkAdministrador INT,						-- Auto-relacionamento (usuário administrador)
	CONSTRAINT fkUsuarioAdministrador 			
	FOREIGN KEY (fkAdministrador)
	REFERENCES Usuario(idUsuario),
fkEmpresa INT,								-- Empresa a que o usuário pertence
	CONSTRAINT fkUsuarioEmpresa
    FOREIGN KEY (fkEmpresa)
    REFERENCES Empresa(idEmpresa)
);

/*
Tabela: ColetaDados

Registra todas as leituras feitas pelos sensores
No diagrama, corresponde à comunicação entre
sistema de coleta de dados (Arduino) e o Banco de Dados.
*/
CREATE TABLE ColetaDados(
idColeta INT AUTO_INCREMENT UNIQUE NOT NULL,	-- Identificador da coleta
distancia DECIMAL(5,2),							-- Distância medida  (nível de resíduo)
horaColeta TIME,								-- Hora da leitura
dataColeta DATE, 								-- Data da leitura
fkSensor INT,									-- Sensor que coletou os dados
	CONSTRAINT fkColetaDadosSensor
    FOREIGN KEY (fkSensor)
    REFERENCES Sensor(idSensor),
PRIMARY KEY (idColeta, fkSensor)				-- Estabelecendo uma entidade fraca
);

-- Inserções de dados

INSERT INTO Empresa (nomeEmpresa, dtInicioContrato, dtFimContrato) VALUES
('EcoLog Transportes', '2024-11-01', '2025-11-01');

INSERT INTO Endereco (logradouro, numero, cep) VALUES
('Avenida Paulista', 1578, '01310-200'),
('Parque Ibirapuera', 0, '04094-010');

INSERT INTO Sensor (codigoSensor, `status`, fkEmpresa, fkEndereco) VALUES
('SNSR-B002', 1, 1, 1),
('SNSR-C001', 1, 1, 2), 
('SNSR-C002', 0, 1, 2);

INSERT INTO Contato (email, telefone, fkEmpresa) VALUES
('financeiro@ecolog.com', '11912345678', 1);

INSERT INTO Usuario (nome, email, senha, fkEmpresa) VALUES
('Gestor EcoLog', 'gestor@ecolog.com', 'eco123', 1);

INSERT INTO Usuario (nome, email, senha, fkAdministrador, fkEmpresa) VALUES
('Fiscal Parque', 'fiscal@ecolog.com', 'eco456', 1, 1);

INSERT INTO Sensor (codigoSensor, `status`, fkEmpresa, fkEndereco) VALUES
('A2315', 0, 1, 1);

INSERT INTO Sensor (codigoSensor, `status`, fkEmpresa, fkEndereco) VALUES
('B4915', 1, 1, 1);

# Estado: Crítico
    
SELECT C.distancia AS 'Nível do Resíduo (cm)',
       S.codigoSensor,
       E.nomeEmpresa,
       CONCAT('STATUS: ', 'CRÍTICO! Esvaziamento Urgente!') AS 'Status da Lixeira'
FROM ColetaDados AS C
JOIN Sensor AS S ON C.fkSensor = S.idSensor
JOIN Empresa AS E ON S.fkEmpresa = E.idEmpresa
WHERE C.distancia <= 25
ORDER BY C.distancia ASC;    
    
# Estado: Alerta

SELECT C.distancia AS 'Nível do Resíduo (cm)',
	   S.codigoSensor,
       E.nomeEmpresa,
       CONCAT('STATUS: ', 'ALERTA! Nível Alto de Resíduo.') AS 'Status da Lixeira'
FROM ColetaDados AS C
JOIN Sensor AS S ON C.fkSensor = S.idSensor
JOIN Empresa AS E ON S.fkEmpresa = E.idEmpresa
WHERE C.distancia > 25 AND C.distancia <= 50
ORDER BY C.distancia ASC;
    
# Estado: Moderado    

SELECT C.distancia AS 'Nível do Resíduo (cm)',
	   S.codigoSensor,
       E.nomeEmpresa,
       CONCAT('STATUS: ', 'MODERADO. Monitorar.') AS 'Status da Lixeira'
FROM ColetaDados AS C
JOIN Sensor AS S ON C.fkSensor = S.idSensor
JOIN Empresa AS E ON S.fkEmpresa = E.idEmpresa
WHERE C.distancia > 50 AND C.distancia <= 75
ORDER BY C.distancia ASC;
    
# Estado: Estável
    
SELECT C.distancia AS 'Nível do Resíduo (cm)',
       S.codigoSensor,
       E.nomeEmpresa,
       CONCAT('STATUS: ', 'ESTÁVEL. Nível Baixo de Resíduo.') AS 'Status da Lixeira'
FROM ColetaDados AS C
JOIN Sensor AS S ON C.fkSensor = S.idSensor
JOIN Empresa AS E ON S.fkEmpresa = E.idEmpresa
WHERE C.distancia > 75
ORDER BY C.distancia ASC;


SELECT CONCAT('Erro 404 - sensor ', S.codigoSensor, ' se encontra inativo') AS Mensagem_Alerta
FROM Sensor AS S
WHERE S.status = 0 
AND S.codigoSensor = 'A2315';

    
SELECT CONCAT('Alerta - Lixeira ', S.codigoSensor, ' se encontra em estado crítico') AS Mensagem_Alerta
FROM ColetaDados AS C
JOIN Sensor AS S ON C.fkSensor = S.idSensor
WHERE C.distancia <= 25
AND S.codigoSensor = 'SNSR-A001' 
GROUP BY S.codigoSensor;

-- Usuários e administradores

SELECT U.nome AS 'Nome do Usuário Operador',
       U.email AS 'Login do Operador',
       E.nomeEmpresa,
       ADM.nome AS 'Administrador Responsável',
       CONCAT('Operador da empresa ', E.nomeEmpresa) AS 'Descrição'
FROM Usuario AS U
JOIN Empresa AS E ON U.fkEmpresa = E.idEmpresa
JOIN Usuario AS ADM ON U.fkAdministrador = ADM.idUsuario
ORDER BY E.nomeEmpresa, U.nome;



