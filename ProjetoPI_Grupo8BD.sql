CREATE DATABASE ProjetoPI2026_01;
USE ProjetoPI2026_01;

/*
Andressa Lustro Lima RA 01261005
Anthony de Sousa Batista RA 01261135
Elisandro Morais Santana RA 01261053
Gustavo Torres de Moraes RA 01261060
Matheus Maceu Ferreira da Silva RA 01261105
Pietro Dell'Arno RA 01261055
Tawan Lander da Fonseca Rodrigues de Paula Moura RA 01261067
*/
-- Tabela 1
CREATE TABLE terreno( -- Referencia empresa
id INT PRIMARY KEY AUTO_INCREMENT, -- Cria uma coluna para armazenar a chave primária da identificação do terreno
qtdTalhoes INT -- Cria uma coluna para armazenar a quantidade de talhões do terreno
);

ALTER TABLE terreno RENAME COLUMN id TO idTerreno; -- Renomeia a coluna id para idTerreno
ALTER TABLE terreno ADD COLUMN tamanhoTerreno DECIMAL(6, 2); -- Adiciona a coluna tamanhoTerreno
ALTER TABLE terreno ADD CONSTRAINT chkQtdTalhoes CHECK(qtdTalhoes >= 0); -- Adiciona uma restrição para que não seja adicionadas uma quantidade negativa de talhões
-- 
UPDATE terreno SET qtdTalhoes = 124 WHERE idTerreno = 2; -- Atualiza a quantidade de talhões para 123 do terreno cujo id é 2
-- 
DESCRIBE terreno; -- Descreve a tabela "terreno" e suas propriedades

INSERT INTO terreno VALUES -- Inserção de dados na tabela "terreno", simulando a entrada de dados na definição de terrenos
	(DEFAULT, 6, 5000),
    (DEFAULT, 2, 1500),
    (DEFAULT, 3, 1000),
    (DEFAULT, 1, 500),
    (DEFAULT, 8, 7500),
    (DEFAULT, 4, 4000),
    (DEFAULT, 7, 5500);

SELECT * FROM terreno; -- Seleciona todos os dados do terreno
SELECT qtdTalhoes AS 'Quantidade de talhões', tamanhoTerreno AS 'Tamanho do terreno' FROM terreno; -- Seleciona dados nomeados
SELECT CONCAT('O terreno ', idTerreno, ' possui ', qtdTalhoes, ' talhões e tem uma área de ', tamanhoTerreno, ' metros²') AS 'Informações de terreno' FROM terreno; -- Seleciona dados concatenados
    
TRUNCATE terreno; -- Elimina todos os dados da tabela

-- Tabela 2
CREATE TABLE talhao( -- Referencia terreno
idTalhao INT PRIMARY KEY AUTO_INCREMENT, -- Cria uma coluna para armazenar
tamanhoTalhao DECIMAL (6, 2), -- Cria uma coluna para armazenar
qtdSensores INT -- Cria uma coluna para armazenar
);
ALTER TABLE talhao RENAME COLUMN tamanhoTalhao TO areaTalhao; -- Renomeia a coluna tamanhoTalhao para areaTalhao
ALTER TABLE talhao ADD CONSTRAINT chkQtdSensores CHECK (qtdSensores >= 0); -- Adiciona uma restrição para que não seja adicionada uma quantidade negativa de sensores
ALTER TABLE talhao ADD CONSTRAINT chkAreaTalhao CHECK (areaTalhao >= 0); -- Adiciona uma restrição para que não seja adicionado um valor negativo na área do talhão
--
UPDATE talhao SET areaTalhao = 100 WHERE idTalhao = 10; -- Atualiza a área do talhão cujo ID é 10 para 100m²
UPDATE talhao SET qtdSensores = 15 WHERE idTalhao = 2; -- Atualiza a quantidade de sensores do talhão cujo ID é 2 para 15
--
DESCRIBE talhao; -- Descreve a tabela "talhao" e suas propriedades

