import { createDomain } from 'effector';
import { SECOND, createTimeLoop } from './timeLoop';

export const timeDomain = createDomain('timeDomain');

export const $timeMultiplicator = timeDomain.store<number>(1);

export const timeLoop = createTimeLoop({
  timeInterval: SECOND,
  multiplicator: $timeMultiplicator,
});

timeLoop.$date.watch((date) => {
  console.log(date);
});
