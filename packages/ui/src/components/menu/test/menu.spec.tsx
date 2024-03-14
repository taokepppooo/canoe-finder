import { newSpecPage } from '@stencil/core/testing';
import { CfUiMenu } from '../menu';

describe('menu', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [CfUiMenu],
      html: `<cf-ui-menu></cf-ui-menu>`,
    });
    expect(page.root).toEqualHtml(`
      <cf-ui-menu>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </cf-ui-menu>
    `);
  });
});
