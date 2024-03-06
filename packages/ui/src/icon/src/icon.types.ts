import type { StateMachine as S } from '@zag-js/core';
import type { CommonProperties, DirectionProperty, PropTypes, RequiredBy } from '@zag-js/types';

export type ElementIds = Partial<{
  root: string;
  custom: string;
}>;

interface PublicContext extends DirectionProperty, CommonProperties {
  ids?: ElementIds;
}

export type UserDefinedContext = RequiredBy<PublicContext, 'id'>;

interface PrivateContext {}

type ComputedContext = Readonly<object>;

export interface MachineContext extends PublicContext, PrivateContext, ComputedContext {}

export interface MachineState {
  value: 'idle' | 'focused' | 'hover';
}

export type State = S.State<MachineContext, MachineState>;

export type Send = S.Send<S.AnyEventObject>;

export interface MachineApi<T extends PropTypes = PropTypes> {
  rootProps: T['element'];
  customProps: T['element'];
}
