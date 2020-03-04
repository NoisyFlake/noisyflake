<?php

class HomeController extends Controller {

    public function index() {
        $user = unserialize($_SESSION['user']);

        require_once APP . 'view/_templates/header.phtml';
        require_once APP . 'view/home/index.phtml';
        require_once APP . 'view/_templates/footer.phtml';
    }

}