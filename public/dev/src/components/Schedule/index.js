import React from 'react'
import { connect } from 'react-redux'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

import UserManage from './UserManage'
import ScheduleList from './ScheduleList'

import {
  fetchSchedule as fetchScheduleAction,
  updateShiftLength as updateShiftLengthAction
} from '~/actions/scheduleActions'

const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3,
  }),
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  }
})

class Schedule extends React.Component {
  state = {
    idSchedule: 1,
    startDate: '2018-01-01',
    viewDate: this.getCurrentDate()
  }

  getCurrentDate() {
    const today = new Date()
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();

    if (dd<10) {
        dd = '0'+dd
    } 

    if (mm<10) {
        mm = '0'+mm
    } 
    return `${yyyy}-${mm}-${dd}`
  }

  componentDidMount() {
    const { fetchSchedule } = this.props
    const { idSchedule, startDate, viewDate } = this.state
    fetchSchedule(idSchedule, startDate, viewDate)
  }

  handleShiftLengthChange(e) {
    const { updateShiftLength } = this.props
    updateShiftLength(this.state.idSchedule, e.target.value)
  }

  handleStartDateChange(e) {
    this.setState({
      ...this.state,
      startDate: e.target.value
    }, () => {
      const { fetchSchedule } = this.props
      const { idSchedule, startDate, viewDate } = this.state
      fetchSchedule(idSchedule, startDate, viewDate)
    });
  }

  handleViewDateChange(e) {
    this.setState({
      ...this.state,
      viewDate: e.target.value
    }, () => {
      const { fetchSchedule } = this.props
      const { idSchedule, startDate, viewDate } = this.state
      fetchSchedule(idSchedule, startDate, viewDate)
    });
  }

  render() {
    const { scheduleList, refresh, fetchSchedule, classes, shiftLength } = this.props
    if (refresh) {
      const { idSchedule, startDate, viewDate } = this.state
      fetchSchedule(idSchedule, startDate, viewDate)
    }
    return (
      <div>
        <Paper className={classes.root} elevation={4}>
          <Grid container spacing={16}>
            <Grid item xs={12} md={12}>
              <TextField
                id="shiftLength"
                label="Shift Length"
                type="number"
                className={classes.textField}
                value={shiftLength}
                onChange={this.handleShiftLengthChange.bind(this)}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                id="startDate"
                label="Start Date"
                type="date"
                className={classes.textField}
                value={this.state.startDate}
                onChange={this.handleStartDateChange.bind(this)}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                id="viewDate"
                label="View Date"
                type="date"
                className={classes.textField}
                value={this.state.viewDate}
                onChange={this.handleViewDateChange.bind(this)}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <UserManage />
            </Grid>
            <Grid item xs={12} md={9}>
              <ScheduleList data={scheduleList} />
            </Grid>
          </Grid>
        </Paper>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  scheduleList: state.schedule.currentSchedule.sequence,
  shiftLength: state.schedule.currentSchedule.shift_length,
  refresh: state.schedule.refresh
});

const mapDispatchToProps = {
  fetchSchedule: fetchScheduleAction,
  updateShiftLength: updateShiftLengthAction
}

Schedule = withStyles(styles)(Schedule)
  
export default connect(mapStateToProps, mapDispatchToProps)(Schedule)