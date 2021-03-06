import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
});

class ScheduleList extends React.Component {
  render() {
    const { classes, data } = this.props;

    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <CustomTableCell>User</CustomTableCell>
              <CustomTableCell>Start</CustomTableCell>
              <CustomTableCell>End</CustomTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map(n => {
              return (
                <TableRow className={classes.row} key={n.id}>
                  <CustomTableCell component="th" scope="row">
                    {n.user}
                  </CustomTableCell>
                  <CustomTableCell component="th" scope="row">
                    {n.start}
                  </CustomTableCell>
                  <CustomTableCell component="th" scope="row">
                    {n.end}
                  </CustomTableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

ScheduleList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ScheduleList);