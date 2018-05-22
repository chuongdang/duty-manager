import {
  SCHEDULE_FETCH,
  SCHEDULE_REMOVE_USER,
  SCHEDULE_ADD_USER,
  SCHEDULE_UPDATE_SHIFT_LENGTH
} from '~/actions/types'

export const fetchSchedule = (idSchedule, startDate = null, viewDate = null) => ({
  type: SCHEDULE_FETCH,
  params: {
    startDate,
    viewDate
  },
  request: {
    url: `schedule/${idSchedule}`,
    method: 'GET'
  }
})

export const addUser = (idSchedule, idUser) => ({
  type: SCHEDULE_ADD_USER,
  params: {
    idSchedule,
    idUser
  },
  request: {
    url: 'schedule/addUser',
    method: 'POST'
  }
})

export const removeUser = (idSchedule, idUser) => ({
  type: SCHEDULE_REMOVE_USER,
  params: {
    idSchedule,
    idUser
  },
  request: {
    url: 'schedule/removeUser',
    method: 'POST'
  }
})

export const updateShiftLength = (idSchedule, shiftLength) => ({
  type: SCHEDULE_UPDATE_SHIFT_LENGTH,
  params: {
    idSchedule,
    shiftLength
  },
  request: {
    url: 'schedule/updateShiftLength',
    method: 'POST'
  }
})