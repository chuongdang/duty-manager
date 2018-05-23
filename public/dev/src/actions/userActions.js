import {
  USER_LIST_FETCH,
  USER_ADD_SUBMIT,
  USER_DELETE
} from '~/actions/types'

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

export const deleteUser = (idUser) => ({
  type: USER_DELETE,
  request: {
    url: `user/${idUser}`,
    method: 'DELETE'
  }
})