import { Component, Prop, h, Element } from '@stencil/core';
import { OverlayScrollbars, type PartialOptions } from 'overlayscrollbars';

@Component({
  tag: 'cf-ui-scrollbar',
  styleUrl: 'scrollbar.css',
  shadow: true,
})

export class CfUiScrollbar {
  @Element() el: HTMLElement;

  @Prop() width: string = '100%';
  @Prop() height: string = '100%';
  @Prop() options: PartialOptions;

  componentDidLoad() {
    const scrollableContent = this.el.shadowRoot.querySelector('[data-overlayscrollbars-initialize]') as HTMLElement;
    try {
      OverlayScrollbars(
        scrollableContent,
        {
          ...this.options,
        },
      );
    } catch (error) {
      console.error('Error initializing OverlayScrollbars', error);
    }
  }

  render() {
    return (
      <div
        style={{
          width: this.width,
          height: this.height
        }}
      >
        <div class="overlayscrollbars" data-overlayscrollbars-initialize>
          <slot />
        </div>
      </div>
    );
  }
}
