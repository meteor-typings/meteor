/// <reference path="meteor.d.ts" />
interface URLS {
  resetPassword: (token: string) => string;
  verifyEmail:  (token: string) => string;
  enrollAccount: (token: string) => string;
}

declare module Accounts {
  var urls: URLS;

  function user(): Meteor.User;
  function userId(): string;

  function createUser(options: {
    username?: string;
    email?: string;
    password?: string;
    profile?: Object;
  }, callback?: Function): string;

  function config(options: {
    sendVerificationEmail?: boolean;
    forbidClientAccountCreation?: boolean;
    restrictCreationByEmailDomain?: string | Function;
    loginExpirationInDays?: number;
    oauthSecretKey?: string;
  }): void;

  function onLogin(func: Function): { stop: () => void };
  function onLoginFailure(func: Function): { stop: () => void };

  function loginServicesConfigured(): boolean;
  function onPageLoadLogin(func: Function): void;
}
