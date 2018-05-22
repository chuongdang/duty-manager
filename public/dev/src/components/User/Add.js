import React from 'react'
import { Field, reduxForm } from 'redux-form'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '90%',
  }
});

const validate = values => {
  const errors = {}
  const requiredFields = [
    'firstName',
    'lastName',
    'email'
  ]
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required'
    }
  })
  if (
    values.email &&
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
  ) {
    errors.email = 'Invalid email address'
  }
  return errors
}

class UserAddForm extends React.Component {
  renderTextField = ({
    input,
    label,
    meta: { touched, error },
    className,
    ...custom
  }) => {
    const { classes } = this.props
    return(
    <TextField
      label={label}
      error={touched && error}
      className={classes.textField}
      margin="normal"
      {...input}
      {...custom}
    />
    )
  }

  render() {
    const { handleSubmit } = this.props
    return (
      <form onSubmit={handleSubmit}>
        <div>
          <Field name="firstName" component={this.renderTextField} label="First Name"/>
        </div>
        <div>
          <Field name="lastName" component={this.renderTextField} label="Last Name" />
        </div>
        <div>
          <Field name="email" component={this.renderTextField} label="Email" />
        </div>
        <div>
          <Button variant="raised" color="primary" type="submit">Create</Button>
        </div>
      </form>
    )
  }
}

UserAddForm = reduxForm({
  form: 'userAdd',
  validate
})(UserAddForm)

export default withStyles(styles)(UserAddForm)