INSERT INTO talhao VALUES -- Inserção de dados na tabela "talhao", simulando a entrada de dados na definição de talhões
	(DEFAULT, 1000, 2),
    (DEFAULT, 1000, 5),
    (DEFAULT, 1000, 3),
    (DEFAULT, 1000, 2),
    (DEFAULT, 500, 2),
    (DEFAULT, 500, 1),
    (DEFAULT, 750, 3),
    (DEFAULT, 750, 2);
    
SELECT areaTalhao AS 'Tamanho do talhão', qtdSensores AS 'Quantidade de sensores' FROM talhao; -- Retorna todos os dados dos talhões
SELECT idTalhao AS 'ID do talhão', areaTalhao AS 'Tamanho do talhão' FROM talhao ORDER BY areaTalhao; -- Retorna os talhões classificados por tamanho em ordem crescente
SELECT idTalhao AS 'ID do talhão', qtdSensores AS 'Quantidade de sensores' FROM talhao ORDER BY qtdSensores; -- Retorna os talhões classificados pela quantidade de sensores em ordem crescente
SELECT areaTalhao AS 'Tamanho do talhão' FROM talhao; -- Retorna somente o tamanho do talhão
SELECT qtdSensores AS 'Quantidade de sensores' FROM talhao; -- Retorna somente a quantidade de sensores
SELECT CONCAT('O talhão ', idTalhao, ' possui ao todo ', qtdSensores, ' sensores instalados em uma área de ', areaTalhao, ' m².') AS 'Informações dos talhões' FROM talhao; -- Retorna informações concatenadas sobre os dados dos talhões

TRUNCATE talhao; -- Elimina todos os dados da tabela

-- Tabela 3
CREATE TABLE sensores( -- Referencia tabela talhão
idSensores INT PRIMARY KEY AUTO_INCREMENT, -- Cria uma coluna para armazenar a chave primária da identificação do sensor
identidade VARCHAR(10), -- Cria uma coluna para armazenar o código de identidade do sensor
altitude VARCHAR(15), -- Cria uma coluna para armazenar a altitude geográfia do sensor
longitude VARCHAR(15) -- Cria uma coluna para armazenar a coordenada geográfia do sensor
);
ALTER TABLE sensores MODIFY COLUMN identidade CHAR(10) UNIQUE; -- Modifica a coluna identidade para receber obrigatoriamente 10 caracteres e armazenar valores únicos, evitando conflitos com identificação duplicada
--
UPDATE sensores SET identidade = '1929ABELK' WHERE idSensores = 1; -- Atualiza o código de identidade do sensor cujo ID é 1
--
DESCRIBE sensores; -- Descreve a tabela "sensores" e suas propriedades

INSERT INTO sensores VALUES -- Inserção de dados na tabela "sensores", simulando a entrada de dados na montagem dos sensores na plantação
	(DEFAULT, 'buagt33op1',	'54.123', '-112.564'),
    (DEFAULT, 'ckggt43op1',	'-23.789', '45.101'),
	(DEFAULT, 'dlhht53op2',	'35.689', '139.691'),
    (DEFAULT, 'emijt63op3',	'-33.868', '151.209'),
    (DEFAULT, 'fnkkt73op4',	'48.856', '2.352'),
    (DEFAULT, 'gollu83op5',	'55.755', '37.617'),
    (DEFAULT, 'hpmmv93op6',	'-1.292', '36.821'),
    (DEFAULT, 'iqnnw03op7',	'30.044', '31.235'),
    (DEFAULT, 'jroox13op8',	'19.432', '-99.133'),
    (DEFAULT, 'ksppy23op9',	'51.507', '-0.127'),
    (DEFAULT, 'ltqqz33op0',	'-34.603', '-58.381'),
    (DEFAULT, 'mrrra43pa1',	'25.204', '55.270'),
    (DEFAULT, 'nsssb53pa2',	'34.052', '-118.243'),
    (DEFAULT, 'otttc63pa3',	'-22.906', '-43.172'),
    (DEFAULT, 'puuud73pa4',	'1.352', '103.819'),
    (DEFAULT, 'qvvve83pa5',	'39.904', '116.407'),
    (DEFAULT, 'rwwwf93pa6',	'-26.204', '28.047'),
    (DEFAULT, 'sxxxg03pa7',	'52.520', '13.405'),
    (DEFAULT, 'tyyyh13pa8',	'37.774', '-122.419'),
    (DEFAULT, 'uzzzi23pa9',	'-15.794', '-47.882');
    
