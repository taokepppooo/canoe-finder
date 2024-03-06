import type { NormalizeProps, PropTypes } from '@zag-js/types';
import { parts } from './icon.anatomy';
import { dom } from './icon.dom';
import type { MachineApi, Send, State } from './icon.types';

export function connect<T extends PropTypes>(
  state: State,
  send: Send,
  normalize: NormalizeProps<T>,
): MachineApi<T> {
  return {
    rootProps: normalize.element({
      ...parts.root.attrs,
      id: dom.getRootId(state.context),
      dir: state.context.dir,
      style: {},
    }),
    customProps: normalize.element({
      ...parts.custom.attrs,
      id: dom.getCustomId(state.context),
      dir: state.context.dir,
      style: {},
    }),
  };
}
