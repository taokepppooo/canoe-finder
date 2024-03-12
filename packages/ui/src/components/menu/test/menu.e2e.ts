import { newE2EPage } from '@stencil/core/testing';

describe('menu', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<cf-ui-menu></cf-ui-menu>');

    const element = await page.find('menu');
    expect(element).toHaveClass('hydrated');
  });
});
