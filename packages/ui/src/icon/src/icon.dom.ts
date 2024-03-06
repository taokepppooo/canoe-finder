import { createScope } from '@zag-js/dom-query';
import type { MachineContext as Ctx } from './icon.types';

export const dom = createScope({
  getRootId: (ctx: Ctx) => ctx.ids?.root ?? `icon:${ctx.id}`,
  getCustomId: (ctx: Ctx) => ctx.ids?.custom ?? `icon:${ctx.id}:custom`,

  getRootEl: (ctx: Ctx) => dom.getById<HTMLDivElement>(ctx, dom.getRootId(ctx)),
  getCustomEl: (ctx: Ctx) => dom.getById<HTMLDivElement>(ctx, dom.getCustomId(ctx)),
});
