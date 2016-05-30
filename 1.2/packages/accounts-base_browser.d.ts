declare module Accounts {
  function changePassword(oldPassword: string, newPassword: string, callback?: Function): void;
  function forgotPassword(options: {
    email?: string;
  }, callback?: Function): void;
  function resetPassword(token: string, newPassword: string, callback?: Function): void;
  function verifyEmail(token: string, callback?: Function): void;

  function onEmailVerificationLink(callback: Function): void;
  function onEnrollmentLink(callback: Function): void;
  function onResetPasswordLink(callback: Function): void;

  function loggingIn(): boolean;
  function logout(callback?: Function): void;
  function logoutOtherClients(callback?: Function): void;

  var ui: {
    config(options: {
      requestPermissions?: Object;
      requestOfflineToken?: Object;
      forceApprovalPrompt?: Object;
      passwordSignupFields?: string;
    }): void;
  };
}