SELECT identidade AS 'Serial do sensor', altitude AS 'Altitude', longitude AS 'Longitude' FROM sensores; -- Retorna todos os dados dos sensores
SELECT identidade AS 'Identidade', altitude AS 'Altitude', longitude AS 'Longitude' FROM sensores ORDER BY altitude; -- Retorna todos sensores classificados pela altitude
SELECT identidade AS 'Identidade', altitude AS 'Altitude', longitude AS 'Longitude' FROM sensores WHERE identidade LIKE '%G%'; -- Retorna a identidade de um sensor que tenha a letra G 
SELECT CONCAT('O sensor ', identidade, ' está localizado na coordenada ', longitude, ' na altura ', altitude) AS 'Localização do sensor' FROM sensores;  -- Retorna as coordenadas e altura dos sensores

TRUNCATE sensores; -- Elimina todos os dados da tabela

-- Tabela 4
CREATE TABLE valorMedido( -- Referencia sensores
id INT PRIMARY KEY AUTO_INCREMENT, -- Cria uma coluna para armazenar a chave primária de identificação do valor medido
hora TIME DEFAULT (CURRENT_TIME), -- Cria uma coluna para armazenar o horário, que é consultado no servidor
dia DATE DEFAULT (CURRENT_DATE), -- Cria uma coluna para armazenar a data, que é consultada no servidor
valorMedido DECIMAL(5, 2) -- Cria uma coluna para armazenar o valor medido em números decimais
);
ALTER TABLE valorMedido RENAME COLUMN id TO idMedicao; -- Renomeia a coluna "id" para "idMedicao"
--
UPDATE valorMedido SET valorMedido = 86.20 WHERE idMedicao = 4; -- Atualiza o valor medido para 86.20 cujo id da medição é 4
UPDATE valorMedido SET valorMedido = 23.98 WHERE idMedicao = 6; -- Atualiza o valor medido para 23.98 cujo id da medição é 6
--
DESCRIBE valorMedido; -- Descreve a tabela "valorMedido" e suas propriedades

INSERT INTO valorMedido(idMedicao, valorMedido, hora, dia) VALUES -- Inserção de dados na tabela "valorMedido", simulando a saída e entrada de dados que serão coletados pelo sensor e emitidos para o site
	(DEFAULT,92.50, DEFAULT, DEFAULT), 
	(DEFAULT,32.50, DEFAULT, DEFAULT),
    (DEFAULT,43.20, DEFAULT, DEFAULT), 
    (DEFAULT,42.60, DEFAULT, DEFAULT), 
    (DEFAULT,52.65, DEFAULT, DEFAULT), 
    (DEFAULT,56.23, DEFAULT, DEFAULT), 
    (DEFAULT,87.99, DEFAULT, DEFAULT), 
    (DEFAULT,10.23, DEFAULT, DEFAULT), 
    (DEFAULT,33.50, DEFAULT, DEFAULT), 
    (DEFAULT,10.54, DEFAULT, DEFAULT), 
    (DEFAULT,22.76, DEFAULT, DEFAULT), 
    (DEFAULT,23.23, DEFAULT, DEFAULT), 
    (DEFAULT,54.12, DEFAULT, DEFAULT), 
    (DEFAULT,29.95, DEFAULT, DEFAULT), 
    (DEFAULT,66.03, DEFAULT, DEFAULT), 
    (DEFAULT,87.89, DEFAULT, DEFAULT), 
    (DEFAULT,34.23, DEFAULT, DEFAULT), 
    (DEFAULT,23.12, DEFAULT, DEFAULT), 
    (DEFAULT,22.50, DEFAULT, DEFAULT), 
    (DEFAULT,11.50, DEFAULT, DEFAULT);

