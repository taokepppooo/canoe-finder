import { createAnatomy } from '@zag-js/anatomy';

export const anatomy = createAnatomy('scrollbar').parts(
  'root',
  'content',
  'track',
  'thumb',
  'scrollTrigger',
);

export const parts = anatomy.build();
