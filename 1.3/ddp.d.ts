export module DDP {
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

  interface DDPStatus {
    connected: boolean;
    status: Meteor.StatusEnum;
    retryCount: number;
    retryTime?: number;
    reason?: string;
  }

  function connect(url: string): DDPStatic;
}

export module DDPCommon {
  interface MethodInvocation {
    new (options: {}): MethodInvocation;

    unblock(): void;

    setUserId(userId: number): void;
  }
}
