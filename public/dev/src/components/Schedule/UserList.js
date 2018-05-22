import React from 'react'
import Paper from '@material-ui/core/Paper'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import UserIcon from '@material-ui/icons/Person'

import { connect } from 'react-redux'

import { removeUser as removeUserAction } from '~/actions/scheduleActions'

function UserList(props) {
  const { data, removeUser, currentScheduleId } = props;

  return (
    <Paper>
      <List>
        {!!data && Object.keys(data).map((key, index) => {
          const n = data[key]
          return (
          <ListItem key={n.id_user}>
            <ListItemAvatar>
                <Avatar>
                  <UserIcon />
                </Avatar>
            </ListItemAvatar>
            <ListItemText
                primary={`${n.first_name} ${n.last_name}`}
            />
            <ListItemSecondaryAction>
                <IconButton aria-label="Delete" onClick={() => removeUser(currentScheduleId, n.id_user)}>
                    <DeleteIcon />
                </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
          );
        })}
      </List>
    </Paper>
  );
}

const mapStateToProps = state => ({
  currentScheduleId: state.schedule.currentSchedule.id_schedule
});

const mapDispatchToProps = {
  removeUser: removeUserAction
}
  
export default connect(mapStateToProps, mapDispatchToProps)(UserList)