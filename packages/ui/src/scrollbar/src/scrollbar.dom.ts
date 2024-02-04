import { createScope } from '@zag-js/dom-query';
import type { MachineContext as Ctx } from './scrollbar.types';

export const dom = createScope({
  getRootId: (ctx: Ctx) => ctx.ids?.root ?? `scrollbar:${ctx.id}`,
  getContentId: (ctx: Ctx) => ctx.ids?.content ?? `scrollbar:${ctx.id}:content`,
  getXTrackId: (ctx: Ctx) => ctx.ids?.track ?? `scrollbar:${ctx.id}:x-track`,
  getXThumbId: (ctx: Ctx) => ctx.ids?.thumb ?? `scrollbar:${ctx.id}:x-thumb`,
  getYTrackId: (ctx: Ctx) => ctx.ids?.track ?? `scrollbar:${ctx.id}:y-track`,
  getYThumbId: (ctx: Ctx) => ctx.ids?.thumb ?? `scrollbar:${ctx.id}:y-thumb`,
});
