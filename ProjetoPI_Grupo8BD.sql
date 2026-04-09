CREATE DATABASE SafeSoja;
USE SafeSoja;

-- TABELA TERRENO, ONDE VOCÊ CONTABILIZA E IDENTIFICA HECTARES
CREATE TABLE terreno(
idTerreno INT PRIMARY KEY AUTO_INCREMENT,
Hectare VARCHAR(45)
); -- hectare contem sensores 1 2 3 4 
INSERT INTO terreno VALUES
(DEFAULT, 'Hectare 1'),
(DEFAULT, 'Hectare norte'),
(DEFAULT, 'Hectare argiloso');

-- TABELA QUE NOMEIA CADA SENSOR , INDICA A CONDIÇÃO DO SENSOR E EM QUAL HECTARE ELE PERTENCE.
CREATE TABLE sensores(
idSensor INT PRIMARY KEY auto_increment,
identificador VARCHAR(20),
condicao VARCHAR(11),
fk_hectares INT,
CONSTRAINT fk_hectares_cont FOREIGN KEY (fk_hectares) REFERENCES terreno(idTerreno),
CONSTRAINT chk_condicao CHECK (condicao IN ('estável', 'danificado'))-- MOSTRARÁ AS CONDIÇÕES DO SENSOR
);
INSERT INTO sensores VALUE 
(DEFAULT , 'SensorHC1' , 'estável' , 1 ),
(DEFAULT , 'SensorHC2' , 'estável' , 1 ),
(DEFAULT , 'SensorHC3' , 'danificado' , 1 ),
(DEFAULT , 'SensorHCnorte' , 'estável' , 2 );

-- TABELA QUE RECEBERA OS DADOS DO SENSOR ,UMA TABELA DEPENDENTE DE UM SENSOR.
CREATE TABLE dados(
idDados INT,
fk_sensor INT,
umidade INT,  -- AREA QUE VAI RECEBER A UMIDADE -- CONFERIR SE VEM NUMEROS QUEBRADOS
dthora DATETIME DEFAULT CURRENT_TIMESTAMP,
CONSTRAINT pk_composta PRIMARY KEY(idDados, fk_sensor),
CONSTRAINT fk_sensor_cont FOREIGN KEY (fk_sensor) REFERENCES sensores(idSensor)
);
                  
CREATE TABLE empresa(
idEmpresa INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(45),
cnpj VARCHAR(20),
localidade VARCHAR(45)
);

-- TABELA QUE IDENTIFCA O USUARIO E SEGUE UMA FK QUE APRESENTA SEUS DADOS
CREATE TABLE Usuario(
idUsuario INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(45),
email VARCHAR(70),
fk_empresa INT,
CONSTRAINT fk_empresa_cont FOREIGN KEY (fk_empresa) REFERENCES empresa(idEmpresa)
);

-- TABELA DOS DADOS DO USUARIO CADASTRADO, 1 USUARIO TEM APENAS 1 DADO PESSOAL E 1 DADO PESSOAL PERTENCE A 1 USUARIO
CREATE TABLE dadoPessoal(
idDadoP INT PRIMARY KEY AUTO_INCREMENT,
cpf CHAR(14),
celular CHAR(14),
logradouro VARCHAR(50),
numero VARCHAR(10),
bairro VARCHAR(45),
fk_usuario INT UNIQUE NOT NULL,
CONSTRAINT fk_usuario_cont FOREIGN KEY (fk_usuario) REFERENCES usuario(idUsuario)
);
