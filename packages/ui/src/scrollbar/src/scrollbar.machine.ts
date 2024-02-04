import { createMachine } from '@zag-js/core';
import { observeAttributes, observeChildren } from '@zag-js/mutation-observer';
import { compact } from '@zag-js/utils';
import { dom } from './scrollbar.dom';
import type { MachineContext, MachineState, UserDefinedContext } from './scrollbar.types';

export function machine(userContext: UserDefinedContext) {
  const ctx = compact(userContext);

  return createMachine<MachineContext, MachineState>(
    {
      id: 'scrollbar',
      initial: 'idle',
      context: {
        orientation: 'vertical',
        width: '100%',
        height: '100%',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        ...ctx,
      },
      created: ['setInitialSize'],
      computed: {
        isHorizontal: (ctx) => ctx.orientation === 'horizontal',
      },
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
            MOUSE_DOWN: {
              target: 'scroll',
            },
            MOUSE_LEAVE: {
              target: 'idle',
            },
          },
        },
        scroll: {
          on: {
            SCROLL_LEFT: {
              guard: 'isHorizontal',
              actions: ['invokeHorizontalScroll'],
            },
            SCROLL_RIGHT: {
              guard: 'isHorizontal',
              actions: ['invokeHorizontalScroll'],
            },
            SCROLL_UP: {
              guard: 'isVertical',
              actions: ['invokeVerticalScroll'],
            },
            SCROLL_DOWN: {
              guard: 'isVertical',
              actions: ['invokeVerticalScroll'],
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
        setInitialSize(ctx) {
          if (ctx.isHorizontal && !ctx.top && !ctx.right) {
            ctx.top = ctx.right = 0;
          } else if (!ctx.bottom && !ctx.left) {
            ctx.bottom = ctx.left = 0;
          }
        },
        invokeHorizontalScroll(ctx, evt) {},
        invokeVerticalScroll(ctx, evt) {},
      },
    },
  );
}
