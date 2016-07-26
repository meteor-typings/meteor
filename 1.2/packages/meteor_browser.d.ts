/// <reference path="meteor.d.ts" />

declare module Meteor {
  /** Login **/
  interface LoginWithExternalServiceOptions {
    requestPermissions?: string[];
    requestOfflineToken?: Boolean;
    forceApprovalPrompt?: Boolean;
    loginUrlParameters?: Object;
    redirectUrl?: string;
    loginHint?: string;
    loginStyle?: string;
  }
  function loginWithMeteorDeveloperAccount(options?: Meteor.LoginWithExternalServiceOptions, callback?: Function): void;
  function loginWithFacebook(options?: Meteor.LoginWithExternalServiceOptions, callback?: Function): void;
  function loginWithGithub(options?: Meteor.LoginWithExternalServiceOptions, callback?: Function): void;
  function loginWithGoogle(options?: Meteor.LoginWithExternalServiceOptions, callback?: Function): void;
  function loginWithMeetup(options?: Meteor.LoginWithExternalServiceOptions, callback?: Function): void;
  function loginWithTwitter(options?: Meteor.LoginWithExternalServiceOptions, callback?: Function): void;
  function loginWithWeibo(options?: Meteor.LoginWithExternalServiceOptions, callback?: Function): void;
  function loggingIn(): boolean;
  function loginWith<ExternalService>(options?: {
    requestPermissions?: string[];
    requestOfflineToken?: boolean;
    loginUrlParameters?: Object;
    userEmail?: string;
    loginStyle?: string;
    redirectUrl?: string;
  }, callback?: Function): void;
  function loginWithPassword(user: Object | string, password: string, callback?: Function): void;
  function loginWithToken(token: string, callback?: Function): void;
  function logout(callback?: Function): void;
  function logoutOtherClients(callback?: Function): void;
  /** Login **/

  /** Event **/
  interface Event {
    type: string;
    target: HTMLElement;
    currentTarget: HTMLElement;
    which: number;
    stopPropagation(): void;
    stopImmediatePropagation(): void;
    preventDefault(): void;
    isPropagationStopped(): boolean;
    isImmediatePropagationStopped(): boolean;
    isDefaultPrevented(): boolean;
  }
  interface EventHandlerFunction extends Function {
    (event?: Meteor.Event, templateInstance?: Blaze.TemplateInstance): void;
  }
  interface EventMap {
    [id: string]: Meteor.EventHandlerFunction;
  }
  /** Event **/

  /** Connection **/
  function reconnect(): void;
  function disconnect(): void;
  /** Connection **/

  /** Status **/
  function status(): DDP.DDPStatus;
  /** Status **/

  /** Pub/Sub **/
  function subscribe(name: string, ...args: any[]): Meteor.SubscriptionHandle;
  /** Pub/Sub **/
}
