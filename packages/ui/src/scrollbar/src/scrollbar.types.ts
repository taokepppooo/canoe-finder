import type { StateMachine as S } from '@zag-js/core';
import type {
  CommonProperties,
  Context,
  DirectionProperty,
  PropTypes,
  RequiredBy,
} from '@zag-js/types';

interface PublicContext extends DirectionProperty, CommonProperties {
  orientation?: 'horizontal' | 'vertical';
  top?: number;
  right?: number;
  bottom?: number;
  left?: number;
}

export type UserDefinedContext = RequiredBy<PublicContext, 'id'>;

type PrivateContext = Context<object>;

type ComputedContext = Readonly<{
  isHorizontal: boolean;
}>;

export interface MachineContext
  extends PublicContext,
    PrivateContext,
    ComputedContext {}

export interface MachineState {
  value: 'idle' | 'scroll' | 'hover';
}

export type State = S.State<MachineContext, MachineState>;

export type Send = S.Send<S.AnyEventObject>;

export interface MachineApi<T extends PropTypes = PropTypes> {
  rootProps: T['element'];
}
