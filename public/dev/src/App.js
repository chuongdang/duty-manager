import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { mainItems } from '~/components/Drawer';
import Notification from '~/components/Notification';

const drawerWidth = 240;

const styles = theme => ({
  appFrame: {
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    width: '100%',
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
  },
  'appBar-left': {
    marginLeft: drawerWidth,
  },
  'appBar-right': {
    marginRight: drawerWidth,
  },
  drawerPaper: {
    position: 'relative',
    width: drawerWidth,
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
  },
});

class App extends React.Component {
  render() {
    const { classes, children } = this.props;

    const drawer = (
      <Drawer
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <div className={classes.toolbar}>
        <Typography>ASTRO</Typography>
        </div>
        <Divider />
        <List>{mainItems}</List>
      </Drawer>
    );

    return (
      <div className={classes.appFrame}>
        <Notification />
        <AppBar
          position="absolute"
          className={classNames(classes.appBar, classes[`appBar-left`])}
        >
          <Toolbar>
            <Typography variant="title" color="inherit" noWrap>
              Duty Management
            </Typography>
          </Toolbar>
        </AppBar>
        { drawer }
        <main className={classes.content}>
          <div className={classes.toolbar} />
          { children }
        </main>
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);