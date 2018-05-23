<?php

use Phalcon\Mvc\Router;

$router = new Router();

$router->setDefaultModule('api');

$router->addGet('/{version}/{controller}', [
    'action' => 'index'
]);

$router->addOptions('/{version}/{controller}', [
    'action' => 'index'
]);

$router->addGet('/{version}/{controller}/{id}', [
    'action' => 'get'
]);

$router->addOptions('/{version}/{controller}/{id}', [
    'action' => 'index'
]);

$router->addPost('/{version}/{controller}', [
    'action' => 'add'
]);

$router->addPost('/{version}/{controller}/{action}', [
]);

$router->addDelete('/{version}/{controller}/{id}', [
    'action' => 'delete'
]);

return $router;