import { USER_LIST_FETCH, USER_ADD_SUBMIT } from '~/actions/types'

export const fetchUserList = () => ({
  type: USER_LIST_FETCH,
  request: {
    url: 'user',
    method: 'GET'
  }
})

export const addUser = (userData) => ({
  type: USER_ADD_SUBMIT,
  params: userData,
  request: {
    url: 'user',
    method: 'POST'
  }
})