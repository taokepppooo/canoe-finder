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
          dragging: false,
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
            X_THUMB_MOUSE_DOWN: {
              target: 'scroll-drag',
              actions: ['invokeDragHorizontalScroll'],
            },
            X_THUMB_MOUSE_LEAVE: {
              target: 'focused',
              actions: ['invokeXThumbMouseLeave'],
            },
            Y_THUMB_MOUSE_DOWN: {
              target: 'scroll-drag',
              actions: ['invokeDragVerticalScroll'],
            },
            Y_THUMB_MOUSE_LEAVE: {
              target: 'focused',
              actions: ['invokeYThumbMouseLeave'],
            },
          },
        },
        'scroll-drag': {
          on: {
            X_THUMB_DRAG_MOUSE_LEAVE: {
              target: 'focused',
              actions: ['invokeXThumbMouseLeave'],
            },
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
        invokeHorizontalScroll(ctx) {
          invoke.invokeHorizontalScroll(ctx);
        },
        invokeDragHorizontalScroll(ctx, _evt, { send }) {
          ctx.xThumb.dragging = true;
          invoke.invokeDragHorizontalScroll(ctx, _evt, send);
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

    ctx.yThumb.offset = `${(ctx.top / contentEl.clientHeight) * 100}%`;
  },
  invokeHorizontalScroll: (ctx) => {
    const contentEl = dom.getContentEl(ctx);
    ctx.left = contentEl.scrollLeft;

    ctx.xThumb.offset = `${(ctx.left / contentEl.clientWidth) * 100}%`;
  },
  invokeDragVerticalScroll: (ctx, e, send) => {
    if (!ctx.yThumb.dragging) return;

    let moveFlag = true;
    let clientYOffsetYThumbTop = 0;
    let offset = 0;
    const win = dom.getWin(ctx);
    const contentEl = dom.getContentEl(ctx);
    const yTrackEl = dom.getYTrackEl(ctx);
    const yThumbEl = dom.getYThumbEl(ctx);
    const yTackOffsetClientTop = yTrackEl.getBoundingClientRect().top;
    const yTackHeight = yTrackEl.clientHeight;
    const yThumbHeight = yThumbEl.clientHeight;
    const maxOffset = yTackHeight - yThumbHeight;

    const moveHandler = (e) => {
      const clientY = e.clientY;
      if (moveFlag) {
        clientYOffsetYThumbTop = clientY - yThumbEl.getBoundingClientRect().top;
        moveFlag = false;
      }

      if (clientY > yTackOffsetClientTop + maxOffset + clientYOffsetYThumbTop) {
        offset = maxOffset;
      } else if (clientY < 0) {
        offset = 0;
      } else {
        offset = clientY - yTackOffsetClientTop - clientYOffsetYThumbTop;
      }

      if (offset < 0 || offset > maxOffset) return;

      ctx.yThumb.offset = `${offset}px`;
      contentEl.scrollTop = (offset / yTackHeight) * ctx.scrollHeight;
    };

    const upHandler = (e) => {
      ctx.yThumb.dragging = false;
      const win = dom.getWin(ctx);
      win.document.removeEventListener('mousemove', moveHandler);
      win.document.removeEventListener('mouseup', upHandler);
      invoke.invokeDragVerticalScrollStop(ctx, e, send);
    };

    win.document.addEventListener('mousemove', moveHandler);
    win.document.addEventListener('mouseup', upHandler);
  },
  invokeDragHorizontalScroll: (ctx, e, send) => {
    if (!ctx.xThumb.dragging) return;

    let moveFlag = true;
    let clientXOffsetXThumbLeft = 0;
    let offset = 0;
    const win = dom.getWin(ctx);
    const contentEl = dom.getContentEl(ctx);
    const xTrackEl = dom.getXTrackEl(ctx);
    const xThumbEl = dom.getXThumbEl(ctx);
    const xTackOffsetClientLeft = xTrackEl.getBoundingClientRect().left;
    const xTackWidth = xTrackEl.clientWidth;
    const xThumbWidth = xThumbEl.clientWidth;
    const maxOffset = xTackWidth - xThumbWidth;

    const moveHandler = (e) => {
      const clientX = e.clientX;
      if (moveFlag) {
        clientXOffsetXThumbLeft = clientX - xThumbEl.getBoundingClientRect().left;
        moveFlag = false;
      }

      if (clientX > xTackOffsetClientLeft + maxOffset + clientXOffsetXThumbLeft) {
        offset = maxOffset;
      } else if (clientX < 0) {
        offset = 0;
      } else {
        offset = clientX - xTackOffsetClientLeft - clientXOffsetXThumbLeft;
      }

      if (offset < 0 || offset > maxOffset) return;

      ctx.xThumb.offset = `${offset}px`;
      contentEl.scrollLeft = (offset / xTackWidth) * ctx.scrollWidth;
    };

    const upHandler = (e) => {
      ctx.xThumb.dragging = false;
      const win = dom.getWin(ctx);
      win.document.removeEventListener('mousemove', moveHandler);
      win.document.removeEventListener('mouseup', upHandler);
      invoke.invokeDragHorizontalScrollStop(ctx, e, send);
    };

    win.document.addEventListener('mousemove', moveHandler);
    win.document.addEventListener('mouseup', upHandler);
  },
  invokeDragVerticalScrollStop: (__ctx, __e, send) => {
    send('Y_THUMB_DRAG_MOUSE_LEAVE');
  },
  invokeDragHorizontalScrollStop: (__ctx, __e, send) => {
    send('X_THUMB_DRAG_MOUSE_LEAVE');
  },
};
