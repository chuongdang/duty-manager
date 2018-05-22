<?php

namespace Modules\Api\Controllers;

use Entity\Schedule;
use Entity\ScheduleUser;
use Phalcon\Http\Response;

class ScheduleController extends BaseController
{
    public function indexAction()
    {
        return $this->returnData(Schedule::find()->toArray());
    }

    public function getAction()
    {
        $scheduleId = $this->request->get('scheduleId');
        $startDate = $this->request->get('startDate', null, '2018-01-01');
        $viewDate = $this->request->get('viewDate', null, date('Y-m-d'));

        /** @var Schedule $schedule */
        $schedule = Schedule::findFirst($scheduleId);
        $shiftLength = $schedule->getShiftLength();


        $data = $schedule->toArray();
        $userList = $schedule->getUserList()->toArray();

        $data['user_list'] = $userList;
        $data['sequence'] = \ScheduleCalculator::process($userList, $startDate, $viewDate, $shiftLength);

        return $this->returnData($data);
    }

    public function addUserAction()
    {
        $scheduleId = $this->request->getPost('idSchedule');
        $userId = $this->request->getPost('idUser');

        $scheduleUser = new ScheduleUser();
        $scheduleUser->setFkSchedule($scheduleId);
        $scheduleUser->setFkUser($userId);

        $success = $scheduleUser->save();

        if (!$success) {
            $this->returnErrorMessage(static::MESSAGE_CAN_NOT_SAVE);
        }
        return $this->returnData($scheduleUser->toArray());
    }

    public function removeUserAction()
    {
        $scheduleId = $this->request->getPost('idSchedule');
        $userId = $this->request->getPost('idUser');

        $scheduleUser = ScheduleUser::findFirst([
           'fk_schedule = :schedule: AND fk_user = :user:',
            'bind' => [
                'schedule' => $scheduleId,
                'user' => $userId
            ]
        ]);

        $success = false;

        if ($scheduleUser) {
            $success = $scheduleUser->delete();
        }

        if (!$success) {
            $this->returnErrorMessage(static::MESSAGE_CAN_NOT_DELETE);
        }
        return $this->returnData($scheduleUser->toArray());
    }

    public function updateShiftLengthAction()
    {
        $scheduleId = $this->request->getPost('idSchedule');
        $shiftLength = $this->request->getPost('shiftLength');

        /** @var Schedule $schedule */
        $schedule = Schedule::findFirst($scheduleId);
        $schedule->setShiftLength($shiftLength);
        $schedule->save();

        return $this->returnData($schedule->toArray());
    }
}