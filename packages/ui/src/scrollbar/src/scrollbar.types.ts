import type { StateMachine as S } from '@zag-js/core';
import type {
  CommonProperties,
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

interface XThumbState {
  width?: string | number;
  show?: boolean;
  hover?: boolean;
  hasScroll?: boolean;
  offset?: number | string;
  dragging?: boolean;
}
interface YThumbState {
  height?: string | number;
  show?: boolean;
  hover?: boolean;
  hasScroll?: boolean;
  offset?: number | string;
  dragging?: boolean;
}

interface PublicContext extends DirectionProperty, CommonProperties {
  orientation?: 'horizontal' | 'vertical';
  width?: string | number;
  height?: string | number;
  scrollWidth?: number;
  scrollHeight?: number;
  xThumb?: XThumbState;
  yThumb?: YThumbState;
  top?: number;
  left?: number;
  lastScrollTop?: number;
  lastScrollLeft?: number;
  ids?: ElementIds;
}

export type UserDefinedContext = RequiredBy<PublicContext, 'id'>;

interface PrivateContext {}

type ComputedContext = Readonly<object>;

export interface MachineContext extends PublicContext, PrivateContext, ComputedContext {}

export interface MachineState {
  value: 'idle' | 'focused' | 'scroll-hover' | 'scroll-drag';
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
