import { Component, h, Prop, State, Element, Host } from '@stencil/core';
import '@material/web/button/filled-button.js';
import '@material/web/menu/menu.js';
import '@material/web/menu/menu-item.js';

@Component({
  tag: 'cf-ui-context-menu',
  styleUrl: 'context-menu.css',
  shadow: true,
})
export class CfUiContextMenu {
  @Element() el: HTMLElement;

  @Prop() height: string;

  @State() isOpen: boolean = false;

  toggleMenu() {
    this.isOpen = !this.isOpen;
  }

  setStyle = () => {
    const menu = this.el.shadowRoot.querySelector('md-menu') as HTMLElement;
    if (menu && menu.shadowRoot) {
      menu.style.height = this.height;
      const items = menu.shadowRoot.querySelector('.items') as HTMLElement;
      items.style['scrollbar-width'] = 'none';
      const itemPadding = items.querySelector('.item-padding') as HTMLElement;
      itemPadding.style['padding-block'] = 0;
    }
  }

  componentDidLoad() {
    this.setStyle();
  }

  render() {
    const fruitNames = [
      'Apple',
      'Apricot',
      'Avocado',
      'Green Apple',
      'Green Grapes',
      'Olive',
      'Orange',
      'Apricot',
      'Avocado',
      'Green Apple',
      'Green Grapes',
      'Olive',
      'Orange',
      'Apricot',
      'Avocado',
      'Green Apple',
      'Green Grapes',
      'Olive',
      'Orange',
      'Orange',
      'Apricot',
      'Avocado',
      'Green Apple',
      'Green Grapes',
      'Olive',
      'Orange',
      'Apricot',
      'Avocado',
      'Green Apple',
      'Green Grapes',
      'Olive',
    ];

    return (
      <Host id="cf-ui-context-menu">
        <md-filled-button
          id="button"
          onClick={() => this.toggleMenu()}
        >
          Open Menu
        </md-filled-button>
        <md-menu
          open={this.isOpen}
          anchor="button"
          positioning="document"
          onClosed={() => this.toggleMenu()}
        >
          <cf-ui-scrollbar height={ this.height }>
            {
              fruitNames.map((name, index) => (
                <md-menu-item id={`${index}`}>
                  <div slot="headline">{name}</div>
                </md-menu-item>
              ))
            }
          </cf-ui-scrollbar>
        </md-menu>
      </Host>
    );
  }
}
