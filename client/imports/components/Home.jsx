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
import SendIcon from 'material-ui-icons/Send';
//import GoogleIcon from 'material-ui-icons/Google';
import { FormattedMessage } from 'react-intl';

import GoogleIcon from 'react-mdi/icons/google';
import FacebookIcon from 'react-mdi/icons/facebook';

import Color from 'color';


const styles = theme => ({
  root: {
    flexGrow: 1,
    overflow: 'hidden',
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
    minHeight: '100vh'
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
    width: '100%'
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
  userField: {
    width: '100%'
  },
  passwordField: {
    width: '100%'
  },
  formActions: {
    marginTop: '20px',
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
    fill: 'white'
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
    fill: 'white'
  },
  oauthSeparator: {
    textAlign: 'center',
    paddingTop: '20px',
    paddingBottom: '20px',
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
  socialGoogle: {
    backgroundColor: '#dd4b39',
    color: 'white',
    '&:hover': {
      backgroundColor: Color('#dd4b39').blacken(0.7).hex(),
    }
  },
  socialFacebook: {
    backgroundColor: '#3b5999',
    color: 'white',
    '&:hover': {
      backgroundColor: Color('#3b5999').blacken(0.3).hex(),
    }
  }
});


class HomeComponent extends Component {

  constructor() {
    super(...arguments);

    this.state = {
      model: {}
    };
  }

  handleChange(field) {
    return event => {
      const { model } = this.state;

      model[field] = event.target.value;

      this.setState({ model });
    };
  }

  renderForm() {
    const { classes } = this.props;
    const { model } = this.state;

    return (
      <form className={ classes.form } noValidate autoComplete="off">
        <Grid container spacing={0} direction="column" alignItems="stretch">
          <Grid item>
            <TextField type="text"
              id="username"
              label="Username"
              className={ classes.userField }
              value={ model.username || '' }
              onChange={ this.handleChange('username') }
              margin="normal"
            />
          </Grid>
          <Grid item>
            <TextField type="password"
              id="password"
              label="Password"
              className={ classes.passwordField }
              value={ model.password || '' }
              onChange={ this.handleChange('password') }
              margin="normal"
            />
          </Grid>
          <Grid item className={ classes.formActions }>
            <Grid container direction="row" justify="flex-end" alignItems="center">
              <Grid item>
                <a href="#">
                  <FormattedMessage id="frontend.home.forgotPassword" defaultMessage="Forgot my password" />
                </a>
              </Grid>
              <Grid item>
                <Button variant="raised" color="primary">
                  <FormattedMessage id="frontend.home.Login" defaultMessage="Login" />
                  <SendIcon className={ classes.rightIcon } />
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </form>
    );
  }


  renderOAuthActions() {
    const { classes } = this.props;

    return (
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid item>
          <Button variant="raised" className={ classes.socialGoogle }>
            <GoogleIcon className={ classes.leftIcon } />
            Google
          </Button>
        </Grid>
        <Grid item>
          <Button variant="raised" className={ classes.socialFacebook }>
            <FacebookIcon className={ classes.leftIcon } />
            Facebook
          </Button>
        </Grid>
      </Grid>

    );
  }


  render() {
    const { classes } = this.props;

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

          <Grid container
            className={ classes.gridContainer }
            direction="column"
            alignItems="center"
            justify="center"
          >
            <Grid item xs={12} sm={8} md={6} lg={5} className={ classes.gridItem }>
              <Paper className={ classes.paper } elevation={20}>
                <h2>
                  <FormattedMessage id="frontend.home.login" defaultMessage="Login" />
                </h2>
                { this.renderForm() }
                <h3 className={ classes.oauthSeparator }>
                  <FormattedMessage id="frontend.home.oauth" defaultMessage="or" />
                </h3>
                { this.renderOAuthActions() }
              </Paper>
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


export default withStyles(styles)(HomeComponent);
