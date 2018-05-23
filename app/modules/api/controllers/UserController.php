<?php

namespace Modules\Api\Controllers;

use Entity\User;

class UserController extends BaseController
{
    const MESSAGE_USER_EXISTS = 'User already exists';

    public function indexAction()
    {
        return $this->returnData(User::find()->toArray());
    }

    public function addAction()
    {
        $email = $this->request->getPost('email');
        $user = User::findFirst([
            'email = :email:',
            'bind' => [
                'email' => $email
            ]
        ]);

        if ($user) {
            return $this->returnErrorMessage(static::MESSAGE_USER_EXISTS);
        }

        $user = new User();
        $user->setFirstName($this->request->getPost('firstName'));
        $user->setLastName($this->request->getPost('lastName'));
        $user->setEmail($email);
        $success = $user->save();

        if (!$success) {
            return $this->returnErrorMessage(static::MESSAGE_CAN_NOT_SAVE);
        };

        return $this->returnData($user->toArray());
    }

    public function deleteAction()
    {
        $userId = $this->dispatcher->getParam('id');

        $user = User::findFirst($userId);

        $success = false;

        if ($user) {
            $success = $user->delete();
        }

        if (!$success) {
            $this->returnErrorMessage(static::MESSAGE_CAN_NOT_DELETE);
        }
        return $this->returnData($user->toArray());
    }
}