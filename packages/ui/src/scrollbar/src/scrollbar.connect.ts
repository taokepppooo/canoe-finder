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

  return {
    rootProps: normalize.element({
      id: dom.getRootId(state.context),
      dir: state.context.dir,
      ...parts.root.attrs,
      'data-orientation': state.context.orientation,
      style: {
        width,
        height,
      },
    }),
    contentProps: normalize.element({
      id: dom.getContentId(state.context),
      dir: state.context.dir,
      ...parts.content.attrs,
      style: {
        width: contentWidth,
        height: contentHeight,
        overflow: 'hidden',
        position: 'relative',
      },
    }),
    xTrackProps: normalize.element({
      id: dom.getXTrackId(state.context),
      dir: state.context.dir,
      ...parts.xTrack.attrs,
      style: {
        width: '100%',
        height: '5px',
        backgroundColor: 'var(--cf-scrollbar-track-bg)',
        position: 'absolute',
        left: 0,
        bottom: 0,
      },
    }),
    xThumbProps: normalize.element({
      id: dom.getXThumbId(state.context),
      dir: state.context.dir,
      ...parts.xThumb.attrs,
      style: {
        width: '100%',
        height: '5px',
        backgroundColor: 'var(--cf-scrollbar-thumb-bg)',
        position: 'absolute',
        left: 0,
        bottom: 0,
      },
    }),
    yTrackProps: normalize.element({
      id: dom.getYTrackId(state.context),
      dir: state.context.dir,
      ...parts.yTrack.attrs,
      style: {
        width: '5px',
        height: '100%',
        backgroundColor: 'var(--cf-scrollbar-track-bg)',
        position: 'absolute',
        top: 0,
        right: 0,
      },
    }),
    yThumbProps: normalize.element({
      id: dom.getYThumbId(state.context),
      dir: state.context.dir,
      ...parts.yThumb.attrs,
      style: {
        width: '5px',
        height: '100%',
        backgroundColor: 'var(--cf-scrollbar-thumb-bg)',
        position: 'absolute',
        top: 0,
        right: 0,
      },
    }),
  };
}
