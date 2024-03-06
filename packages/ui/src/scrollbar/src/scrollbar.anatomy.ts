import { createAnatomy } from '@zag-js/anatomy';

export const anatomy = createAnatomy('scrollbar').parts(
  'root',
  'content',
  'xTrack',
  'xThumb',
  'yTrack',
  'yThumb',
);

export const parts = anatomy.build();
