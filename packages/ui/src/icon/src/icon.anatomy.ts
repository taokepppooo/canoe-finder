import { createAnatomy } from '@zag-js/anatomy';

export const anatomy = createAnatomy('scrollbar').parts('root', 'custom');

export const parts = anatomy.build();
