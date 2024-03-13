import { newSpecPage } from '@stencil/core/testing';
import { CfUiIconifyIcon } from '../iconify-icon';

describe('iconify-icon', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [CfUiIconifyIcon],
      html: `<cf-ui-menu></cf-ui-menu>`,
    });
    expect(page.root).toEqualHtml(`
      <cf-ui-iconify-icon>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </cf-ui-iconify-icon>
    `);
  });
});
