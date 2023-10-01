import { createDomain, sample } from 'effector';
import { interval } from 'patronum';
import { TimeLoopParams, TimeLoopReturnType } from './types';

export const SECOND = 1_000;
export const MINUTE = SECOND * 60;
export const HOUR = MINUTE * 60;
export const DAY = HOUR * 24;

export function createTimeLoop({
  timeInterval = SECOND,
  multiplicator,
}: TimeLoopParams): TimeLoopReturnType {
  const timeLoopDomain = createDomain('timeLoopDomain');
  const start = timeLoopDomain.event();
  const pause = timeLoopDomain.event();
  const stop = timeLoopDomain.event();
  const $timeMultiplicated = multiplicator.map((value) => timeInterval / value);

  const $paused = timeLoopDomain.store<boolean>(false);
  const $date = timeLoopDomain.store<number>(0);

  const { tick } = interval({
    timeout: $timeMultiplicated,
    start: start,
    stop: stop,
  });

  sample({
    clock: start,
    fn: () => false,
    target: $paused,
  });

  sample({
    clock: pause,
    fn: () => true,
    target: $paused,
  });

  sample({
    clock: stop,
    fn: () => true,
    target: $paused,
  });

  sample({
    clock: tick,
    source: { $date, $paused },
    filter: ({ $paused }) => $paused === false,
    fn: ({ $date }) => $date + timeInterval,
    target: $date,
  });

  start();

  return {
    $date,
    paused: $paused,
    start,
    pause,
    stop,
  };
}
