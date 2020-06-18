
CREATE DATABASE apiproductos;

USE apiproductos;

CREATE TABLE productos(
	id INT PRIMARY KEY AUTO_INCREMENT,
    clave VARCHAR(60) NOT NULL,
    nombreproducto VARCHAR(150) NOT NULL,
    descripcion VARCHAR(255),
    precio DOUBLE NOT NULL,
    marca VARCHAR(60),
    img VARCHAR(150)
);

DESCRIBE productos;


