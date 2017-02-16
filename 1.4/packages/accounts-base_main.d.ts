/// <reference path="meteor.d.ts" />
/// <reference path="meteor_main.d.ts" />
declare module Accounts {
  function onLogout(func: (user:Meteor.User, connection: Meteor.Connection) => void): void;
}
