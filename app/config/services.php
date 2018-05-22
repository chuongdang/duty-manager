<?php

use Phalcon\Session\Adapter\Files as SessionAdapter;
use Phalcon\Mvc\Url as UrlResolver;
use Phalcon\Mvc\Model\Metadata\Memory as MetaDataAdapter;
use Phalcon\Mvc\View;

/**
 * Shared configuration service
 */
$di->setShared('config', function () {
    // Load the configuration file (if any)
    if (is_readable(APP_PATH . '/config/config.php')) {
        /** @var \Phalcon\Config $config */
        $config = include APP_PATH . '/config/config.php';
        return $config;
    }

    return [];
});

/**
 * The URL component is used to generate all kind of urls in the application
 */
$di->setShared('url', function () {
    $config = $this->getConfig();

    $url = new UrlResolver();
    //$url->setBaseUri($config->application->baseUri);

    return $url;
});

/**
 * Database connection is created based in the parameters defined in the configuration file
 */
$di->setShared('db', function () {
    $config = $this->getConfig();

    $class = 'Phalcon\Db\Adapter\Pdo\\' . $config->database->adapter;
    $params = [
        'dbname'   => $config->database->dbname,
    ];

    if ($config->database->adapter == 'MySql') {
        $params = [
            'host'     => $config->database->host,
            'username' => $config->database->username,
            'password' => $config->database->password,
            'dbname'   => $config->database->dbname,
            'charset'  => $config->database->charset
        ];
    }

    $connection = new $class($params);

    return $connection;
});


/**
 * If the configuration specify the use of metadata adapter use it or use memory otherwise
 */
$di->setShared('modelsMetadata', function () {
    return new MetaDataAdapter();
});

$di->setShared('dispatcher', function() {
    $eventsManager = new Phalcon\Events\Manager();
    $dispatcher = new Phalcon\Mvc\Dispatcher();
    //Bind the EventsManager to the Dispatcher
    $dispatcher->setEventsManager($eventsManager);
    return $dispatcher;
});

/**
 * Start the session the first time some component request the session service
 */
$di->setShared('session', function () {
    $session = new SessionAdapter();
    $session->start();

    return $session;
});

/**
 * Loading routes from the routes.php file
 */
$di->set('router', function () {
    return require __DIR__ . '/routes.php';
});

$di->setShared('view', function () {
    $view = new View();
    $view->setDI($this);
    return $view;
});