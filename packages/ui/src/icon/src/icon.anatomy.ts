import { createAnatomy } from '@zag-js/anatomy';

export const anatomy = createAnatomy('icon').parts('root', 'iconify', 'custom');

export const parts = anatomy.build();
