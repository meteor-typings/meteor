declare module Mongo {
  interface AllowDenyOptions {
    insert?: (userId: string, doc: any) => boolean;
    update?: (userId: string, doc: any, fieldNames: string[], modifier: any) => boolean;
    remove?: (userId: string, doc: any) => boolean;
    fetch?: string[];
    transform?: Function;
  }
}
