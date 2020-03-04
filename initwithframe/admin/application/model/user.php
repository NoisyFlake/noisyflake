<?php

class User extends Model {

    public static function verifyLogin($username, $password) {
        $sql = "SELECT * FROM users WHERE username = :username";
        $query = self::db()->prepare($sql);
        $query->execute([":username" => $username]);

        $user = $query->fetch();
        if ($user && password_verify($password, $user->password)) {
            return $user;
        }

        return false;
    }

}