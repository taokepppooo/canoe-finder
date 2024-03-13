import { Component, h, Prop, State, Element, Host, Listen } from '@stencil/core';
import '@material/web/button/filled-button.js';
import '@material/web/menu/menu.js';
import '@material/web/menu/menu-item.js';

@Component({
  tag: 'cf-ui-base-menu',
  styleUrl: 'base-menu.css',
})

export class CfUiContextMenu {
  @Element() el: HTMLElement;

  render() {
    return (
      <md-menu
        part="menu"
        open={this.isOpen}
        anchor="anchor"
        positioning="document"
        onClosed={() => this.toggleMenu()}
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
    );
  }
}
