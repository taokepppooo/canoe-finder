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
  const track = state.context.track;
  const thumb = state.context.thumb;
  const trackWidth = track?.size[0];
  const trackHeight = track?.size[1];
  const thumbWidth = thumb?.size[0];
  const thumbHeight = thumb?.size[1];
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
      },
    }),
    xTrackProps: normalize.element({
      id: dom.getXTrackId(state.context),
      dir: state.context.dir,
      ...parts.track.attrs,
      style: {
        width: '100%',
        height: trackHeight,
      },
    }),
    xThumbProps: normalize.element({
      id: dom.getXThumbId(state.context),
      dir: state.context.dir,
      ...parts.thumb.attrs,
      style: {
        width: '100%',
        height: thumbHeight,
      },
    }),
    yTrackProps: normalize.element({
      id: dom.getYTrackId(state.context),
      dir: state.context.dir,
      ...parts.track.attrs,
      style: {
        width: trackWidth,
        height: '100%',
      },
    }),
    yThumbProps: normalize.element({
      id: dom.getYThumbId(state.context),
      dir: state.context.dir,
      ...parts.thumb.attrs,
      style: {
        width: thumbWidth,
        height: '100%',
      },
    }),
  };
}
