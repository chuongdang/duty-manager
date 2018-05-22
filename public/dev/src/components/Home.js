import React from 'react';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

class Home extends React.Component {
  render() {
    return (
      <Card>
        <CardContent>
          <Typography>{'Welcome to Duty Manager'}</Typography>
        </CardContent>
      </Card>
    )
  }
}

export default Home;