SELECT idMedicao, valorMedido, hora, dia FROM valorMedido; -- Retorna dados dos valores medidos
SELECT CONCAT('Horário: ', hora, '\nData: ', dia, '\nValor medido: ', valorMedido) AS 'Valor medido' FROM valorMedido; -- Retorna dados de forma concatenada os valores medidos

TRUNCATE valorMedio; -- Elimina todos os dados da tabela

-- Tabela 5
CREATE TABLE empresa(
idEmpresa INT PRIMARY KEY AUTO_INCREMENT, -- Cria uma coluna para armazenar a chave primária de identificação da empresa
nomeEmpresa VARCHAR(50) UNIQUE NOT NULL, -- Cria uma coluna para armazenar o nome da empresa
cnpj CHAR(14) UNIQUE NOT NULL, -- Cria uma coluna para armazenar o CNPJ da empresa
emailEmpresa VARCHAR(50) UNIQUE NOT NULL, -- Cria uma coluna para armazenar o e-mail da empresa
senha VARCHAR(50) NOT NULL, -- Cria uma coluna para armazenar a senha de acesso do cliente/empresa
numero VARCHAR(5), -- Cria uma coluna para armazenar o endereço da empresa
cep CHAR(8), -- Cria uma coluna para armazenar o CEP da empresas
qtdTalhoes INT, -- Cria uma coluna para armazenar a quantidade de talhões inserida pelo cliente
qtdSensores INT -- Cria uma coluna para armazenar a quantidade de sensores solicitados pelo cliente
);

ALTER TABLE empresa ADD CONSTRAINT chkEmailEmpresa CHECK(emailEmpresa LIKE '%@%'); -- Adiciona uma restrição que impede que emails inseridos não possuam "@" no endereço
ALTER TABLE empresa ADD CONSTRAINT chkQtdTalhoesEmpresa CHECK(qtdTalhoes >= 0); -- Adiciona uma restrição que impede que a quantidade de talhões seja menor do que 0
ALTER TABLE empresa ADD CONSTRAINT chkQtdSensoresEmpresa CHECK(qtdSensores >= 0); -- Adiciona uma restrição que impede que a quantidade de sensores seja menor do que 0

UPDATE empresa SET numero = '8' WHERE idEmpresa = 2; -- Atualiza a coluna do número inserindo o número da empresa cujo ID é 2

DESCRIBE empresa; -- Descreve a tabela "empresa" e suas propriedades

INSERT INTO empresa VALUES -- Inserção de dados na tabela "empresa", simulando a entrada de dados no cadastro de uma conta
	(DEFAULT, 'São Benedito LTDA Agricultura Familiar','86054306000146','benedito@benedito.com','oitenta20','1311','08461120', 6, 15),
    (DEFAULT, 'Juventude Agrária','17044393000146','juventudeAgro@agro.com.br','tarblos202','1651','08269920', 2, 5),
    (DEFAULT, 'AgroVerde Soja Ltda', '93688514000146','contato@agroversoja.com.br', '###782J6A', '78', '08495190', 6, 12),
    (DEFAULT, 'Cerrado Dourado Agropecuária', '23456789000101', 'comercial@cerradodourado.agr.br', 'Cerrado#21', '403', '7870010', 5, 10),
    (DEFAULT, 'Fazenda Sol Nascente', '45678901000123', 'financeiro@fazendasolnascente.agr.br', 'Sol@Nasc33', '163', '78550970', 4, 8),
    (DEFAULT, 'Terra Fértil Soja S.A.', '78901234000156', 'contato@terrafertilsoja.com.br', 'T3rraFert!l', '200', '78455000', 3, 6);
