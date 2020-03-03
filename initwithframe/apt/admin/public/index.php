<?php

// set a constant that holds the project's folder path, like "/var/www/".
define('ROOT', dirname(__DIR__) . DIRECTORY_SEPARATOR);
// set a constant that holds the project's "application" folder, like "/var/www/application".
define('APP', ROOT . 'application' . DIRECTORY_SEPARATOR);

// load application config (error reporting etc.)
require APP . 'config/config.php';

// load application class
require APP . 'core/application.php';
require APP . 'core/controller.php';
require APP . 'core/model.php';
require_once APP . 'model/user.php';


session_start();

// start the application
$app = new Application();