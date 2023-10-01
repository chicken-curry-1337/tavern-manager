import { timeDomain } from '@renderer/lib/entities/time/model';

export const setTime = timeDomain.event<number>(); // todo: add calculation?
