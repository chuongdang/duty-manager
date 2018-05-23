import React from 'react'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import HomeIcon from '@material-ui/icons/Home'
import UserIcon from '@material-ui/icons/People'
import ScheduleIcon from '@material-ui/icons/Schedule'
import Divider from '@material-ui/core/Divider'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import Typography from '@material-ui/core/List'
import { NavLink as Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'

const drawerWidth = 240

const styles = theme => (
  {
    drawerPaper: {
      position: 'relative',
      width: drawerWidth,
    },
    toolbar: {
      ...theme.mixins.toolbar,
      textAlign: 'center'
    },
    logo: {
      marginTop: 20,
      fontSize: 20
    },
    itemActive: {
      backgroundColor: theme.palette.grey[300]
    }
  }
)

class DrawerItemList extends React.Component {
  render() {
    const { classes } = this.props

    return (
      <div>
        <ListItem button component={Link} to="/" exact activeClassName={classes.itemActive}>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button component={Link} to="/users" activeClassName={classes.itemActive}>
          <ListItemIcon>
            <UserIcon />
          </ListItemIcon>
          <ListItemText primary="Users" />
        </ListItem>
        <ListItem button component={Link} to="/schedules" activeClassName={classes.itemActive}>
          <ListItemIcon>
            <ScheduleIcon />
          </ListItemIcon>
          <ListItemText primary="Schedules" />
        </ListItem>
      </div>
    )
  }
}

class AppDrawer extends React.Component {
    render() {
      const { classes } = this.props

      return (
        <Drawer
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
          anchor="left"
        >
          <div className={classes.toolbar}>
          <Typography className={classes.logo}>ASTRO</Typography>
          </div>
          <Divider />
          <List>
            <DrawerItemList classes={classes} />
          </List>
        </Drawer>
      )
    }
}

export default withStyles(styles)(AppDrawer)