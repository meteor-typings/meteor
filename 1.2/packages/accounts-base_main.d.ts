/// <reference path="meteor.d.ts" />
/// <reference path="meteor_main.d.ts" />

interface EmailFields {
  from?: () => string;
  subject?: (user: Meteor.User) => string;
  text?: (user: Meteor.User, url: string) => string;
  html?: (user: Meteor.User, url: string) => string;
}

interface Header {
  [id: string]: string;
}

interface EmailTemplates {
  from: string;
  siteName: string;
  headers?: Header;
  resetPassword: EmailFields;
  enrollAccount: EmailFields;
  verifyEmail: EmailFields;
}

declare module Accounts {
  var emailTemplates: EmailTemplates;
  function addEmail(userId: string, newEmail: string, verified?: boolean): void;
  function removeEmail(userId: string, email: string): void;

  function onCreateUser(func: Function): void;
  function findUserByEmail(email: string): Object;
  function findUserByUsername(username: string): Object;

  function sendEnrollmentEmail(userId: string, email?: string): void;
  function sendResetPasswordEmail(userId: string, email?: string): void;
  function sendVerificationEmail(userId: string, email?: string): void;

  function setUsername(userId: string, newUsername: string): void;
  function setPassword(userId: string, newPassword: string, options?: {
    logout?: Object;
  }): void;

  function validateNewUser(func: Function): boolean;
  function validateLoginAttempt(func: Function): { stop: () => void };

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
