import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import UserIcon from '@material-ui/icons/People';
import ScheduleIcon from '@material-ui/icons/Schedule';

import { Link } from 'react-router';

export const mainItems = (
  <div>
    <Link to="/" activeClassName="active" onlyActiveOnIndex={true}>
        <ListItem button>
        <ListItemIcon>
            <HomeIcon />
        </ListItemIcon>
        <ListItemText primary="Home" />
        </ListItem>
    </Link>
    <Link to="/users" activeClassName="active">
        <ListItem button>
        <ListItemIcon>
            <UserIcon />
        </ListItemIcon>
        <ListItemText primary="Users" />
        </ListItem>
    </Link>
    <Link to="/schedules" activeClassName="active">
        <ListItem button>
        <ListItemIcon>
            <ScheduleIcon />
        </ListItemIcon>
        <ListItemText primary="Schedules" />
        </ListItem>
    </Link>
  </div>
);