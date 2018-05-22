<?php

namespace Modules\Api\Controllers;

use Phalcon\Mvc\Controller;
use Phalcon\Http\Response;

class BaseController extends Controller
{
    const RESPONSE_DATA = 'data';

    const RESPONSE_MESSAGE = 'message';

    const MESSAGE_CAN_NOT_SAVE = 'Can not save';

    const MESSAGE_CAN_NOT_DELETE = 'Can not delete';

    protected function returnErrorMessage($message, $code = 200)
    {
        $response = new Response();
        $response->setJsonContent([
            static::RESPONSE_MESSAGE => $message
        ]);
        $response->setStatusCode($code);
        return $response;
    }

    protected function returnData($data)
    {
        $response = new Response();
        $response->setJsonContent([
            static::RESPONSE_DATA => $data
        ]);
        return $response;
    }
}