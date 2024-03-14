import { Component, h, Prop, State, Element, Host, Listen } from '@stencil/core';
import '@material/web/button/filled-button.js';
import '@material/web/menu/menu.js';
import '@material/web/menu/menu-item.js';
import type { MenuItem, MenuOption, MenuType } from './types';

@Component({
  tag: 'cf-ui-menu',
  styleUrl: 'menu.css',
  shadow: true,
})

export class CfUiMenu {
  @Element() el: HTMLElement;

  @Prop() height: string;
  @Prop() items: MenuItem[] = [];
  @Prop() type: MenuType = 'trigger';
  @Prop() options: MenuOption = {
    positioning: 'document',
  };

  @State() isOpen: boolean = false;
  @State() clickFlag: boolean = false;

  @Listen('click')
  handleSlotClick() {
    if (this.type === 'trigger' ||
      (this.type === 'contextmenu' && this.isOpen)
    ) {
      this.toggleMenu();
    }
  }
  @Listen('contextmenu')
  handleRightClick(event: MouseEvent) {
    if (this.type === 'contextmenu' || event?.type === 'contextmenu') {
      this.clickFlag = true;

      const contextmenu = this.el.shadowRoot.querySelector('slot') as HTMLSlotElement;
      const contextmenuRect = contextmenu.assignedElements()[0].getBoundingClientRect();

      this.options.positioning = 'absolute';
      this.options.anchorCorner = 'start-start';
      const x = event.clientX;
      const y = event.clientY;
      this.options.xOffset = x - contextmenuRect.top;
      this.options.yOffset = y - contextmenuRect.left;

      this.toggleMenu();
    }

    event.preventDefault();
  }

  openClose() {
    this.clickFlag = false;
    this.isOpen = false;
  }
  toggleMenu() {
    this.isOpen = !this.isOpen;

    if (!this.isOpen) {
      this.clickFlag = false;
    }
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
          <slot></slot>
        </div>
        <md-menu
          part="menu"
          open={this.isOpen}
          anchor="anchor"
          positioning={this.options?.positioning}
          xOffset={this.options?.xOffset}
          yOffset={this.options?.yOffset}
          anchorCorner={this.options?.anchorCorner}
          onClosed={() => this.openClose()}
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
