import { createMachine } from '@zag-js/core';
import { compact } from '@zag-js/utils';
import { dom } from './icon.dom';
import type { MachineContext, MachineState, UserDefinedContext } from './icon.types';

export function machine(userContext: UserDefinedContext) {
  const ctx = compact(userContext);

  return createMachine<MachineContext, MachineState>(
    {
      id: 'icon',
      initial: 'idle',
      context: {
        ...ctx,
      },
      activities: ['setInitialSize'],
      states: {
        idle: {},
        focused: {},
        hover: {},
      },
    },
    {
      activities: {
        setInitialSize(ctx) {},
      },
      actions: {},
    },
  );
}
