import { createScope } from '@zag-js/dom-query';
import type { MachineContext as Ctx } from './scrollbar.types';

export const dom = createScope({
  getRootId: (ctx: Ctx) => ctx.ids?.root ?? `scrollbar:${ctx.id}`,
  getTrackId: (ctx: Ctx) => ctx.ids?.track ?? `scrollbar:${ctx.id}:track`,
  getThumbId: (ctx: Ctx) => ctx.ids?.thumb ?? `scrollbar:${ctx.id}:thumb`,
});
