type EventCallback = (...args: string[]) => void;
type PromiseEvent = (eventName: string) => Promise<unknown>;

interface FiringEventInstance {
  fire: () => void;
  removeAllListeners: () => void;
}

interface CatchingEventInstance {
  do: (callback: EventCallback) => void;
  removeAllListeners: () => void;
}

interface CatchingOnceEventInstance {
  starts: {
    do: (callback: EventCallback) => void;
    removeAllListeners: () => void;
  };

  ends: {
    do: (callback: EventCallback) => void;
    removeAllListeners: () => void; 
  };
}

export {
  EventCallback,
  FiringEventInstance,
  CatchingEventInstance,
  CatchingOnceEventInstance,
  PromiseEvent,
};
