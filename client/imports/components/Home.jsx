import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
// MUI
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Snackbar from 'material-ui/Snackbar';
//import GoogleIcon from 'material-ui-icons/Google';
import { FormattedMessage } from 'react-intl';

import SendIcon from 'react-mdi/icons/send';
import AccountPlusIcon from 'react-mdi/icons/account-plus';

import Color from 'color';

import { SlideLeft, SlideRight } from '/client/imports/transitions/slide';


const styles = theme => ({
  root: {
    flexGrow: 1
  },
  background: {
    position: 'absolute',
    top: '0px',
    left: '0px',
    width: '100vw',
    minHeight: '100vh',

    background: 'url(/img/bg/meeting1.jpg) no-repeat center center fixed',
    backgroundSize: 'cover',
    filter: 'blur(5px) sepia(0.3) brightness(0.8)',
  },
  content: {
    position: 'absolute',
    top: '0px',
    left: '0px',
    width: '100vw',
    minHeight: '100vh',
    'overflow-x': 'hidden',
    'overflow-y': 'auto'
  },
  appBar: {
    color: 'black',
    background: 'rgba(255,255,255,0.5)'
  },
  gridContainer: {
    flexGrow: 1,
    margin: 'auto',
    paddingTop: '84px',
    width: '100%',
  },
  gridItem: {
    width: '100%',
    height: '600px',
  },
  paper: {
    width: '100%',
    height: '100%',
    padding: '24px 48px',
    backgroundColor: 'rgba(255,255,255,0.9)'
  },
  form: {
    textAlign: 'right'
  },
  textField: {
    width: '100%'
  },
  formActions: {
    marginTop: '20px',
  },
  authIcon: {
    marginLeft: theme.spacing.unit,
    fill: theme.palette.primary.contrastText
  },
  authIconDisabled: {
    marginLeft: theme.spacing.unit,
    fill: theme.palette.text.disabled
  },
  oauthSeparator: {
    textAlign: 'center',
    paddingTop: '20px',
    paddingBottom: '20px',
    whiteSpace: 'nowrap',
    '&::before': {
      display: 'inline-block',
      content: "' '",
      width: '30%',
      borderBottom: '1px solid black',
      margin: '0px 10px 4px 0px'
    },
    '&::after': {
      display: 'inline-block',
      content: "' '",
      width: '30%',
      borderBottom: '1px solid black',
      margin: '0px 0px 4px 10px'
    }
  },
  createIcon: {
    marginLeft: theme.spacing.unit,
    fill: 'white'
  },
});


const stylesDiv = theme => ({
  root: {
    flexGrow: 1,
    'overflow-x': 'hidden',
    'overflow-y': 'auto'
  }
});

const TestDiv = withStyles(stylesDiv)(({ classes }) => (
  <div className={ classes.root }>Test</div>
));



class HomeComponent extends Component {

  static LOGIN = 'login';
  static CREATE_ACCOUNT = 'createAccount';
  static PASSWORD_RESET = 'resetPassword';

  constructor() {
    super(...arguments);

    this.state = {
      loginMethod: HomeComponent.LOGIN
    };
  }

  handleMethodChange() {
    return method => this.setState({ loginMethod: method });
  }

