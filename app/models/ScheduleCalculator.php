<?php

class ScheduleCalculator
{
    const DATE_TIME_FORMAT = 'Y-m-d H:i:s';

    const DATE_FORMAT = 'Y-m-d';

    const TIME_START = '00:00:00';

    const TIME_END = '23:59:59';

    const REPORT_DURATION = '+2 weeks';

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

        // If startDate and viewDate is the same day, obviously the first user in the list will be assignee
        if ($numberOfPassShift == 0) {
            $currentUserIndex = 0;
        } else {
            // The mod result will be the index of the user
            if ($numberOfPassShift > $countUser) {
                $currentUserIndex = $numberOfPassShift % $countUser;

                if ($currentUserIndex === 0) {
                    $currentUserIndex = $countUser - 1;
                } else {
                    $currentUserIndex = $currentUserIndex - 1;
                }
            } else {
                // If number of passed shifts smaller than number of user, take it as index
                $currentUserIndex = $numberOfPassShift - 1;
            }
        }

        $startDate = strtotime($viewDate . ' ' . static::TIME_START);
        $endDate = strtotime(date(static::DATE_FORMAT, strtotime($viewDate . ' ' . static::REPORT_DURATION)) . ' ' . static::TIME_END);

        $result = [];

        for ($i = $startDate; $i < $endDate; $i += $shiftLength) {
            $row = [
                'start' => date(static::DATE_TIME_FORMAT, $i),
                'end' => date(static::DATE_TIME_FORMAT, $i + $shiftLength)
            ];
            $row['user'] = $userList[$currentUserIndex]['first_name'] . ' ' . $userList[$currentUserIndex]['last_name'];
            $currentUserIndex++;
            // End of the user array, back to the first element
            if ($currentUserIndex >= $countUser) {
                $currentUserIndex = 0;
            }
            $result[] = $row;
        }
        return $result;
    }
}