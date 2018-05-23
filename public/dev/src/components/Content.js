import React from 'react'

import { Route, Switch, withRouter } from 'react-router-dom'

import Home from '~/components/Home'
import User from '~/components/User/index'
import Schedule from '~/components/Schedule/index'

class Content extends React.Component {
  render() {
    return(
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path="/users" component={User} />
        <Route path="/schedules" component={Schedule} />
      </Switch>
    )
  }
}

export default withRouter(Content)