interface EmailFields {
  from ? : () => string;
  subject ? : (user: Meteor.User) => string;
  text ? : (user: Meteor.User, url: string) => string;
  html ? : (user: Meteor.User, url: string) => string;
}
interface Header {
  [id: string]: string;
}
interface EmailTemplates {
  from: string;
  siteName: string;
  headers ? : Header;
  resetPassword: EmailFields;
  enrollAccount: EmailFields;
  verifyEmail: EmailFields;
}

declare module Accounts {
  var emailTemplates: EmailTemplates;

  function addEmail(userId: string, newEmail: string, verified ? : boolean): void;

  function removeEmail(userId: string, email: string): void;

  function verifyEmail(token: string, callback ? : Function): void;

  function user(): Meteor.User;

  function userId(): string;

  function createUser(options: {
    username ? : string;
    email ? : string;
    password ? : string;
    profile ? : Object;
  }, callback ? : Function): string;

  function setUsername(userId: string, newUsername: string): void;

  function onCreateUser(func: Function): void;

  function findUserByEmail(email: string): Object;

  function findUserByUsername(username: string): Object;

  function validateNewUser(func: Function): boolean;

  function changePassword(oldPassword: string, newPassword: string, callback ? : Function): void;

  function forgotPassword(options: {
    email ? : string;
  }, callback ? : Function): void;

  function resetPassword(token: string, newPassword: string, callback ? : Function): void;

  function setPassword(userId: string, newPassword: string, options ? : {
    logout ? : Object;
  }): void;

  function onEmailVerificationLink(callback: Function): void;

  function onEnrollmentLink(callback: Function): void;

  function onResetPasswordLink(callback: Function): void;

  function sendEnrollmentEmail(userId: string, email ? : string): void;

  function sendResetPasswordEmail(userId: string, email ? : string): void;

  function sendVerificationEmail(userId: string, email ? : string): void;

  var ui: {
    config(options: {
      requestPermissions ? : Object;
      requestOfflineToken ? : Object;
      forceApprovalPrompt ? : Object;
      passwordSignupFields ? : string;
    }): void;
  };

  function config(options: {
    sendVerificationEmail ? : boolean;
    forbidClientAccountCreation ? : boolean;
    restrictCreationByEmailDomain ? : string | Function;
    loginExpirationInDays ? : number;
    oauthSecretKey ? : string;
  }): void;

  function onLogin(func: Function): {
    stop: () => void
  };

  function onLoginFailure(func: Function): {
    stop: () => void
  };

  function loggingIn(): boolean;

  function logout(callback ? : Function): void;

  function logoutOtherClients(callback ? : Function): void;

  function loginServicesConfigured(): boolean;

  function onPageLoadLogin(func: Function): void;

  function validateLoginAttempt(func: Function): {
    stop: () => void
  };
  interface IValidateLoginAttemptCbOpts {
    type: string;
    allowed: boolean;
    error: Meteor.Error;
    user: Meteor.User;
    connection: Meteor.Connection;
    methodName: string;
    methodArguments: any[];
  }
}

declare module "meteor/accounts-base" {
  interface EmailFields {
    from ? : () => string;
    subject ? : (user: Meteor.User) => string;
    text ? : (user: Meteor.User, url: string) => string;
    html ? : (user: Meteor.User, url: string) => string;
  }
  interface Header {
    [id: string]: string;
  }
  interface EmailTemplates {
    from: string;
    siteName: string;
    headers ? : Header;
    resetPassword: EmailFields;
    enrollAccount: EmailFields;
    verifyEmail: EmailFields;
  }

  module Accounts {
    var emailTemplates: EmailTemplates;

    function addEmail(userId: string, newEmail: string, verified ? : boolean): void;

    function removeEmail(userId: string, email: string): void;

    function verifyEmail(token: string, callback ? : Function): void;

    function user(): Meteor.User;

    function userId(): string;

    function createUser(options: {
      username ? : string;
      email ? : string;
      password ? : string;
      profile ? : Object;
    }, callback ? : Function): string;

    function setUsername(userId: string, newUsername: string): void;

    function onCreateUser(func: Function): void;

    function findUserByEmail(email: string): Object;

    function findUserByUsername(username: string): Object;

    function validateNewUser(func: Function): boolean;

    function changePassword(oldPassword: string, newPassword: string, callback ? : Function): void;

    function forgotPassword(options: {
      email ? : string;
    }, callback ? : Function): void;

    function resetPassword(token: string, newPassword: string, callback ? : Function): void;

    function setPassword(userId: string, newPassword: string, options ? : {
      logout ? : Object;
    }): void;

    function onEmailVerificationLink(callback: Function): void;

    function onEnrollmentLink(callback: Function): void;

    function onResetPasswordLink(callback: Function): void;

    function sendEnrollmentEmail(userId: string, email ? : string): void;

    function sendResetPasswordEmail(userId: string, email ? : string): void;

    function sendVerificationEmail(userId: string, email ? : string): void;

    var ui: {
      config(options: {
        requestPermissions ? : Object;
        requestOfflineToken ? : Object;
        forceApprovalPrompt ? : Object;
        passwordSignupFields ? : string;
      }): void;
    };

    function config(options: {
      sendVerificationEmail ? : boolean;
      forbidClientAccountCreation ? : boolean;
      restrictCreationByEmailDomain ? : string | Function;
      loginExpirationInDays ? : number;
      oauthSecretKey ? : string;
    }): void;

    function onLogin(func: Function): {
      stop: () => void
    };

    function onLoginFailure(func: Function): {
      stop: () => void
    };

    function loggingIn(): boolean;

    function logout(callback ? : Function): void;

    function logoutOtherClients(callback ? : Function): void;

    function loginServicesConfigured(): boolean;

    function onPageLoadLogin(func: Function): void;

    function validateLoginAttempt(func: Function): {
      stop: () => void
    };
    interface IValidateLoginAttemptCbOpts {
      type: string;
      allowed: boolean;
      error: Meteor.Error;
      user: Meteor.User;
      connection: Meteor.Connection;
      methodName: string;
      methodArguments: any[];
    }
  }
}