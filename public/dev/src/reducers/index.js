import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { routerReducer } from 'react-router-redux'

import notification from '~/reducers/notificationReducer'
import user from '~/reducers/userReducer'
import schedule from '~/reducers/scheduleReducer'

export default combineReducers({
    form: formReducer,
    routing: routerReducer,
    notification,
    user,
    schedule,
})