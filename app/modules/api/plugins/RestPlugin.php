<?php

namespace Modules\Api\Plugins;

use Phalcon\Events\Event;
use Phalcon\Mvc\User\Plugin;
use Phalcon\Mvc\Dispatcher as MvcDispatcher;
use Phalcon\Mvc\Dispatcher\Exception as DispatcherException;

/**
 * RestResponsePlugin
 *
 * This is the security plugin which controls that users only have access to the modules they're assigned to
 */
class RestPlugin extends Plugin
{
    /**
     * This action is executed before execute any action in the application
     *
     * @param Event         $event
     * @param MvcDispatcher $dispatcher
     * @param \Exception    $exception
     * @return boolean
     */
    public function beforeException(Event $event, MvcDispatcher $dispatcher, \Exception $exception)
    {
        if ($exception instanceof DispatcherException) {
            $dispatcher->setParam('errorMsg', $exception->getMessage());
            $dispatcher->forward([
                'controller' => 'errors',
                'action' => 'show500'
            ]);
        } else {
            $response = new \Phalcon\Http\Response();
            $response->setStatusCode(500);
            $response->setJsonContent([
                'message' => $exception->getMessage()
            ]);
            $dispatcher->setReturnedValue($response);
        }

        return false;
    }
}
