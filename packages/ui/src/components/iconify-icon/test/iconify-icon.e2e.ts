import { newE2EPage } from '@stencil/core/testing';

describe('iconify-icon', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<cf-ui-iconify-icon></cf-ui-iconify-icon>');

    const element = await page.find('iconify-icon');
    expect(element).toHaveClass('hydrated');
  });
});
