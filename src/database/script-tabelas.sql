CREATE DATABASE SafeSoja;
USE SafeSoja;

CREATE TABLE empresa(
    idEmpresa INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(45),
    cnpj VARCHAR(20),
    codigoAtivacao VARCHAR(20) UNIQUE
);

INSERT INTO empresa VALUES
(DEFAULT, 'sojaempresa', '32.726.543/0001-87', 'SOJA123'),
(DEFAULT, 'Camuji Rações', '41.832.642/0011-87', 'CAMUJI123');

CREATE TABLE usuario(
    idUsuario INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(45),
    email VARCHAR(70),
    senha VARCHAR(25),
    cpf CHAR(11),
    celular CHAR(13),
    Administrador TINYINT(1),
    fkEmpresa INT,

    CONSTRAINT fk_empresa_cont
        FOREIGN KEY (fkEmpresa)
        REFERENCES empresa(idEmpresa)
);

INSERT INTO usuario VALUES
(DEFAULT,'ADM1','ADM1@gmail.com','123123#a','573.461.230-85','11980242076',1,1),
(DEFAULT,'ADM2','ADM2@gmail.com','123123#a2','345.163.122-12','11987598275',1,2),
(DEFAULT,'Cliente1','cliente1@gmail.com','123123#c','736.305.990-01','11981874411',0,1),
(DEFAULT,'Cliente2','cliente2@gmail.com','123123#c2','140.975.050-76','11983413665',0,2);

CREATE TABLE terreno(
    idTerreno INT PRIMARY KEY AUTO_INCREMENT,
    hectare VARCHAR(45),
    fkEmpresa INT,

    CONSTRAINT fk_empresa_const
        FOREIGN KEY (fkEmpresa)
        REFERENCES empresa(idEmpresa)
);

INSERT INTO terreno VALUES
(DEFAULT,'Hectare 1',1),
(DEFAULT,'Hectare 2',1);

INSERT INTO terreno VALUES
(DEFAULT,'Hectare 1',2),
(DEFAULT,'Hectare 2',2),
(DEFAULT,'Hectare 3',2),
(DEFAULT,'Hectare 4',2);

CREATE TABLE endereco(
    idEndereco INT PRIMARY KEY AUTO_INCREMENT,
    estado VARCHAR(45),
    bairro VARCHAR(45),
    logradouro VARCHAR(100),
    numero VARCHAR(10),

    fkUsuario INT,
    fkTerreno INT,
    fkEmpresa INT,

    CONSTRAINT fkEmpresa_cont
        FOREIGN KEY (fkEmpresa)
        REFERENCES empresa(idEmpresa),

    CONSTRAINT fkUsuario_cont
        FOREIGN KEY (fkUsuario)
        REFERENCES usuario(idUsuario),

    CONSTRAINT fkTerreno
        FOREIGN KEY (fkTerreno)
        REFERENCES terreno(idTerreno)
);

INSERT INTO endereco VALUES
(DEFAULT,'São Paulo','bairro de la','rua da frente','12A',1,NULL,NULL),
(DEFAULT,'Campinas','elisopolis','rua de la','1403B',NULL,1,NULL),
(DEFAULT,'Alphaville','Marte','rua de tras','642C',NULL,NULL,1);

CREATE TABLE sensores(
    idSensor INT PRIMARY KEY AUTO_INCREMENT,
    identificador VARCHAR(20),
    condicao VARCHAR(10),
    fkHectares INT,
    coordenada VARCHAR(45),

    CONSTRAINT fk_hectares_cont
        FOREIGN KEY (fkHectares)
        REFERENCES terreno(idTerreno),

    CONSTRAINT chk_condicao
        CHECK (condicao IN ('estavel','alerta','critico','inativo'))
);

INSERT INTO sensores (idSensor, identificador, condicao, fkHectares, coordenada) VALUES
(DEFAULT, 'Sensor 1', 'estavel', 1, '-156.737073°'),
(DEFAULT, 'Sensor 2', 'alerta',  1, '18.756071°'),
(DEFAULT, 'Sensor 3', 'critico', 1, '-167.995082°'),
(DEFAULT, 'Sensor 4', 'estavel', 1, '-131.465381°'),
(DEFAULT, 'Sensor 5', 'alerta',  1, '-120.123456°');

INSERT INTO sensores (idSensor, identificador, condicao, fkHectares, coordenada) VALUES
(DEFAULT, 'Sensor 1', 'estavel', 2, '-150.123456°'),
(DEFAULT, 'Sensor 2', 'alerta',  2, '12.345678°'),
(DEFAULT, 'Sensor 3', 'critico', 2, '-160.987654°'),
(DEFAULT, 'Sensor 4', 'estavel', 2, '-130.456123°'),
(DEFAULT, 'Sensor 5', 'inativo', 2, '-110.654321°'); -- 1 Inativo


INSERT INTO sensores (idSensor, identificador, condicao, fkHectares, coordenada) VALUES
(DEFAULT, 'Sensor 1', 'estavel', 3, '-145.111111°'),
(DEFAULT, 'Sensor 2', 'alerta',  3, '15.222222°'),
(DEFAULT, 'Sensor 3', 'critico', 3, '-155.333333°'),
(DEFAULT, 'Sensor 4', 'estavel', 3, '-125.444444°'),
(DEFAULT, 'Sensor 5', 'alerta',  3, '-115.555555°');

INSERT INTO sensores (idSensor, identificador, condicao, fkHectares, coordenada) VALUES
(DEFAULT, 'Sensor 1', 'estavel', 4, '-140.666666°'),
(DEFAULT, 'Sensor 2', 'alerta',  4, '20.777777°'),
(DEFAULT, 'Sensor 3', 'critico', 4, '-150.888888°'),
(DEFAULT, 'Sensor 4', 'estavel', 4, '-120.999999°'),
(DEFAULT, 'Sensor 5', 'critico', 4, '-110.111222°');

INSERT INTO sensores (idSensor, identificador, condicao, fkHectares, coordenada) VALUES
(DEFAULT, 'Sensor 1', 'estavel', 5, '-135.222333°'),
(DEFAULT, 'Sensor 2', 'alerta',  5, '25.333444°'),
(DEFAULT, 'Sensor 3', 'critico', 5, '-145.444555°'),
(DEFAULT, 'Sensor 4', 'estavel', 5, '-115.555666°'),
(DEFAULT, 'Sensor 5', 'inativo', 5, '-105.666777°');

INSERT INTO sensores (idSensor, identificador, condicao, fkHectares, coordenada) VALUES
(DEFAULT, 'Sensor 1', 'estavel', 6, '-130.777888°'),
(DEFAULT, 'Sensor 2', 'alerta',  6, '30.888999°'),
(DEFAULT, 'Sensor 3', 'critico', 6, '-140.999000°'),
(DEFAULT, 'Sensor 4', 'estavel', 6, '-110.111333°'),
(DEFAULT, 'Sensor 5', 'inativo', 6, '-100.222444°');

CREATE TABLE registroDados(
    idDados INT AUTO_INCREMENT,
    fkSensor INT,
    umidade INT,
    dthora DATETIME DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_sensor_const
        FOREIGN KEY (fkSensor)
        REFERENCES sensores(idSensor),

    CONSTRAINT pk_composta
        PRIMARY KEY(idDados,fkSensor)
);

INSERT INTO registroDados VALUES
(DEFAULT,1,70,DEFAULT);


SELECT * FROM empresa;
SELECT * FROM usuario;
SELECT * FROM terreno;
SELECT * FROM endereco;
SELECT * FROM sensores;
SELECT * FROM registroDados;
SELECT * FROM alerta;