SELECT idEmpresa AS 'ID', nomeEmpresa AS 'Nome', cnpj AS 'CNPJ', emailEmpresa AS 'E-mail', numero AS 'Número', cep AS 'CEP', qtdTalhoes AS 'Quantidade de talhões', qtdSensores AS 'Quantidade de sensores' FROM empresa;
SELECT * FROM empresa WHERE qtdTalhoes > 5; -- Retorna dados de empresas cuja a quantidade de talhões seja maior do que 5
SELECT * FROM empresa WHERE qtdSensores > 10; -- Retorna dados de empresas cuja a quantidade de sensores seja maior do que 10
SELECT * FROM empresa WHERE emailEmpresa LIKE '%@agro%'; -- Retorna dados de empresas cujo email tenha o nome agro no domínio
SELECT CONCAT('A empresa ', nomeEmpresa, ' possui ao todo ', qtdTalhoes, ' talhões e ', qtdSensores, ' sensores instalados.') AS 'Resumo empresas' FROM empresa; -- Retorna um breve resumo concatenado dos talhões e sensores que determinada empresa possui

-- Tabela 6
CREATE TABLE ticket(
idTicket INT PRIMARY KEY AUTO_INCREMENT, -- Cria uma coluna para armazenar a chave primária de identificação do ticket
assunto VARCHAR(100) NOT NULL, -- Cria uma coluna para armazenar o assunto do ticket, com um limite de 100 caracteres
email VARCHAR(2500) NOT NULL -- Cria uma coluna para armazenar a mensagem do ticket, com um limite de 2500 caracteres
);
ALTER TABLE ticket ADD COLUMN horaTicket DATETIME DEFAULT CURRENT_TIMESTAMP(); -- Altera a tabela adicionando a coluna que armazenará data e horário diretamente do servidor
ALTER TABLE ticket ADD COLUMN tipoTicket VARCHAR(15); -- Altera a tabela adicionando a coluna que armazenará o tipo do ticket
--
UPDATE ticket SET assunto = 'Problemas nos sensores' WHERE idTicket = 1; -- Atualiza a tabela adicionando na coluna de assuntos uma descrição para o ticket vulgo ID é 1
--
DESCRIBE ticket; -- Descreve a tabela "ticket" e suas propriedades

INSERT INTO ticket (assunto, email, tipoTicket) VALUES -- Inserção de dados na tabela "ticket", simulando a entrada de dados na abertura de um ticket
	('Quero me afiliar a vocês', 'Acho interessante a proposta que vocês trazem, por isso quero estar entrando em contato para que possamos fechar um acordo.','Requisição'),
	('Problema com sensores', 'Está dificil utilizar tudo sobre o sistema, parece ter alguns problemas ao identificar a umidade em certas partes do terreno.','Problema'),
	('Dúvida sobre o painel', 'Olá. Como eu posso identificar se há alguma alerta referente à umidade na minha plantação?', 'Dúvida'),
    ('Expansão', 'Bom dia! Pretendo expandir o meu terreno e quero adicionar mais sensores.', 'Requisição');    
    
SELECT assunto, email FROM ticket WHERE MONTH(horaTicket) >= 03; -- Retorna dados de um ticket cujo mês de criação seja após o mês de Março
SELECT * FROM ticket WHERE email LIKE '%aumentar%' OR email LIKE '%adicionar%' OR email LIKE '%expandir%'; -- Retorna dados de um ticket que contenham palavras referentes à expansão, como aumentar, adicionar ou expandir
SELECT CONCAT('Ticket nº', idTicket, '\n\nCriado em: ', horaTicket, '\nTipo: ', tipoTicket, '\nAssunto: ', assunto, '\nMensagem: ', email) AS 'Lista de tickets' FROM ticket; -- Retorna de forma concatenada os dados de um ticket
