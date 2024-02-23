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
        lastScrollTop: 0,
        lastScrollLeft: 0,
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

            // When dragging the scrollbar's outer area, don't trigger the scroll event, correct the scrollbar position when the mouse enter.
            invoke.invokeVerticalScroll(ctx);
          }
          if (ctx.yThumb.hasScroll) {
            ctx.yThumb.show = true;

            // When dragging the scrollbar's outer area, don't trigger the scroll event, correct the scrollbar position when the mouse enter.
            invoke.invokeHorizontalScroll(ctx);
          }
        },
        invokeContentMouseLeave(ctx) {
          ctx.xThumb.show = false;
          ctx.yThumb.show = false;
        },
        invokeContentScroll(ctx, evt) {
          const currentScrollTop = evt.scrollTop;
          const currentScrollLeft = evt.scrollLeft;

          if (currentScrollTop !== ctx.lastScrollTop) {
            invoke.invokeVerticalScroll(ctx);
          }
          if (currentScrollLeft !== ctx.lastScrollLeft) {
            invoke.invokeHorizontalScroll(ctx);
          }

          ctx.lastScrollTop = currentScrollTop;
          ctx.lastScrollLeft = currentScrollLeft;
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

const invokeScroll = (ctx, orientation) => {
  const contentEl = dom.getContentEl(ctx);

  const isVertical = orientation === 'vertical';
  const position = isVertical ? ctx.top : ctx.left;
  const scroll = isVertical ? 'scrollTop' : 'scrollLeft';
  const thumb = isVertical ? ctx.yThumb : ctx.xThumb;
  const client = isVertical ? 'clientHeight' : 'clientWidth';

  ctx[position] = contentEl[scroll];
  thumb.offset = `${(ctx[position] / contentEl[client]) * 100}%`;
};

const invokeDragScroll = (ctx, orientation, evt, send) => {
  const isVertical = orientation === 'vertical';
  const thumb = isVertical ? ctx.yThumb : ctx.xThumb;

  if (!thumb.dragging) return;

  let moveFlag = true;
  let clientOffsetThumbPosition = 0;
  let offset = 0;
  const win = dom.getWin(ctx);
  const contentEl = dom.getContentEl(ctx);
  const trackEl = isVertical ? dom.getYTrackEl(ctx) : dom.getXTrackEl(ctx);
  const thumbEl = isVertical ? dom.getYThumbEl(ctx) : dom.getXThumbEl(ctx);
  const tackOffsetClient = trackEl.getBoundingClientRect()[isVertical ? 'top' : 'left'];
  const tackSize = trackEl[isVertical ? 'clientHeight' : 'clientWidth'];
  const thumbSize = thumbEl[isVertical ? 'clientHeight' : 'clientWidth'];
  const maxOffset = tackSize - thumbSize;

  const moveHandler = (e) => {
    const client = isVertical ? e.clientY : e.clientX;

    if (moveFlag) {
      clientOffsetThumbPosition =
        client - thumbEl.getBoundingClientRect()[isVertical ? 'top' : 'left'];
      moveFlag = false;
    }

    if (client > tackOffsetClient + maxOffset + clientOffsetThumbPosition) {
      offset = maxOffset;
    } else if (client < 0) {
      offset = 0;
    } else {
      offset = client - tackOffsetClient - clientOffsetThumbPosition;
    }

    if (offset < 0 || offset > maxOffset) return;

    thumb.offset = `${offset}px`;
    contentEl[isVertical ? 'scrollTop' : 'scrollLeft'] =
      (offset / tackSize) * (isVertical ? ctx.scrollHeight : ctx.scrollWidth);
  };

  const upHandler = (e) => {
    thumb.dragging = false;
    const win = dom.getWin(ctx);
    win.document.removeEventListener('mousemove', moveHandler);
    win.document.removeEventListener('mouseup', upHandler);

    if (isVertical) {
      invoke.invokeDragVerticalScrollStop(ctx, e, send);
    } else {
      invoke.invokeDragHorizontalScrollStop(ctx, e, send);
    }
  };

  win.document.addEventListener('mousemove', moveHandler);
  win.document.addEventListener('mouseup', upHandler);
};

const invoke = {
  invokeVerticalScroll: (ctx) => invokeScroll(ctx, 'vertical'),
  invokeHorizontalScroll: (ctx) => invokeScroll(ctx, 'horizontal'),
  invokeDragVerticalScroll: (ctx, __evt, send) => {
    invokeDragScroll(ctx, 'vertical', __evt, send);
  },
  invokeDragHorizontalScroll: (ctx, __evt, send) => {
    invokeDragScroll(ctx, 'horizontal', __evt, send);
  },
  invokeDragVerticalScrollStop: (__ctx, __evt, send) => {
    send('Y_THUMB_DRAG_MOUSE_LEAVE');
  },
  invokeDragHorizontalScrollStop: (__ctx, __evt, send) => {
    send('X_THUMB_DRAG_MOUSE_LEAVE');
  },
};
