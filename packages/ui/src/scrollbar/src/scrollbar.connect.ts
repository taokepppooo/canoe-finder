import type { NormalizeProps, PropTypes } from '@zag-js/types';
import { parts } from './scrollbar.anatomy';
import { dom } from './scrollbar.dom';
import type { MachineApi, Send, State } from './scrollbar.types';

export function connect<T extends PropTypes>(
  state: State,
  send: Send,
  normalize: NormalizeProps<T>,
): MachineApi<T> {}
