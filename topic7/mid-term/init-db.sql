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
  device_type_id INT NOT NULL,
  config_type_id INT NOT NULL,
  PRIMARY KEY (device_type_id, config_type_id),
  FOREIGN KEY (device_type_id) REFERENCES device_types(id) ON DELETE CASCADE,
  FOREIGN KEY (config_type_id) REFERENCES config_types(id) ON DELETE CASCADE
);

CREATE TABLE user_devices(
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  device_type_id INT NOT NULL,
  FOREIGN KEY (device_type_id) REFERENCES device_types(id)
);

CREATE TABLE user_devices_configs(
  user_device_id INT NOT NULL,
  config_type_id INT NOT NULL,
  PRIMARY KEY (user_device_id, config_type_id),
  value VARCHAR(64) NOT NULL,
  FOREIGN KEY (user_device_id) REFERENCES user_devices(id) ON DELETE CASCADE,
  FOREIGN KEY (config_type_id) REFERENCES config_types(id) ON DELETE CASCADE
);

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
  (10, 'Refrigerater'),
  (11, 'Door'),
  (12, 'Oven'),
  (13, 'Microwave oven'),
  (14, 'Printer'),
  (15, 'Window'),
  (16, 'Airconditioner'),
  (17, 'Garage'),
  (18, 'Music player'),
  (19, 'Internet router'),
  (20, 'Vaccum cleaner');

INSERT INTO config_types
VALUES
  (1, "Name", "text", NULL),
  (2, "Power", "radio", '["On", "Off"]'),
  (3, "Speed", "radio", '["Slow", "Medium", "Fast"]'),
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
  (15, "White balance", "select", '["Neutral", "Extra warm", "Warm", "Cool", "Extra cool"]'),
  (16, "RPM", "range", '[0, 1000]');

INSERT INTO device_types_configs
VALUES
  (1, 1), (1, 2), (1, 4), (1, 5), (1, 6), (1, 9), (1, 13), (1, 14), (1, 15), 
  (2, 1), (2, 2), (2, 5), (2, 9), (2, 14), (2, 15), 
  (3, 1), (3, 2), (3, 4), (3, 6),
  (4, 1), (4, 2), (4, 16),
  (5, 1),
  (6, 1), (6, 2), (6, 8),
  (7, 1),
  (8, 1),
  (9, 1),
  (10, 1),
  (11, 1), (11, 7),
  (12, 1), (12, 2), (12, 7),
  (13, 1), (13, 2), (13, 7),
  (14, 1),
  (15, 1), (15, 7),
  (16, 1),
  (17, 1), (17, 7),
  (18, 1), (18, 2), (18, 4), (18, 6), 
  (19, 1), (19, 2), (19, 13),
  (20, 1), (20, 2), (20, 3) ;