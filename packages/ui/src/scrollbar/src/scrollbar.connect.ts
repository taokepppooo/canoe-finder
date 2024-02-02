import type { NormalizeProps, PropTypes } from '@zag-js/types';
import { parts } from './scrollbar.anatomy';
import { dom } from './scrollbar.dom';
import type { MachineApi, Send, State } from './scrollbar.types';

export function connect<T extends PropTypes>(
  state: State,
  send: Send,
  normalize: NormalizeProps<T>,
): MachineApi<T> {
  const isHorizontal = state.context.isHorizontal;
  const width = isHorizontal ? state.context.width : '100%';
  const height = isHorizontal ? '100%' : state.context.height;

  return {
    rootProps: normalize.element({
      ...parts.root.attrs,
      'data-orientation': state.context.orientation,
      id: dom.getRootId(state.context),
      dir: state.context.dir,
      style: {
        width,
        height,
      },
    }),
    trackProps: normalize.element({
      dir: state.context.dir,
      id: dom.getTrackId(state.context),
      ...parts.track.attrs,
      style: {
        display: 'flex',
        flexDirection: isHorizontal ? 'row' : 'column',
        width: isHorizontal ? '100%' : '5px',
        height: isHorizontal ? '5px' : '100%',
      },
    }),
    thumbProps: normalize.element({
      dir: state.context.dir,
      id: dom.getThumbId(state.context),
      ...parts.thumb.attrs,
    }),
  };
}
