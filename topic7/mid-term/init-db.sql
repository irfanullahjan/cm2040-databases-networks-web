-- Database initialization queries 
-- Run these to populate initial data IN the database 
-- Assumes that Database named `smarthome` is already created USE smarthome;

CREATE TABLE devicetypes( id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, name VARCHAR(64) NOT NULL );

INSERT INTO devicetypes VALUES (NULL, 'Television'), (NULL, 'Lighting'), (NULL, 'Radio'), (NULL, 'Fan'), (NULL, 'Door'), (NULL, 'Thermostate'), (NULL, 'Fire Alarm'), (NULL, 'CCTV');