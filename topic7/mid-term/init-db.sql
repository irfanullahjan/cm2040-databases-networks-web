-- Database initialization queries
-- Run these to populate initial data IN the database
-- Assumes that Database named `smarthome` is already created USE smarthome;

USE smarthome;

-- Device types e.g. Television, Radio
CREATE TABLE device_types(
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(64) NOT NULL
);

-- Device configuration type e.g. Power, Volume, Temperature
CREATE TABLE config_types(
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(64) NOT NULL,
  input VARCHAR(16) NOT NULL,
  presets JSON
);

-- Mapping devices to configuration types e.g. Television has Power, Volume, IP Address
CREATE TABLE device_types_configs(
  device_type_id INT NOT NULL,
  config_type_id INT NOT NULL,
  PRIMARY KEY (device_type_id, config_type_id),
  FOREIGN KEY (device_type_id) REFERENCES device_types(id) ON DELETE CASCADE,
  FOREIGN KEY (config_type_id) REFERENCES config_types(id) ON DELETE CASCADE
);

-- User devices e.g. Bedroom TV, Kitchen TV
CREATE TABLE user_devices(
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  device_type_id INT NOT NULL,
  FOREIGN KEY (device_type_id) REFERENCES device_types(id)
);

-- User device configurations e.g. Bedroom Television Volume: 50%
CREATE TABLE user_devices_configs(
  user_device_id INT NOT NULL,
  config_type_id INT NOT NULL,
  PRIMARY KEY (user_device_id, config_type_id),
  value VARCHAR(64) NOT NULL,
  FOREIGN KEY (user_device_id) REFERENCES user_devices(id) ON DELETE CASCADE,
  FOREIGN KEY (config_type_id) REFERENCES config_types(id) ON DELETE CASCADE
);

 -- Initial data
INSERT INTO device_types
VALUES
  (1, 'Television'),
  (2, 'Lighting'),
  (3, 'Radio'),
  (4, 'Fan'),
  (5, 'Door'),
  (6, 'Thermostate'),
  (7, 'Fire alarm'),
  (8, 'CCTV'),
  (9, 'Water pump'),
  (10, 'Freezer'),
  (11, 'Water dispenser'),
  (12, 'Oven'),
  (13, 'Microwave oven'),
  (14, 'Printer'),
  (15, 'Window'),
  (16, 'Airconditioner'),
  (17, 'Garage'),
  (18, 'Music player'),
  (19, 'Internet router'),
  (20, 'Vaccum cleaner');

-- Initial data
INSERT INTO config_types
VALUES
  (1, "Name", "text", NULL),
  (2, "Power", "radio", '["On", "Off"]'),
  (3, "RPM", "range", '[0, 1000]'),
  (4, "Auto-sleep", "checkbox", NULL),
  (5, "Auto-update", "checkbox", NULL),
  (6, "Volume", "range", '[0, 100]'),
  (7, "Open/Close", "radio", '["Open", "Close"]'),
  (8, "Temperature", "range", '[0, 100]'),
  (9, "Brightness", "range", '[0, 100]'),
  (10, "Cooling", "range", '[-100, 0]'),
  (11, "Alarm", "radio", '["On", "Off"]'),
  (12, "Timer", "select", '["5min", "10min", "30min", "60min"]'),
  (13, "IP Address", "text", NULL),
  (14, "Tint", "select", '["Neutral", "Red", "Yellow", "Green", "Blue", "Violet"]'),
  (15, "White balance", "select", '["Neutral", "Extra warm", "Warm", "Cool", "Extra cool"]');

-- Initial data
INSERT INTO device_types_configs
VALUES
  (1, 1), (1, 2), (1, 4), (1, 5), (1, 6), (1, 9), (1, 13), (1, 14), (1, 15), 
  (2, 1), (2, 2), (2, 5), (2, 9), (2, 14), (2, 15), 
  (3, 1), (3, 2), (3, 4), (3, 6),
  (4, 1), (4, 2), (4, 3),
  (5, 1), (5, 7), (5, 11),
  (6, 1), (6, 2), (6, 8),
  (7, 1), (7, 2),
  (8, 1), (8, 2), (8, 11), (8, 13),
  (9, 1), (9, 2), (9, 3), (9, 12),
  (10, 1), (10, 2), (10, 10),
  (11, 1), (11, 2), (11, 8),
  (12, 1), (12, 2), (12, 7), (12, 12),
  (13, 1), (13, 2), (13, 7), (13, 8), (13, 12),
  (14, 1), (14, 2), (14, 4),
  (15, 1), (15, 7), (15, 14), (15, 15),
  (16, 1), (16, 2), (16, 8),
  (17, 1), (17, 7),
  (18, 1), (18, 2), (18, 4), (18, 6), 
  (19, 1), (19, 2), (19, 13),
  (20, 1), (20, 2), (20, 3), (20, 12);

-- IMPORTANT !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
-- ONLY for docker mysql to enable insecure authentication becuase node package 'mysql' doesn't work otherwise
-- PLEASE UNCOMMENT THE FOLLOWING LINES AND THEN USE
-- ALTER USER 'root' IDENTIFIED WITH mysql_native_password BY '';
-- flush privileges;
