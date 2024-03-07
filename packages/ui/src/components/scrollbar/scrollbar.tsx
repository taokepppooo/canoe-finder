import { Component, Prop, h, Element } from '@stencil/core';
import { OverlayScrollbars } from 'overlayscrollbars';

@Component({
  tag: 'cf-ui-scrollbar',
  styleUrl: 'scrollbar.css',
  shadow: true,
})

export class CfUiScrollbar {
  @Element() el: HTMLElement;

  @Prop() width = '100%';
  @Prop() height;

  componentDidLoad() {
    const parentHeight = this.el.parentElement.offsetHeight;
    this.el.style.height = `${parentHeight}px`;
    console.log('this.el.style.height', this.el.style.height)

    const scrollableContent = this.el.shadowRoot.querySelector('[data-overlayscrollbars-initialize]') as HTMLElement;
    try {
      OverlayScrollbars(
        scrollableContent,
        {},
      );
    } catch (error) {
      console.error('Error initializing OverlayScrollbars', error);
    }
  }

  render() {
    return (
      <div style={{ width: this.width, height: this.height || this.el.style.height }}>
        <div class="overlayscrollbars" data-overlayscrollbars-initialize>
          <slot />
        </div>
      </div>
    );
  }
}
