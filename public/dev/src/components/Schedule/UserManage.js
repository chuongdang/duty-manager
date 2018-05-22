import React from 'react'
import { connect } from 'react-redux'

import UserSelect from './UserSelect'
import UserList from './UserList'

import {
  addUser as addUserAction
} from '~/actions/scheduleActions'
import { fetchUserList as fetchUserListAction } from '~/actions/userActions'

const processUserList = (userList, scheduleUserList) => {
  var options = []
  Object.keys(userList).map((key, index) => {
    if (!(key in scheduleUserList)) {
      const user = userList[key]
      options.push({
        value: user.id_user,
        label: `${user.first_name} ${user.last_name}`
      })
    }
  })
  return options
}

class UserManage extends React.Component {
  componentDidMount() {
    const { fetchUserList } = this.props
    fetchUserList()
  }

  render() {
    const { userList, scheduleUserList, addUser, currentScheduleId } = this.props
    return (
      <div>
        <UserSelect options={processUserList(userList, scheduleUserList)} onSelect={idUser => addUser(currentScheduleId, idUser)} />
        <UserList data={scheduleUserList} />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  userList: state.user.userList,
  scheduleUserList: state.schedule.currentSchedule.userList,
  currentScheduleId: state.schedule.currentSchedule.id_schedule
});

const mapDispatchToProps = {
  fetchUserList: fetchUserListAction,
  addUser: addUserAction
}
  
export default connect(mapStateToProps, mapDispatchToProps)(UserManage)