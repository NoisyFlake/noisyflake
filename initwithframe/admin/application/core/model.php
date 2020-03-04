<?php

class Model {

    private static $connection;

    public static function db() {
        if (self::$connection === null) {
            self::init();
        }

        return self::$connection;
    }

    private static function init() {
        $options = [
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_OBJ, 
            PDO::ATTR_ERRMODE => PDO::ERRMODE_WARNING
        ];

        self::$connection = new PDO(DB_TYPE . ':host=' . DB_HOST . ';dbname=' . DB_NAME . ';charset=' . DB_CHARSET, DB_USER, DB_PASS, $options);
    }

}