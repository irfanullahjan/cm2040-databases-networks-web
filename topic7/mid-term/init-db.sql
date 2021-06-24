-- Database initialization queries
-- Run these to populate initial data IN the database
-- Assumes that Database named `smarthome` is already created USE smarthome;

CREATE TABLE device_types(
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(64) NOT NULL
);

CREATE TABLE config_types(
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(64) NOT NULL,
  input VARCHAR(16) NOT NULL,
  presets JSON
);

CREATE TABLE device_types_configs(
  device_type INT NOT NULL,
  config_type INT NOT NULL,
  PRIMARY KEY (device_type, config_type),
  FOREIGN KEY (device_type) REFERENCES device_types(id) ON DELETE CASCADE,
  FOREIGN KEY (config_type) REFERENCES config_types(id) ON DELETE CASCADE
);

CREATE TABLE user_devices(
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  device_type INT NOT NULL,
  name VARCHAR(64) NOT NULL,
  FOREIGN KEY (device_type) REFERENCES device_types(id)
);

CREATE TABLE user_devices_configs(
  user_device INT NOT NULL,
  config_type INT NOT NULL,
  PRIMARY KEY (user_device, config_type),
  value VARCHAR(64) NOT NULL,
  FOREIGN KEY (user_device) REFERENCES user_devices(id) ON DELETE CASCADE,
  FOREIGN KEY (config_type) REFERENCES config_types(id) ON DELETE CASCADE
);

INSERT INTO device_types
VALUES
  (NULL, 'Television'),
  (NULL, 'Lighting'),
  (NULL, 'Radio'),
  (NULL, 'Fan'),
  (NULL, 'Door'),
  (NULL, 'Thermostate'),
  (NULL, 'Fire Alarm'),
  (NULL, 'CCTV');

INSERT INTO config_types
VALUES
  (NULL, "Power", "radio", '["On", "Off"]'),
  (NULL, "Mode", "select", '["Slow", "Medium", "Fast"]'),
  (NULL, "Auto-sleep", "checkbox", NULL),
  (NULL, "Volume", "number", '[0, 100]');

INSERT INTO device_types_configs
VALUES (1, 1), (1, 3), (1, 4), (2, 1), (3, 1), (3, 4);