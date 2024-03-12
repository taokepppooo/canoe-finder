import { newSpecPage } from '@stencil/core/testing';
import { CfUiContextMenu } from '../menu';

describe('menu', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [CfUiContextMenu],
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
