/// <reference path="mongo.d.ts" />
/// <reference path="ejson.d.ts" />

declare module Meteor {
  /** Global props **/
  var isClient: boolean;
  var isCordova: boolean;
  var isServer: boolean;
  var isProduction: boolean;
  var release: string;
  var settings: {
    public: {[id:string]: any},
    [id:string]: any
  };
  /** Global props **/

  /** User **/
  interface UserEmail {
    address: string;
    verified: boolean;
  }
  interface User {
    _id?: string;
    username?: string;
    emails?: UserEmail[];
    createdAt?: number;
    profile?: any;
    services?: any;
  }
  function user(): User;
  function userId(): string;
  var users: Mongo.Collection<User>;
  /** User **/

  /** Error **/
  var Error: ErrorStatic;
  interface ErrorStatic {
    new (error: string | number, reason?: string, details?: string): Error;
  }
  interface Error {
    error: string | number;
    reason?: string;
    details?: string;
  }
  /** Error **/

  /** Method **/
  function methods(methods: Object): void;
  function call(name: string, ...args: any[]): any;
  function apply(name: string, args: EJSONable[], options?: {
    wait?: boolean;
    onResultReceived?: Function;
  }, asyncCallback?: Function): any;
  /** Method **/

  /** Url **/
  function absoluteUrl(path?: string, options?: {
    secure?: boolean;
    replaceLocalhost?: boolean;
    rootUrl?: string;
  }): string;
  /** Url **/

  /** Timeout **/
  function setInterval(func: Function, delay: number): number;
  function setTimeout(func: Function, delay: number): number;
  function clearInterval(id: number): void;
  function clearTimeout(id: number): void;
  function defer(func: Function): void;
  /** Timeout **/

  /** utils **/
  function startup(func: Function): void;
  function wrapAsync(func: Function, context?: Object): any;
  /** utils **/

  /** Pub/Sub **/
  interface SubscriptionHandle {
    stop(): void;
    ready(): boolean;
  }
  interface LiveQueryHandle {
    stop(): void;
  }
  /** Pub/Sub **/
}
