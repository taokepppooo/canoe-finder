import { createMachine } from '@zag-js/core';
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
        width: '100%',
        height: '100%',
        scrollWidth: 0,
        scrollHeight: 0,
        xThumb: {
          width: 0,
          hasScroll: false,
          offset: 0,
        },
        yThumb: {
          height: 0,
          hasScroll: false,
          offset: 0,
        },
        top: 0,
        left: 0,
        ...ctx,
      },
      activities: ['setInitialSize'],
      states: {
        idle: {
          on: {
            CONTENT_MOUSE_ENTER: {
              target: 'focused',
              actions: ['invokeContentMouseEnter'],
            },
          },
        },
        focused: {
          on: {
            CONTENT_MOUSE_LEAVE: {
              target: 'idle',
              actions: ['invokeContentMouseLeave'],
            },
            CONTENT_SCROLL: {
              actions: ['invokeContentScroll'],
            },
            X_THUMB_MOUSE_ENTER: {
              target: 'scroll-hover',
              actions: ['invokeXThumbMouseEnter'],
            },
            Y_THUMB_MOUSE_ENTER: {
              target: 'scroll-hover',
              actions: ['invokeYThumbMouseEnter'],
            },
          },
        },
        'scroll-hover': {
          on: {
            CONTENT_MOUSE_LEAVE: {
              target: 'idle',
              actions: ['invokeContentMouseLeave'],
            },
            X_THUMB_MOUSE_LEAVE: {
              target: 'focused',
              actions: ['invokeXThumbMouseLeave'],
            },
            Y_THUMB_MOUSE_LEAVE: {
              target: 'focused',
              actions: ['invokeYThumbMouseLeave'],
            },
            SCROLL_HORIZONTAL: {
              actions: ['invokeHorizontalScroll'],
            },
            SCROLL_VERTICAL: {
              actions: ['invokeVerticalScroll'],
            },
          },
        },
      },
    },
    {
      activities: {
        setInitialSize(ctx) {
          const contentEl = dom.getContentEl(ctx);
          ctx.width = contentEl.clientWidth;
          ctx.height = contentEl.clientHeight;
          ctx.scrollWidth = contentEl.scrollWidth;
          ctx.scrollHeight = contentEl.scrollHeight;

          if (ctx.scrollWidth > ctx.width) {
            ctx.xThumb.hasScroll = true;
            const SCROLL_WIDTH = 10;

            const xThumbWidthPercent = (ctx.width / ctx.scrollWidth) * 100;
            const scrollWidth = `calc(${xThumbWidthPercent}% + ${SCROLL_WIDTH}px)`;
            ctx.xThumb.width = scrollWidth;
          }
          if (ctx.scrollHeight > ctx.height) {
            ctx.yThumb.hasScroll = true;
            const SCROLL_HEIGHT = 10;

            const yThumbHeightPercent = (ctx.height / ctx.scrollHeight) * 100;
            const scrollHeight = `calc(${yThumbHeightPercent}% + ${SCROLL_HEIGHT}px)`;
            ctx.yThumb.height = scrollHeight;
          }
        },
      },
      actions: {
        invokeContentMouseEnter(ctx) {
          if (ctx.xThumb.hasScroll) {
            ctx.xThumb.show = true;
          }
          if (ctx.yThumb.hasScroll) {
            ctx.yThumb.show = true;
          }
        },
        invokeContentMouseLeave(ctx) {
          ctx.xThumb.show = false;
          ctx.yThumb.show = false;
        },
        invokeContentScroll(ctx) {
          invoke.invokeVerticalScroll(ctx);
        },
        invokeVerticalScroll(ctx) {
          invoke.invokeVerticalScroll(ctx);
        },
        invokeHorizontalScroll(ctx) {
          if (ctx.xThumb.hasScroll) {
            const contentEl = dom.getContentEl(ctx);
            ctx.left = contentEl.scrollLeft;
            ctx.xThumb.offset = (ctx.left / ctx.scrollWidth) * 100;
          }
        },
        invokeXThumbMouseEnter(ctx) {
          ctx.xThumb.hover = true;
        },
        invokeYThumbMouseEnter(ctx) {
          ctx.yThumb.hover = true;
        },
        invokeXThumbMouseLeave(ctx) {
          ctx.xThumb.hover = false;
        },
        invokeYThumbMouseLeave(ctx) {
          ctx.yThumb.hover = false;
        },
      },
    },
  );
}

const invoke = {
  invokeVerticalScroll: (ctx) => {
    if (ctx.yThumb.hasScroll) {
      const contentEl = dom.getContentEl(ctx);
      ctx.top = contentEl.scrollTop;
      ctx.yThumb.offset = (ctx.top / ctx.scrollHeight) * 100;
    }
  },
};
