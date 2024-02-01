import { createMachine } from '@zag-js/core';
import { observeAttributes, observeChildren } from '@zag-js/mutation-observer';
import { compact } from '@zag-js/utils';
import { dom } from './scrollbar.dom';
import type {
  MachineContext,
  MachineState,
  UserDefinedContext,
} from './scrollbar.types';

export function machine(userContext: UserDefinedContext) {
  const ctx = compact(userContext);

  return createMachine<MachineContext, MachineState>(
    {
      id: 'scrollbar',
      initial: 'idle',
      context: {
        orientation: 'horizontal',
        ...ctx,
      },
      created: ['setInitialSize'],
      computed: {
        isHorizontal: (ctx) => ctx.orientation === 'horizontal',
      },
      entry: ['clear'],
      states: {
        idle: {
          on: {
            MOUSE_ON: {
              target: 'hover',
            },
          },
        },
        hover: {
          on: {
            MOUSE_LEAVE: {
              target: 'idle',
            },
          },
        },
        scroll: {
          on: {
            SCROLL: {
              target: 'hover',
              actions: ['invokeScroll'],
            },
          },
        },
      },
    },
    {
      guards: {
        isHorizontal: (ctx) => ctx.isHorizontal,
        isVertical: (ctx) => !ctx.isHorizontal,
      },
      actions: {
        clear(ctx) {
          if (ctx.isHorizontal && !ctx.top && !ctx.right) {
            ctx.top = ctx.right = 0;
          } else if (!ctx.bottom && !ctx.left) {
            ctx.bottom = ctx.left = 0;
          }
        },
        invokeScroll(ctx, evt) {},
      },
    },
  );
}
