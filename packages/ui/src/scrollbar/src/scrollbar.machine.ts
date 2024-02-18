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
          dragging: false,
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
            Y_THUMB_MOUSE_DOWN: {
              target: 'scroll-drag',
              actions: ['invokeDragVerticalScroll'],
            },
          },
        },
        'scroll-drag': {
          on: {
            Y_THUMB_DRAG_MOUSE_LEAVE: {
              target: 'focused',
              actions: ['invokeYThumbMouseLeave'],
            },
          },
        },
      },
    },
    {
      activities: {
        setInitialSize(ctx) {
          // const win = dom.getWin(ctx);
          const contentEl = dom.getContentEl(ctx);
          ctx.width = contentEl.clientWidth;
          ctx.height = contentEl.clientHeight;
          ctx.scrollWidth = contentEl.scrollWidth;
          ctx.scrollHeight = contentEl.scrollHeight;

          if (ctx.scrollWidth > ctx.width) {
            ctx.xThumb.hasScroll = true;

            const xThumbWidthPercent = (ctx.width / ctx.scrollWidth) * 100;
            const scrollWidth = `${xThumbWidthPercent}%`;
            ctx.xThumb.width = scrollWidth;
          }
          if (ctx.scrollHeight > ctx.height) {
            ctx.yThumb.hasScroll = true;

            const yThumbHeightPercent = (ctx.height / ctx.scrollHeight) * 100;
            const scrollHeight = `${yThumbHeightPercent}%`;
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
        invokeDragVerticalScroll(ctx, _evt, { send }) {
          ctx.yThumb.dragging = true;
          invoke.invokeDragVerticalScroll(ctx, _evt, send);
        },
        invokeDragVerticalScrollStop(ctx, _evt, { send }) {
          const win = dom.getWin(ctx);
          ctx.yThumb.dragging = false;
          win.document.removeEventListener('mouseover', (e) => {
            invoke.invokeDragVerticalScroll(ctx, e, send);
          });
        },
        invokeHorizontalScroll(ctx) {
          const contentEl = dom.getContentEl(ctx);
          ctx.left = contentEl.scrollLeft;

          ctx.xThumb.offset = (ctx.left / contentEl.clientWidth) * 100;
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
    const contentEl = dom.getContentEl(ctx);
    ctx.top = contentEl.scrollTop;

    ctx.yThumb.offset = (ctx.top / contentEl.clientHeight) * 100;
  },
  invokeDragVerticalScroll: (ctx, e, send) => {
    if (!ctx.yThumb.dragging) return;

    // 更改为使用 mousemove 事件监听器
    const moveHandler = (e) => {
      requestAnimationFrame(() => {
        const clientY = e.clientY;
        const contentEl = dom.getContentEl(ctx);
        const yThumbEl = dom.getYThumbEl(ctx);

        const maxOffset = (yThumbEl.clientHeight / contentEl.scrollHeight) * 100;
        const maxOffsetClientY = contentEl.clientHeight - yThumbEl.clientHeight;

        console.log(clientY, 'clientY');
        const offset = (clientY / contentEl.clientHeight) * 100;
        if (offset < 0 || offset > maxOffset) return;

        ctx.yThumb.offset = offset;
      });
    };

    const upHandler = (e) => {
      ctx.yThumb.dragging = false;
      const win = dom.getWin(ctx);
      win.document.removeEventListener('mousemove', moveHandler);
      win.document.removeEventListener('mouseup', upHandler);
      invoke.invokeDragVerticalScrollStop(ctx, e, send);
    };

    const win = dom.getWin(ctx);
    win.document.addEventListener('mousemove', moveHandler);
    win.document.addEventListener('mouseup', upHandler);
  },
  invokeDragVerticalScrollStop: (__ctx, __e, send) => {
    send('Y_THUMB_DRAG_MOUSE_LEAVE');
  },
};
