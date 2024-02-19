import type { NormalizeProps, PropTypes } from '@zag-js/types';
import { parts } from './scrollbar.anatomy';
import { dom } from './scrollbar.dom';
import type { MachineApi, Send, State } from './scrollbar.types';

export function connect<T extends PropTypes>(
  state: State,
  send: Send,
  normalize: NormalizeProps<T>,
): MachineApi<T> {
  const width = state.context.width;
  const height = state.context.height;
  const contentWidth = '100%';
  const contentHeight = '100%';
  const isShowXScroll = state.context?.xThumb?.show;
  const isShowYScroll = state.context?.yThumb?.show;
  const xThumbHover = state.context?.xThumb?.hover;
  const yThumbHover = state.context?.yThumb?.hover;
  const xThumbWidth = state.context?.xThumb?.width;
  const yThumbHeight = state.context?.yThumb?.height;
  const xThumbOffset = state.context?.xThumb?.offset;
  const yThumbOffset = state.context?.yThumb?.offset;

  return {
    rootProps: normalize.element({
      ...parts.root.attrs,
      id: dom.getRootId(state.context),
      dir: state.context.dir,
      style: {
        position: 'relative',
        width,
        height,
      },
    }),
    contentProps: normalize.element({
      ...parts.content.attrs,
      id: dom.getContentId(state.context),
      dir: state.context.dir,
      style: {
        overflow: 'auto',
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
        width: contentWidth,
        height: contentHeight,
      },
      onMouseEnter: () => {
        send('CONTENT_MOUSE_ENTER');
      },
      onMouseLeave: () => {
        send('CONTENT_MOUSE_LEAVE');
      },
      onScroll: () => {
        requestAnimationFrame(() => {
          send('CONTENT_SCROLL');
        });
      },
    }),
    xTrackProps: normalize.element({
      ...parts.xTrack.attrs,
      id: dom.getXTrackId(state.context),
      dir: state.context.dir,
      'data-orientation': 'horizontal',
      style: {
        position: 'absolute',
        left: 0,
        bottom: 0,
        display: isShowXScroll ? 'block' : 'none',
        width: '100%',
        height: '5px',
        backgroundColor: 'var(--cf-scrollbar-track-bg)',
      },
    }),
    xThumbProps: normalize.element({
      ...parts.xThumb.attrs,
      id: dom.getXThumbId(state.context),
      dir: state.context.dir,
      'data-orientation': 'horizontal',
      style: {
        position: 'absolute',
        left: 0,
        bottom: 0,
        display: isShowXScroll ? 'block' : 'none',
        width: xThumbWidth,
        height: '5px',
        backgroundColor: xThumbHover
          ? 'var(--cf-scrollbar-thumb-hover-bg)'
          : 'var(--cf-scrollbar-thumb-bg)',
        transform: `translateX(${xThumbOffset})`,
      },
      onMouseEnter: () => {
        send('X_THUMB_MOUSE_ENTER');
      },
      onMouseDown: (e) => {
        e.preventDefault();
        send('X_THUMB_MOUSE_DOWN');
      },
      onMouseLeave: () => {
        send('X_THUMB_MOUSE_LEAVE');
      },
    }),
    yTrackProps: normalize.element({
      ...parts.yTrack.attrs,
      id: dom.getYTrackId(state.context),
      dir: state.context.dir,
      'data-orientation': 'vertical',
      style: {
        position: 'absolute',
        top: 0,
        right: 0,
        display: isShowYScroll ? 'block' : 'none',
        width: '5px',
        height: '100%',
        backgroundColor: 'var(--cf-scrollbar-track-bg)',
      },
    }),
    yThumbProps: normalize.element({
      ...parts.yThumb.attrs,
      id: dom.getYThumbId(state.context),
      dir: state.context.dir,
      'data-orientation': 'vertical',
      style: {
        position: 'absolute',
        top: 0,
        right: 0,
        display: isShowYScroll ? 'block' : 'none',
        width: '5px',
        height: yThumbHeight,
        backgroundColor: yThumbHover
          ? 'var(--cf-scrollbar-thumb-hover-bg)'
          : 'var(--cf-scrollbar-thumb-bg)',
        transform: `translateY(${yThumbOffset})`,
      },
      onMouseEnter: () => {
        send('Y_THUMB_MOUSE_ENTER');
      },
      onMouseDown: (e) => {
        e.preventDefault();
        send('Y_THUMB_MOUSE_DOWN');
      },
      onMouseLeave: () => {
        send('Y_THUMB_MOUSE_LEAVE');
      },
    }),
  };
}
