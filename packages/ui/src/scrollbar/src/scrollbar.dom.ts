import { createScope } from '@zag-js/dom-query';
import type { MachineContext as Ctx } from './scrollbar.types';

export const dom = createScope({
  getRootId: (ctx: Ctx) => ctx.ids?.root ?? `scrollbar:${ctx.id}`,
  getContentId: (ctx: Ctx) => ctx.ids?.content ?? `scrollbar:${ctx.id}:content`,
  getXTrackId: (ctx: Ctx) => ctx.ids?.xTrack ?? `scrollbar:${ctx.id}:x-track`,
  getXThumbId: (ctx: Ctx) => ctx.ids?.xThumb ?? `scrollbar:${ctx.id}:x-thumb`,
  getYTrackId: (ctx: Ctx) => ctx.ids?.yTrack ?? `scrollbar:${ctx.id}:y-track`,
  getYThumbId: (ctx: Ctx) => ctx.ids?.yThumb ?? `scrollbar:${ctx.id}:y-thumb`,

  getRootEl: (ctx: Ctx) => dom.getById<HTMLDivElement>(ctx, dom.getRootId(ctx)),
  getContentEl: (ctx: Ctx) => dom.getById<HTMLDivElement>(ctx, dom.getContentId(ctx)),
  getXTrackEl: (ctx: Ctx) => dom.getById<HTMLDivElement>(ctx, dom.getXTrackId(ctx)),
  getYTrackEl: (ctx: Ctx) => dom.getById<HTMLDivElement>(ctx, dom.getYTrackId(ctx)),
  getXThumbEl: (ctx: Ctx) => dom.getById<HTMLDivElement>(ctx, dom.getXThumbId(ctx)),
  getYThumbEl: (ctx: Ctx) => dom.getById<HTMLDivElement>(ctx, dom.getYThumbId(ctx)),
});
