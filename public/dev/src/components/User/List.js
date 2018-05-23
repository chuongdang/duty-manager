import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'

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

function UserList(props) {
  const { classes, data, deleteUser } = props;

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <CustomTableCell>First Name</CustomTableCell>
            <CustomTableCell>Last Name</CustomTableCell>
            <CustomTableCell>Email</CustomTableCell>
            <CustomTableCell>Action</CustomTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.keys(data).map((key, index) => {
            const n = data[key]
            return (
              <TableRow className={classes.row} key={n.id_user}>
                <CustomTableCell component="th" scope="row">
                  {n.first_name}
                </CustomTableCell>
                <CustomTableCell component="th" scope="row">
                  {n.last_name}
                </CustomTableCell>
                <CustomTableCell component="th" scope="row">
                  {n.email}
                </CustomTableCell>
                <CustomTableCell component="th" scope="row">
                  <IconButton aria-label="Delete" onClick={() => deleteUser(n.id_user)}>
                    <DeleteIcon />
                  </IconButton>
                </CustomTableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  );
}

UserList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UserList);