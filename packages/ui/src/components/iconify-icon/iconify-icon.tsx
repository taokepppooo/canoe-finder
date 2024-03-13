import { Component, Host, Prop, h } from '@stencil/core';
import { disableCache, addIcon } from 'iconify-icon';

@Component({
  tag: 'cf-ui-iconify-icon',
  styleUrl: 'iconify-icon.css',
  shadow: true,
})

export class CfUiIconifyIcon {
  @Prop() icon: string;
  @Prop() width: number = 16;
  @Prop() height: number = 16;

  async loadIcon(icon: string) {
    try {
      const iconModule = await import(`@iconify-icons/bi/bag-check-fill`).catch((e) => {
        throw new Error(`Failed to load the icon: ${icon} - ${e.message}`);
      });

      const iconObject = iconModule.default;
      addIcon(`custom-bi:${icon}`, iconObject);
    } catch (e) {
      console.error(e);
    }
  }

  componentWillLoad() {
    disableCache('all');
    this.loadIcon(this.icon);
  }

  render() {
    return (
      <Host>
        <iconify-icon icon={`custom-bi:${this.icon}`} width={this.width} height={this.height}></iconify-icon>
      </Host>
    );
  }
}
