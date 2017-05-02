declare module Accounts {
  function onLogout(func: Function): void;
  function makeClientLoggedOut(): boolean | void;
}

declare module "meteor/accounts-base" {
    module Accounts {
      function onLogout(func: Function): void;
	    function makeClientLoggedOut(): boolean | void;
    }
}