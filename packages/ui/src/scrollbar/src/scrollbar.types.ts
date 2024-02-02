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
  track: string;
  thumb: string;
}>;

interface PublicContext extends DirectionProperty, CommonProperties {
  orientation?: 'horizontal' | 'vertical';
  width?: string | number;
  height?: string | number;
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
  trackProps: T['element'];
  thumbProps: T['element'];
}
