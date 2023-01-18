type EventCallback = (...args: string[]) => void;

interface FiringEventInstance {
    fire: () => void;
    removeAllListeners: () => void;
  }
  
  interface CatchingEventInstance {
    do: (callback: EventCallback) => void;
    removeAllListeners: () => void;
  }
  
  interface CatchingOnceEventInstance {
    do: (callback: EventCallback) => void;
    removeAllListeners: () => void;
  }

export { EventCallback, FiringEventInstance, CatchingEventInstance, CatchingOnceEventInstance };
