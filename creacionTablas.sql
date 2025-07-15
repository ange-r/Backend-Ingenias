CREATE DATABASE Ingenias
CHARACTER SET utf8mb4
COLLATE utf8mb4_spanish_ci;

USE Ingenias;

CREATE TABLE Clientes (
	idCliente INT PRIMARY KEY AUTO_INCREMENT,
	nombreEmpresa VARCHAR(100),
	rubroEmpresa VARCHAR(50)
);

CREATE TABLE Equipos(
	idEquipo INT PRIMARY KEY AUTO_INCREMENT,
	nombreEquipo VARCHAR(100),
	especialidad VARCHAR(50),
	idCliente INT,
	FOREIGN KEY (idCliente) REFERENCES  Clientes(idCliente)
);


CREATE TABLE Empleados (
	idEmpleado INT PRIMARY KEY AUTO_INCREMENT,
	nombreEmpleado VARCHAR(100),
	puestoEmpresa VARCHAR(50),
	idEquipo INT,
	FOREIGN KEY (idEquipo) REFERENCES Equipos(idEquipo)
);
