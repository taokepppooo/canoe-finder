import { Component, h, Prop, State, Element, Host, Listen } from '@stencil/core';
import '@material/web/button/filled-button.js';
import '@material/web/menu/menu.js';
import '@material/web/menu/menu-item.js';
import { MenuItem } from './types';

@Component({
  tag: 'cf-ui-menu',
  styleUrl: 'menu.css',
  shadow: true,
})

export class CfUiContextMenu {
  @Element() el: HTMLElement;

  @Prop() height: string;
  @Prop() items: MenuItem[] = [];

  @State() isOpen: boolean = false;

  @Listen('click')
  handleSlotClick(event: MouseEvent) {
    if ((event.target as HTMLElement).slot === 'click') {
      this.toggleMenu();
    }
  }
  @Listen('contextmenu')
  handleRightClick(event: MouseEvent) {
    event.preventDefault();
    if ((event.target as HTMLElement).slot === 'contextmenu') {
      this.toggleMenu();
    }
  }

  toggleMenu() {
    this.isOpen = !this.isOpen;
  }

  setStyle = () => {
    const menu = this.el.shadowRoot.querySelector('md-menu') as HTMLElement;
    if (menu && menu.shadowRoot) {
      const items = menu.shadowRoot.querySelector('.items') as HTMLElement;
      items.style['background-color'] = 'var(--md-menu-container-color, var(--md-sys-color-surface-container, var(--cf-menu-bg)))';
      const itemPadding = items.querySelector('.item-padding') as HTMLElement;
      itemPadding.style['padding-block'] = 0;

      const scrollbar = menu.querySelector('[part="scrollbar"]') as HTMLElement;
      const menuItems = scrollbar.querySelectorAll('md-menu-item') as NodeListOf<HTMLElement>;
      menuItems.forEach((item) => {
        const i = item.shadowRoot.querySelector('md-item') as HTMLElement

        i.style['padding-top'] = '4px';
        i.style['padding-bottom'] = '4px';
        i.style['padding-inline'] = '8px';
        i.style['font-size'] = '14px';
        i.style['min-height'] = '32px';
      });
    }
  }

  componentDidLoad() {
    this.setStyle();
  }

  render() {
    return (
      <Host id="cf-ui-menu" style={{ '--menu-height': this.height }}>
        <div id="anchor">
          <slot name="click"></slot>
          <slot name="contextmenu"></slot>
        </div>
        <md-menu
          part="menu"
          open={this.isOpen}
          anchor="anchor"
          positioning="document"
          onClosed={() => this.isOpen = false}
        >
          <cf-ui-scrollbar part="scrollbar" height={ this.height }>
            {
              this.items?.map((item: MenuItem) => (
                <md-menu-item part="menu-item" id={item.name}>
                  <div slot="headline">{item.label}</div>
                </md-menu-item>
              ))
            }
          </cf-ui-scrollbar>
        </md-menu>
      </Host>
    );
  }
}
