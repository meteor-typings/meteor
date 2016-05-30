declare module Meteor {
  /** Connection **/
  interface Connection {
    id: string;
    close: Function;
    onClose: Function;
    clientAddress: string;
    httpHeaders: Object;
  }
  function onConnection(callback: Function): void;
  /** Connection **/

  function publish(name: string, func: Function): void;
}

interface Subscription {
  added(collection: string, id: string, fields: Object): void;
  changed(collection: string, id: string, fields: Object): void;
  connection: Meteor.Connection;
  error(error: Error): void;
  onStop(func: Function): void;
  ready(): void;
  removed(collection: string, id: string): void;
  stop(): void;
  userId: string;
}
