import { Store, Event } from 'effector';

export type TimeLoopReturnType = {
  $date: Store<number>;
  paused: Store<boolean>;
  pause: Event<void>;
  start: Event<void>;
  stop: Event<void>;
};

export type TimeLoopParams = {
  timeInterval?: number;
  multiplicator: Store<number>;
};
