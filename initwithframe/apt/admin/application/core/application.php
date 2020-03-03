<?php


class Application {

    private $url_controller = null;
    private $url_action = null;
    private $url_params = array();

    /**
     * "Start" the application:
     * Analyze the URL elements and calls the according controller/method or the fallback
     */
    public function __construct() {
        // create array with URL parts in $url
        $this->splitUrl();

        if (!isset($_SESSION['loginValid'])) {
            $_GET['request'] = $this->url_controller && $this->url_action ? $this->url_controller . '/' . $this->url_action : null;
            $this->url_controller = "user";
            $this->url_action = "login";
        }

        // check for controller: no controller given ? then load start-page
        if (!$this->url_controller) {

            require APP . 'controller/home.php';
            $page = new HomeController();
            $page->index();

        } elseif (file_exists(APP . 'controller/' . $this->url_controller . '.php')) {
            // here we did check for controller: does such a controller exist ?
            // if so, then load this file and create this controller
            require APP . 'controller/' . $this->url_controller . '.php';
            $this->url_controller = $this->url_controller . "Controller";
            $this->url_controller = new $this->url_controller();

            // check for method: does such a method exist in the controller ?
            if (method_exists($this->url_controller, $this->url_action) && is_callable([$this->url_controller, $this->url_action])) {

                if (!empty($this->url_params)) {
                    // Call the method and pass arguments to it
                    call_user_func_array(array($this->url_controller, $this->url_action), $this->url_params);
                } else {
                    // If no parameters are given, just call the method without parameters, like $this->home->method();
                    $this->url_controller->{$this->url_action}();
                }

            } else {
                header("HTTP/1.0 404 Not Found");
                echo "Page not found.";
            }
        } else {
            header("HTTP/1.0 404 Not Found");
            echo "Page not found.";
        }
    }

    /**
     * Get and split the URL
     */
    private function splitUrl() {
        if (isset($_GET['url'])) {

            // split URL
            $url = trim($_GET['url'], '/');
            $url = filter_var($url, FILTER_SANITIZE_URL);
            $url = explode('/', $url);

            $this->url_controller = isset($url[0]) ? $url[0] : null;
            $this->url_action = isset($url[1]) ? $url[1] : null;

            // Remove controller and action from the split URL
            unset($url[0], $url[1]);

            // Rebase array keys and store the URL params
            $this->url_params = array_values($url);
        }
    }
}