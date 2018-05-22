<?php

namespace Modules\Api;

use Phalcon\Loader,
    Phalcon\Mvc\Dispatcher,
    Phalcon\DiInterface,
    Phalcon\Mvc\View,
    Phalcon\Mvc\ModuleDefinitionInterface;

use Modules\Api\Plugins\RestPlugin;

class Module implements ModuleDefinitionInterface
{

    /**
     * Register a specific autoloader for the module
     */
    public function registerAutoloaders(DiInterface $di = null)
    {

        $loader = new Loader();

        $loader->registerNamespaces(
            [
                'Modules\Api\Controllers'  => '../app/modules/api/controllers/',
                'Modules\Api\Models'       => '../app/modules/api/models/',
                'Modules\Api\Plugins'      => '../app/modules/api/plugins/',
            ]
        );

        $loader->register();
    }

    /**
     * Register specific services for the module
     */
    public function registerServices(DiInterface $di)
    {
        $restPlugin = new RestPlugin();

        /** @var Dispatcher $dispatcher */
        $dispatcher = $di->getShared('dispatcher');
        $dispatcher->setDefaultNamespace('Modules\Api\Controllers');
        $eventsManager = $dispatcher->getEventsManager();
        $eventsManager->detachAll('dispatch:beforeException');
        $eventsManager->attach('dispatch:beforeException', $restPlugin);
        $eventsManager->attach('dispatch:beforeDispatch', $restPlugin);
        $eventsManager->attach('dispatch:afterDispatch', $restPlugin);
        $di->setShared('dispatcher', $dispatcher);

        /** @var View $view */
        $view = $di->get('view');
        $view->disable();
        $di->set('view', $view);
    }

}