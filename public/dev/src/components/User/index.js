import React from 'react';
import { connect } from 'react-redux'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import { withStyles } from '@material-ui/core/styles';

import UserAdd from './Add';
import UserList from './List';

import {
  addUser as addUserAction,
  deleteUser as deleteUserAction,
  fetchUserList as fetchUserListAction
} from '~/actions/userActions'

const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3,
  }),
})

class User extends React.Component {
  componentDidMount() {
    const { fetchUserList } = this.props
    fetchUserList()
  }

  render() {
    const { addUser, deleteUser, userList, refresh, fetchUserList, classes } = this.props
    if (refresh) {
      fetchUserList()
    }
    return (<div>
      <Paper className={classes.root} elevation={4}>
          <Grid container spacing={16}>
            <Grid item xs={12} md={3}>
              <UserAdd onSubmit={addUser} />
            </Grid>
            <Grid item xs={12} md={9}>
              <UserList data={userList} deleteUser={deleteUser} />
            </Grid>
          </Grid>
        </Paper>
    </div>)
  }
}

const mapStateToProps = state => ({
  userList: state.user.userList,
  refresh: state.user.refresh
});

const mapDispatchToProps = {
  addUser: addUserAction,
  deleteUser: deleteUserAction,
  fetchUserList: fetchUserListAction
}

User = withStyles(styles)(User)
  
export default connect(mapStateToProps, mapDispatchToProps)(User)