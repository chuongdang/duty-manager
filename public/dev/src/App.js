import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Drawer from '~/components/Drawer'
import Content from '~/components/Content'
import Notification from '~/components/Notification'

const drawerWidth = 240

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
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
  },
})

class App extends React.Component {
  render() {
    const { classes } = this.props

    return (
      <div className={classes.appFrame}>
        <Notification />
        <AppBar
          position="absolute"
          className={classNames(classes.appBar, classes[`appBar-left`])}
        >
          <Toolbar>
            <Typography variant="title" color="inherit" noWrap>
              Duty Manager
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer />
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Content />
        </main>
      </div>
    )
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(App)