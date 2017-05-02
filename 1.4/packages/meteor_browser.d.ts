declare module Meteor {
    /** Local storage **/
    var _localStorage: LocalStorage;
    interface LocalStorage {
        _data: any;
        getItem(key: any): any;
        removeItem(key: any): void;
        setItem(key: any, value: any): any;
    }
    /** Local storage **/
}