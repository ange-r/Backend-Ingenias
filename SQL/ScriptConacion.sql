-- Creo una Base de Datos
CREATE DATABASE Ecommerce
CHARACTER SET utf8mb4
COLLATE utf8mb4_spanish_ci;

USE Ecommerce;


-- Creo tabla donde alojar datos a clonar
CREATE TABLE ContactosFake (
	EmployeeID INT,
	LastName VARCHAR(20),
	FirstName VARCHAR(10),
	Title VARCHAR(30),
	HomePhone VARCHAR(24),
	City VARCHAR(15)
);

-- Actualizo/modifico datos especificos
ALTER TABLE ContactosFake
MODIFY EmployeeID INT NOT NULL AUTO_INCREMENt,
ADD PRIMARY KEY (EmployeeID);

-- Inserto datos clonados
INSERT INTO ContactosFake (EmployeeID, LastName, FirstName, Title, HomePhone, City)
SELECT e.EmployeeID, e.LastName, e.FirstName, e.Title, e.HomePhone, e.City
FROM Northwind.Employees e ;
