<?php

class UserController extends Controller {

    public function login() {
        if (!empty($_POST)) {
            if (!empty($_POST['username']) && !empty($_POST['password'])) {
                $user = User::verifyLogin($_POST['username'], $_POST['password']);

                if ($user) {
                    $_SESSION['loginValid'] = true;
                    $_SESSION['user'] = serialize($user);
                    $redirect = !empty($_GET['request']) ? $_GET['request'] : 'home/index';

                    header('Location: ' . URL . $redirect);
                }
            }
        }

        require_once APP . 'view/_templates/header.phtml';
        require_once APP . 'view/user/login.phtml';
        require_once APP . 'view/_templates/footer.phtml';
    }

    public function logout() {
        session_unset();
        session_destroy();
        header('Location: ' . URL);
    }

}