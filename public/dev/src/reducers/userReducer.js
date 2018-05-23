import {
    USER_LIST_FETCH_OK,
    USER_ADD_SUBMIT_OK,
    USER_DELETE_OK,
} from '~/actions/types';

const initialState = {
    userList: [],
    refresh: false
};  

export default (state = initialState, { type, ...payload }) => {
    switch (type) {
        case USER_ADD_SUBMIT_OK:
            return {    
                ...state,
                refresh: true
            }
        case USER_DELETE_OK:
        return {
            ...state,
            refresh: true
        }
        case USER_LIST_FETCH_OK:
            const userList = payload.data
            var userMap = {}
            userList.map(user => {
                userMap[user.id_user] = user
            })
            return {
                ...state,
                userList: userMap,
                refresh: false
            }
        default:
            return state;
    }
};