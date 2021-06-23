-- Database initialization queries
-- Run these to populate initial data IN the database
-- Assumes that Database named `smarthome` is already created USE smarthome;

CREATE TABLE devicetypes(
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(64) NOT NULL
);

INSERT INTO devicetypes
VALUES
  (NULL, 'Television'),
  (NULL, 'Lighting'),
  (NULL, 'Radio'),
  (NULL, 'Fan'),
  (NULL, 'Door'),
  (NULL, 'Thermostate'),
  (NULL, 'Fire Alarm'),
  (NULL, 'CCTV');

CREATE TABLE configtypes( id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, name VARCHAR(64) NOT NULL, input VARCHAR(16) NOT NULL, presets JSON);

INSERT INTO configtypes VALUES (NULL, "Power", "radio", '["On", "Off"]'), (NULL, "Mode", "select", '["Slow", "Medium", "Fast"]'), (NULL, "Auto-sleep", "checkbox", NULL), (NULL, "Volume", "number", '[0, 100]');

CREATE TABLE devices( id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, devicetype INT NOT NULL, name VARCHAR(64) NOT NULL, FOREIGN KEY (devicetype) REFERENCES devicetypes(id) );

CREATE TABLE deviceconfigs(
  id INT NOT NULL AUTO_INCREMENT,
  device INT NOT NULL,
  configtype INT NOT NULL,
  value VARCHAR(64),
  FOREIGN KEY (device) REFERENCES devices(id) ON DELETE CASCADE,
  FOREIGN KEY (configtype) REFERENCES configtypes(id) ON DELETE CASCADE
);