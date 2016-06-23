/// <reference path="meteor.d.ts" />

declare module DDP {
  interface DDPStatic {
    subscribe(name: string, ...rest: any[]): Meteor.SubscriptionHandle;
    call(method: string, ...parameters: any[]): void;
    apply(method: string, ...parameters: any[]): void;
    methods(IMeteorMethodsDictionary: any): any;
    status(): DDPStatus;
    reconnect(): void;
    disconnect(): void;
    onReconnect(): void;
  }

  function _allSubscriptionsReady(): boolean;

  interface DDPStatus {
    connected: boolean;
    /**
     * connected,
     * connecting,
     * failed,
     * waiting,
     * offline
     */
    status: string;
    retryCount: number;
    retryTime?: number;
    reason?: string;
  }

  function connect(url: string): DDPStatic;
}

declare module DDPCommon {
  interface MethodInvocation {
    new (options: {}): MethodInvocation;

    unblock(): void;

    setUserId(userId: number): void;
  }
}
