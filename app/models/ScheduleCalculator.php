<?php

class ScheduleCalculator
{
    public static function process(array $userList, string $startDate, string $viewDate, int $shiftLength): array
    {
        $countUser = count($userList);

        if ($countUser === 0) {
            return [];
        }

        $startTimestamp = strtotime($startDate);
        $currentTimestamp = strtotime($viewDate);
        $shiftLength = $shiftLength * 3600;

        $numberOfPassShift = ceil(($currentTimestamp - $startTimestamp) / $shiftLength);

        $currentUserIndex = $numberOfPassShift % $countUser;

        if ($currentUserIndex === 0) {
            $currentUserIndex = $countUser - 1;
        } else {
            $currentUserIndex = $currentUserIndex - 1;
        }

        $startDate = strtotime($viewDate . ' 00:00:00');
        $endDate = strtotime(date('Y-m-d', strtotime($viewDate . ' +2 weeks')) . '23:59:59');

        $result = [];

        $increase = false;
        for ($i = $startDate; $i < $endDate; $i += $shiftLength) {
            $start = $i;
            $end = $i + $shiftLength;
            $row = [
                'start' => date('Y-m-d H:i:s', $i),
                'end' => date('Y-m-d H:i:s', $i + $shiftLength)
            ];
            if (!$increase && $currentTimestamp >= $start && $currentTimestamp <= $end) {
                $increase = true;
            }
            if ($increase) {
                $row['user'] = $userList[$currentUserIndex]['first_name'] . ' ' . $userList[$currentUserIndex]['last_name'];
                $currentUserIndex++;
                if ($currentUserIndex >= $countUser) {
                    $currentUserIndex = 0;
                }
            }
            $result[] = $row;
        }
        return $result;
    }
}