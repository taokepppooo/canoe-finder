import { newE2EPage } from '@stencil/core/testing';

describe('cf-ui-scrollbar', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<cf-ui-scrollbar></cf-ui-scrollbar>');
    const element = await page.find('cf-ui-scrollbar');
    expect(element).toHaveClass('hydrated');
  });
});
