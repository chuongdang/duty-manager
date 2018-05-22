import {
    SCHEDULE_ADD_USER_OK,
    SCHEDULE_FETCH_OK,
    SCHEDULE_REMOVE_USER_OK,
    SCHEDULE_UPDATE_SHIFT_LENGTH_OK,
} from '~/actions/types';

const initialState = {
    scheduleList: [],
    currentSchedule: {
        userList: [],
        sequence: []
    }
};  

export default (state = initialState, { type, ...payload }) => {
    switch (type) {
        case SCHEDULE_ADD_USER_OK:
            return {
                ...state,
                refresh: true
            }
        case SCHEDULE_REMOVE_USER_OK:
            return {
                ...state,
                refresh: true
            }
        case SCHEDULE_UPDATE_SHIFT_LENGTH_OK:
            return {
                ...state,
                refresh: true
            }
        case SCHEDULE_FETCH_OK:
            const { user_list, ...rest } = payload.data
            var userMap = {}
            user_list.map(user => {
                userMap[user.id_user] = user
            })
            return {
                ...state,
                currentSchedule: {
                    userList: userMap,
                    ...rest
                },
                refresh: false
            }
        default:
            return state;
    }
};