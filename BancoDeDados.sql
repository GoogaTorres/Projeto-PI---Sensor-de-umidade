CREATE DATABASE SafeSoja;
USE SafeSoja;

-- TABELA EMPRESA, PARA ARMAZENAR O NOME DA EMPRESA E O CNPJ
CREATE TABLE empresa(
idEmpresa INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(45),
cnpj VARCHAR(20)
);
INSERT INTO empresa VALUES
(DEFAULT, 'sojaempresa', '32.726.543/0001-87');


-- TABELA USUARIO, PARA ARMAZENAR O CADASTRO DOS USUARIOS
CREATE TABLE usuario(
idUsuario INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(45),
email VARCHAR(70),
senha VARCHAR(25),
cpf CHAR(14),
celular CHAR(14),
fkEmpresa INT,
CONSTRAINT fk_empresa_cont FOREIGN KEY (fkEmpresa) REFERENCES empresa(idEmpresa)
);
INSERT INTO usuario VALUES
(DEFAULT,'Cliente1','cliente1@email.com', '123er', '573.461.230-85','11980242076',1),
(DEFAULT,'Cliente2','cliente2@email.com', '123w','736.305.990-01','11981874411',1),
(DEFAULT,'Cliente3','cliente3@email.com','123ew', '140.975.050-76','11983413665',1);

-- TABELA TERRENO, ONDE VOCÊ CONTABILIZA E IDENTIFICA HECTARES
CREATE TABLE terreno(
idTerreno INT PRIMARY KEY AUTO_INCREMENT,
Hectare VARCHAR(45),
fkEmpresa INT,
CONSTRAINT fk_empresa_const FOREIGN KEY (fkEmpresa) REFERENCES empresa(idEmpresa)
); -- hectare contem sensores 1 2 3 4 
INSERT INTO terreno VALUES
(DEFAULT, 'Hectare 1',1),
(DEFAULT, 'Hectare 2' , 1);


-- CREATE TABLE ENDERECÇO, PARA ARMAZENAR OS ENDEREÇOS DOS USUARIOS E DOS TERRENOS
CREATE TABLE endereco(
idEndereco INT PRIMARY KEY AUTO_INCREMENT,
estado VARCHAR(45),
bairro VARCHAR(45),
logradouro VARCHAR(100),
numero VARCHAR(10),
fkUsuario INT,
fkTerreno INT ,
fkEmpresa INT,
CONSTRAINT fkEmpresa_cont FOREIGN KEY (fkEmpresa) REFERENCES empresa(idEmpresa),
CONSTRAINT fkUsuario_cont FOREIGN KEY (fkUsuario) REFERENCES usuario(idUsuario),
CONSTRAINT fkTerreno FOREIGN KEY (fkTerreno) REFERENCES terreno(idTerreno)
);
INSERT INTO endereco VALUES
(DEFAULT,'São Paulo', 'bairro de la','rua da frente','12A',1,NULL,NULL),
(DEFAULT,'Campinas', 'elisopolis','rua de la' ,'1403B',NULL,1,NULL),
(DEFAULT,'Alphaville', 'Marte','rua de tras' ,'642C',NULL,NULL,1);


-- TABELA QUE NOMEIA CADA SENSOR , INDICA A CONDIÇÃO DO SENSOR E EM QUAL HECTARE ELE PERTENCE.
CREATE TABLE sensores(
idSensor INT PRIMARY KEY auto_increment,
identificador VARCHAR(20),
condicao VARCHAR(11),
fkHectares INT,
coordenada VARCHAR(45),
CONSTRAINT fk_hectares_cont FOREIGN KEY (fkHectares) REFERENCES terreno(idTerreno),
CONSTRAINT chk_condicao CHECK (condicao IN ('estável', 'danificado'))-- MOSTRARÁ AS CONDIÇÕES DO SENSOR
);
INSERT INTO sensores VALUE 
(DEFAULT , 'Sensor 1' , 'estável' , 1 , '-156.737073°'),
(DEFAULT , 'Sensor 2' , 'estável' , 1, '18.756071°' ),
(DEFAULT , 'Sensor 1' , 'danificado' , 2 , '-167.995082°');


-- TABELA QUE RECEBERA OS DADOS DO SENSOR ,UMA TABELA DEPENDENTE DE UM SENSOR.
CREATE TABLE registroDados(
idDados INT AUTO_INCREMENT,
fkSensor INT,
umidade INT,  -- AREA QUE VAI RECEBER A UMIDADE -- CONFERIR SE VEM NUMEROS QUEBRADOS
dthora DATETIME DEFAULT CURRENT_TIMESTAMP,
CONSTRAINT fk_sensor_const FOREIGN KEY (fkSensor) REFERENCES sensores(idSensor),
CONSTRAINT pk_composta PRIMARY KEY(idDados,fkSensor)
);
INSERT INTO registroDados VALUES
(DEFAULT,1,70,DEFAULT);
                                    
-- TABELA PARA ARMAZENAR ALERTAS
CREATE TABLE alerta(
idAlerta INT AUTO_INCREMENT,
tipo VARCHAR(45),
descricao VARCHAR(100),
fkDados INT,
fkSensor INT,
CONSTRAINT fks_composta_D_S PRIMARY KEY(idAlerta,fkDados,fkSensor),
CONSTRAINT fk_dados_sensor_cont FOREIGN KEY (fkDados) REFERENCES registroDados(idDados),
CONSTRAINT fk_dados_sensore FOREIGN KEY (fkSensor) REFERENCES sensores(idSensor)
);
INSERT INTO alerta VALUES
(1,'abaixo','umidade está abaixo do previsto', 1,1);
