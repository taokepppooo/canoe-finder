import { Component, h, State, Element, Listen } from '@stencil/core';
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

  @State() isOpen: boolean = false;

  @Listen('keydown')
  handleKeyDown(ev: KeyboardEvent) {
    if (ev.key === 'ArrowDown') {
      this.isOpen = true;
      ev.preventDefault();
    }
  }

  toggleMenu() {
    this.isOpen = !this.isOpen;
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
    ];

    return (
      <div class="root">
        <md-filled-button
          id="button"
          aria-haspopup="true"
          aria-controls="menu"
          aria-expanded={this.isOpen ? 'true' : 'false'}
          onClick={() => this.toggleMenu()}
        >
          Open Menu
        </md-filled-button>
        <md-menu
          id="menu"
          open={true}
          aria-label="Menu of fruit"
          onClose={() => this.toggleMenu()}
        >
          {
            fruitNames.map((name, index) => (
              <md-menu-item id={`${index}`}>
                <div slot="headline">{name}</div>
              </md-menu-item>
            ))
          }
        </md-menu>
      </div>
    );
  }
}