  render() {
    const { classes } = this.props;
    const { loginMethod } = this.state;

    return (
      <div className={ classes.root }>
        <div className={ classes.background }></div>
        <div className={ classes.content }>
          <AppBar position="static" className={ classes.appBar }>
            <Toolbar>
              <Typography variant="title" color="inherit">
                <FormattedMessage id='frontend.home.title' defaultMessage='Spiny' />
              </Typography>
            </Toolbar>
          </AppBar>

          <TestDiv />

          <Grid container
            className={ classes.gridContainer }
            direction="column"
            alignItems="center"
            justify="center"
          >
            <Grid item xs={12} sm={8} md={6} lg={5} className={ classes.gridItem }>

              <SlideLeft in={ loginMethod === HomeComponent.LOGIN }>
                <LoginForm classes={ classes } onToggle={ this.handleMethodChange() } />
              </SlideLeft>

              <SlideRight in={ loginMethod === HomeComponent.CREATE_ACCOUNT }>
                <CreateAccountForm classes={ classes } onToggle={ this.handleMethodChange() } />
              </SlideRight>

              <SlideRight in={ loginMethod === HomeComponent.PASSWORD_RESET }>
                <ResetPasswordForm classes={ classes } onToggle={ this.handleMethodChange() } />
              </SlideRight>

            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}


HomeComponent.propTypes = {
  classes: PropTypes.object.isRequired,
};


/**
 =========================================
                 LOGIN
 =========================================
**/

class LoginForm extends Component {

  constructor() {
    super(...arguments);

    this.state = {
      error: false,
      model: {
        username: '',
        password: ''
      }
    };
  }


  handleChange(field) {
    return event => {
      const { model } = this.state;

      model[field] = event.target.value || '';

      this.setState({ model, error: false });
    };
  }


  handlePasswordChange() {
    return event => {
      event.preventDefault();

      console.log("Not implemented!");

      return false;
    };
  }


  handleAuthenticatePassword() {
    return event => {
      const { model } = this.state;

      Meteor.loginWithPassword(model.username, model.password, error => {
        if (error) {
          console.error(error);
          this.setState({ error: true });
        } else {
          console.log("Login successful!");
        }
      });
    };
  }


  render() {
    const { classes, onToggle } = this.props;
    const { model, error } = this.state;
    const hasCredentials = model.username.trim() && model.password.trim();

    return (
      <Paper className={ classes.paper } elevation={20}>
        <h2>
          <FormattedMessage id="frontend.home.login" defaultMessage="Login" />
        </h2>

        <form className={ classes.form } noValidate autoComplete="off">
          <Grid container spacing={0} direction="column" alignItems="stretch">
            <Grid item>
              <TextField type="text" error={ error }
                label="Username"
                className={ classes.textField }
                value={ model.username }
                onChange={ this.handleChange('username') }
                margin="normal"
              />
            </Grid>
            <Grid item>
              <TextField type="password" error={ error }
                label="Password"
                className={ classes.textField }
                value={ model.password }
                onChange={ this.handleChange('password') }
                margin="normal"
              />
            </Grid>
            <Grid item className={ classes.formActions }>
              <Grid container direction="row-reverse" justify="flex-start" alignItems="center">
                <Grid item>
                  <Button variant="raised" color="primary" onClick={ this.handleAuthenticatePassword() } disabled={ !hasCredentials }>
                    <FormattedMessage id="frontend.home.login" defaultMessage="Login" />
                    <SendIcon className={ hasCredentials ? classes.authIcon : classes.authIconDisabled } />
                  </Button>
                </Grid>
                <Grid item>
                  <a href="#forgot-password" onClick={ () => onToggle(HomeComponent.PASSWORD_RESET) }>
                    <FormattedMessage id="frontend.home.forgotPassword" defaultMessage="Forgot my password" />
                  </a>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </form>

        <h3 className={ classes.oauthSeparator }>
          <FormattedMessage id="frontend.home.oauth" defaultMessage="or" />
        </h3>

        <Grid container direction="row" justify="center" alignItems="center">
          <Grid item>
            <Button variant="raised" color="primary" onClick={ () => onToggle(HomeComponent.CREATE_ACCOUNT) }>
              <FormattedMessage id="frontend.home.createAccount" defaultMessage="Create account" />
              <AccountPlusIcon className={ classes.createIcon } />
            </Button>
          </Grid>
        </Grid>

        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          open={ error }
          message={ <FormattedMessage id="frontend.home.error.auth" defaultMessage="Invalid username or password" /> }
        />
      </Paper>
    );
  }
}



/**
 =========================================
            FORGOT PASSWORD
 =========================================
**/

class ResetPasswordForm extends Component {

  constructor() {
    super(...arguments);

    this.state = {
      model: {
        email: '',
      },
      errors: {
        email: false,
      }
    };
  }

  handleChange(field) {
    return event => {
      const { model, errors } = this.state;

      model[field] = event.target.value || '';
      errors[field] = false; // TODO: validate

      this.setState({ model, errors });
    };
  }

  handlePasswordReset() {
    return event => {
      console.log("Not implemented!");
    };
  }


  render() {
    const { classes, onToggle } = this.props;
    const { model, errors } = this.state;
    const isValid = false;

    return (
      <Paper className={ classes.paper } elevation={20}>
        <h2>
          <FormattedMessage id="frontend.home.resetPassword" defaultMessage="Reset Password" />
        </h2>

        <form className={ classes.form } noValidate autoComplete="off">
          <Grid container spacing={0} direction="column" alignItems="stretch">
            <Grid item>
              <TextField type="email" error={ errors.email }
                label="E-mail"
                className={ classes.textField }
                value={ model.email }
                onChange={ this.handleChange('email') }
                margin="normal"
              />
            </Grid>
            <Grid item className={ classes.formActions }>
              <Grid container direction="row-reverse" justify="flex-start" alignItems="center">
                <Grid item>
                  <Button variant="raised" color="primary" onClick={ this.handlePasswordReset() } disabled={ !isValid }>
                    <FormattedMessage id="frontend.home.resetPassword" defaultMessage="Reset Password" />
                    <AccountPlusIcon className={ isValid ? classes.authIcon : classes.authIconDisabled } />
                  </Button>
                </Grid>
                <Grid item>
                  <a href="#cancel" onClick={ () => onToggle(HomeComponent.LOGIN) }>
                    <FormattedMessage id="cancel" defaultMessage="Cancel" />
                  </a>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Paper>
    );
  }
}



/**
 =========================================
             CREATE ACCOUNT
 =========================================
**/

class CreateAccountForm extends Component {

  constructor() {
    super(...arguments);

    this.state = {
      model: {
        email: '',
        firstName: '',
        lastName: '',
        password: '',
        passwordConfirm: ''
      },
      errors: {
        email: false,
        firstName: false,
        lastName: false,
        password: false,
        passwordConfirm: false
      }
    };
  }

  handleChange(field) {
    return event => {
      const { model, errors } = this.state;

      model[field] = event.target.value || '';
      errors[field] = false; // TODO: validate

      this.setState({ model, errors });
    };
  }

  handleCreateAccount() {
    return event => {
      console.log("Not implemented!");
    };
  }


  render() {
    const { classes, onToggle } = this.props;
    const { model, errors } = this.state;
    const isValid = false;

    return (
      <Paper className={ classes.paper } elevation={20}>
        <h2>
          <FormattedMessage id="frontend.home.createAccount" defaultMessage="Create new account" />
        </h2>

        <form className={ classes.form } noValidate autoComplete="off">
          <Grid container spacing={0} direction="column" alignItems="stretch">
            <Grid item>
              <TextField type="email" error={ errors.email }
                label="E-mail"
                className={ classes.textField }
                value={ model.email }
                onChange={ this.handleChange('email') }
                margin="normal"
              />
            </Grid>
            <Grid item>
              <TextField type="text" error={ errors.firstName }
                label="First name"
                className={ classes.textField }
                value={ model.firstName }
                onChange={ this.handleChange('firstName') }
                margin="normal"
              />
            </Grid>
            <Grid item>
              <TextField type="text" error={ errors.lastName }
                label="Last name"
                className={ classes.textField }
                value={ model.lastName }
                onChange={ this.handleChange('lastName') }
                margin="normal"
              />
            </Grid>
            <Grid item>
              <TextField type="password" error={ errors.password }
                label="Password"
                className={ classes.textField }
                value={ model.password }
                onChange={ this.handleChange('password') }
                margin="normal"
              />
            </Grid>
            <Grid item>
              <TextField type="password" error={ errors.passwordConfirm }
                id="passwordConfirm"
                label="Confirm password"
                className={ classes.textField }
                value={ model.passwordConfirm }
                onChange={ this.handleChange('passwordConfirm') }
                margin="normal"
              />
            </Grid>
            <Grid item className={ classes.formActions }>
              <Grid container direction="row-reverse" justify="flex-start" alignItems="center">
                <Grid item>
                  <Button variant="raised" color="primary" onClick={ this.handleCreateAccount() } disabled={ !isValid }>
                    <FormattedMessage id="frontend.home.create" defaultMessage="Create" />
                    <AccountPlusIcon className={ isValid ? classes.authIcon : classes.authIconDisabled } />
                  </Button>
                </Grid>
                <Grid item>
                  <a href="#cancel" onClick={ () => onToggle(HomeComponent.LOGIN) }>
                    <FormattedMessage id="cancel" defaultMessage="Cancel" />
                  </a>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Paper>
    );
  }
}




export default withStyles(styles)(HomeComponent);
