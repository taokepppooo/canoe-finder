import type { StateMachine as S } from '@zag-js/core';
import type {
  CommonProperties,
  Context,
  DirectionProperty,
  PropTypes,
  RequiredBy,
} from '@zag-js/types';

export type ElementIds = Partial<{
  root: string;
  content: string;
  xTrack: string;
  xThumb: string;
  yTrack: string;
  yThumb: string;
}>;

interface TrackState {
  size?: Array<string | number>;
}
interface ThumbState {
  size?: Array<string | number>;
}

interface PublicContext extends DirectionProperty, CommonProperties {
  orientation?: 'horizontal' | 'vertical';
  width?: string | number;
  height?: string | number;
  track?: TrackState;
  thumb?: ThumbState;
  top?: number;
  right?: number;
  bottom?: number;
  left?: number;
  ids?: ElementIds;
}

export type UserDefinedContext = RequiredBy<PublicContext, 'id'>;

type PrivateContext = Context<object>;

type ComputedContext = Readonly<{
  isHorizontal: boolean;
}>;

export interface MachineContext extends PublicContext, PrivateContext, ComputedContext {}

export interface MachineState {
  value: 'idle' | 'scroll' | 'hover';
}

export type State = S.State<MachineContext, MachineState>;

export type Send = S.Send<S.AnyEventObject>;

export interface MachineApi<T extends PropTypes = PropTypes> {
  rootProps: T['element'];
  contentProps: T['element'];
  xTrackProps: T['element'];
  xThumbProps: T['element'];
  yTrackProps: T['element'];
  yThumbProps: T['element'];
}
